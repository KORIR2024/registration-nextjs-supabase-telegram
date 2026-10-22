"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

const COUNTRY_OPTIONS = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "United States",
  "United Kingdom",
  "Canada",
  "South Africa",
  "Nigeria",
  "Ghana",
  "India",
  "Australia",
  "Germany",
  "France",
  "United Arab Emirates",
  "Egypt",
  "Rwanda",
  "Other",
];

const initialForm = {
  fullName: "",
  email: "",
  country: "Kenya",
  phone: "",
  username: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const phonePlaceholder = useMemo(() => {
    return form.country === "United States" ? "+1 415 555 2671" : "+254 712 345 678";
  }, [form.country]);

  const updateField = (field: keyof typeof initialForm, value: string | boolean) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!form.username.trim()) {
      setError("Please choose a username.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!form.country.trim()) {
      setError("Please select your country.");
      return;
    }

    if (!form.password.trim()) {
      setError("Please enter a password.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.acceptTerms) {
      setError("You must accept the Terms and Conditions to continue.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          country: form.country,
          phone: form.phone,
          username: form.username,
          password: form.password,
          confirmPassword: form.confirmPassword,
          acceptTerms: form.acceptTerms,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed. Please try again.");
      }

      router.push("/register-success");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-indigo-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-[28px] bg-white shadow-soft lg:grid-cols-[1.05fr_1.2fr]">
          <div className="hidden bg-gradient-to-br from-brand-700 via-blue-700 to-indigo-900 p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                Join today
              </div>
              <h1 className="mt-8 text-4xl font-bold leading-tight">Create your secure account</h1>
              <p className="mt-4 max-w-md text-sm text-blue-100">
                Unlock personalized access, stay connected, and keep your account protected with our secure registration system.
              </p>
            </div>
            <div className="mt-10 space-y-4 text-sm text-blue-100">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-semibold text-white">Fast onboarding</p>
                <p className="mt-1">Simple registration flow designed for mobile and desktop users.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-semibold text-white">Protected by Supabase Auth</p>
                <p className="mt-1">Passwords are never stored in plain text and are managed securely.</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Register</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Welcome</h2>
              </div>
              <div className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">Secure</div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                  <span className="mb-2 block">Full name</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                  <span className="mb-2 block">Email address (optional)</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Country</span>
                  <select
                    value={form.country}
                    onChange={(event) => updateField("country", event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  >
                    {COUNTRY_OPTIONS.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Phone number</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder={phonePlaceholder}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                  <span className="mb-2 block">Username</span>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(event) => updateField("username", event.target.value)}
                    placeholder="jane_doe"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Password</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => updateField("password", event.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Confirm password</span>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(event) => updateField("confirmPassword", event.target.value)}
                    placeholder="Re-enter password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(event) => updateField("acceptTerms", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>
                  I accept the <span className="font-semibold text-slate-800">Terms and Conditions</span> and consent to the processing of my information.
                </span>
              </label>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-200 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-brand-700 transition hover:text-brand-800">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
