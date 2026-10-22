import { NextRequest, NextResponse } from "next/server";

import { supabase, supabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { sendTelegramRegistrationNotification } from "@/lib/telegram";
import { validateRegistrationInput } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = rateLimit(ip, 5, 60 * 1000);
    if (!rateLimitResult.ok) {
      return NextResponse.json(
        {
          error: `Too many registration attempts. Please wait ${rateLimitResult.retryAfter} seconds and try again.`,
        },
        { status: 429 }
      );
    }

    const payload = await request.json();
    const validationResult = validateRegistrationInput(payload);

    if (!validationResult.isValid) {
      return NextResponse.json({ error: validationResult.errors[0] }, { status: 400 });
    }

    const { fullName, username, email, country, phone } = validationResult.normalized;
    const normalizedUsername = username.toLowerCase();

    const { data: existingUsername, error: usernameCheckError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("username", normalizedUsername)
      .limit(1);

    if (usernameCheckError) {
      console.error("Username lookup failed:", usernameCheckError.message);
      return NextResponse.json({ error: "Unable to process your registration right now." }, { status: 500 });
    }

    if (existingUsername && existingUsername.length > 0) {
      return NextResponse.json({ error: "This username is already taken." }, { status: 409 });
    }

    if (email) {
      const { data: existingEmail, error: emailCheckError } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("email", email)
        .limit(1);

      if (emailCheckError) {
        console.error("Email lookup failed:", emailCheckError.message);
        return NextResponse.json({ error: "Unable to process your registration right now." }, { status: 500 });
      }

      if (existingEmail && existingEmail.length > 0) {
        return NextResponse.json({ error: "This email address is already registered." }, { status: 409 });
      }
    }

    const authEmail = email || `${normalizedUsername}-${Date.now()}@local.user`;
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: authEmail,
      password: payload.password,
      options: {
        data: {
          full_name: fullName,
          username: normalizedUsername,
          country,
          phone,
          email: email || null,
        },
      },
    });

    if (authError || !authData.user) {
      console.error("Supabase auth sign-up failed:", authError?.message || "unknown auth error");
      return NextResponse.json({ error: authError?.message || "Could not create your account." }, { status: 400 });
    }

    const registeredAt = new Date().toISOString();
    const { error: insertError } = await supabaseAdmin.from("profiles").insert({
      id: authData.user.id,
      full_name: fullName,
      email: email || null,
      country,
      phone,
      username: normalizedUsername,
      created_at: registeredAt,
    });

    if (insertError) {
      console.error("Profile insert failed:", insertError.message);
      return NextResponse.json({ error: "Registration was not completed. Please try again." }, { status: 500 });
    }

    try {
      await sendTelegramRegistrationNotification({
        fullName,
        username: normalizedUsername,
        country,
        phone,
        email,
        registeredAt,
      });
    } catch (telegramError) {
      console.error("Telegram notification failed:", telegramError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! Your account has been created.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration endpoint error:", error);
    return NextResponse.json({ error: "Something went wrong while registering. Please try again." }, { status: 500 });
  }
}
