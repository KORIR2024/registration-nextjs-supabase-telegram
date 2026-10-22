# Registration Website

A production-ready Next.js + TypeScript + Tailwind registration website using Supabase for database storage and Telegram notifications for new user alerts.

## Features

- Modern, responsive registration page
- Server-side validation and duplicate checks
- Supabase Auth password security
- Supabase profile storage for each user
- Telegram notification after each successful registration
- Deployment-ready Vercel setup
- Environment-based secret management

## Tech stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Telegram Bot API
- Vercel

## Folder structure

```text
.
├── app/
│   ├── api/
│   │   └── register/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── page.tsx
│   └── register-success/
│       └── page.tsx
├── lib/
│   ├── rate-limit.ts
│   ├── supabase.ts
│   ├── telegram.ts
│   └── validators.ts
├── supabase/
│   └── schema.sql
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 1) Prerequisites

Before starting, make sure you have:

- Node.js 18+ installed
- npm or pnpm
- A Supabase project
- A Telegram bot token and chat ID
- A GitHub account
- A Vercel account

## 2) Supabase setup

1. Create a Supabase project at https://supabase.com.
2. Go to `Project Settings -> API` and copy:
   - Project URL
   - anon public key
   - service role secret
3. In the Supabase SQL editor, run the contents of `supabase/schema.sql`.
4. Make sure the service role key is kept only on the server.

### Required Supabase environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3) Telegram bot setup

1. Open Telegram and search for `@BotFather`.
2. Send `/newbot`.
3. Follow the steps to create a bot and copy the bot token.
4. Start a chat with the bot or add it to a group.
5. Use `@userinfobot` or similar to obtain your Telegram chat ID.
6. Store the values in environment variables:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## 4) Local development setup

1. Clone the repo:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env.local
```

4. Fill in your values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
```

5. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 5) Registration behavior

The registration form includes:

- Full name
- Email (optional)
- Country
- Phone number
- Username
- Password
- Confirm password
- Terms and Conditions checkbox

The app validates input before submission and blocks duplicate:

- username
- email, when provided

Passwords are handled by Supabase Auth, not stored in plain text.

## 6) Deployment on Vercel

### GitHub upload

1. Create a GitHub repository.
2. Push this project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### Import into Vercel

1. Log into Vercel.
2. Click `New Project`.
3. Import the GitHub repository.
4. Vercel will detect Next.js automatically.
5. Set the project root to the repository root.
6. Add the following environment variables in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

7. Click `Deploy`.

## 7) Vercel environment variables

In the Vercel dashboard:

- Go to your project
- Open `Settings -> Environment Variables`
- Add each key and value listed above
- Redeploy after saving changes

## 8) Testing registration and Telegram alerts

1. Open the deployed app.
2. Fill out the form with valid values.
3. Confirm that the registration succeeds.
4. Check the database in Supabase to verify the row exists in `public.profiles`.
5. Verify that a Telegram message is delivered to your configured chat.

Expected Telegram format:

```text
🆕 NEW USER REGISTRATION

Name: Jane Doe
Username: jane_doe
Country: Kenya
Phone: +254 712 345 678
Email: jane@example.com
Date: 2026-10-22T10:00:00.000Z
```

## 9) Security notes

- Secrets are not exposed in frontend code.
- Passwords are handled via Supabase Auth.
- Database access is restricted by row-level security.
- Telegram bot token and supabase service key are only set in server-only environment variables.
- User list is not publicly exposed.

## 10) Production recommendations

- Add a real login page with Supabase Auth sign-in.
- Add CAPTCHA or anti-bot protection for public registration forms.
- Use a proper email template or admin dashboard for management.
- Consider adding email verification and account recovery.

## 11) Support

For issues with deployment, check:

- Vercel build logs
- Supabase logs
- Telegram bot token and chat ID correctness
- Environment variables in the Vercel dashboard

This project is ready for Vercel deployment and secure production use.
```
