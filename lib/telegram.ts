export async function sendTelegramRegistrationNotification({
  fullName,
  username,
  country,
  phone,
  email,
  registeredAt,
}: {
  fullName: string;
  username: string;
  country: string;
  phone: string;
  email?: string | null;
  registeredAt: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");

  const message = [
    "🆕 NEW USER REGISTRATION",
    "",
    `Name: ${escapeHtml(fullName)}`,
    `Username: ${escapeHtml(username)}`,
    `Country: ${escapeHtml(country)}`,
    `Phone: ${escapeHtml(phone)}`,
    email ? `Email: ${escapeHtml(email)}` : "Email: Not provided",
    `Date: ${escapeHtml(registeredAt)}`,
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Telegram send failed:", errorText);
    return false;
  }

  return true;
}
