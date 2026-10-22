import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-8 text-center shadow-soft">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl text-brand-700">🔐</div>
        <h1 className="text-3xl font-bold text-slate-900">Login</h1>
        <p className="mt-3 text-slate-600">This demo login page is ready for your authentication flow.</p>
        <div className="mt-8 space-y-3 text-sm text-slate-600">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">Username or email</div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">Password</div>
        </div>
        <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-200 hover:opacity-95">
          Log in
        </button>
        <p className="mt-6 text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/" className="font-semibold text-brand-700">
            Register now
          </Link>
        </p>
      </div>
    </main>
  );
}
