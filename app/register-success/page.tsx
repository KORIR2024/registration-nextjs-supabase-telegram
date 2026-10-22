import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-[28px] border border-emerald-100 bg-white p-8 text-center shadow-soft sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">✓</div>
        <h1 className="mt-6 text-3xl font-bold text-slate-900">Registration successful! Your account has been created.</h1>
        <p className="mt-4 text-base text-slate-600">
          Your account has been created successfully. You can continue to the login page to access your dashboard.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:opacity-95"
        >
          Continue to login
        </Link>
      </div>
    </main>
  );
}
