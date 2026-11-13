export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <form className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-steel-blue/10 space-y-6">
          <div className="text-center">
            <span className="inline-grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br from-steel-blue to-indigo-500 font-bold text-white text-xl glow-sm">S</span>
            <h1 className="mt-4 text-2xl font-bold text-steel-navy">Welcome back</h1>
            <p className="mt-1 text-sm text-steel-grey">Login to your Steelsetu account</p>
          </div>
          <input placeholder="Email or phone" className="w-full border border-gray-300 focus:border-steel-blue focus:ring-2 focus:ring-steel-blue/20 rounded-xl px-4 py-3 outline-none transition-all" />
          <input type="password" placeholder="Password" className="w-full border border-gray-300 focus:border-steel-blue focus:ring-2 focus:ring-steel-blue/20 rounded-xl px-4 py-3 outline-none transition-all" />
          <button className="w-full bg-steel-blue hover:bg-steel-blue/85 text-white font-semibold py-3.5 rounded-xl glow-sm transition-all">
            Login
          </button>
          <p className="text-xs text-center text-steel-grey">
            Authentication activates with the CRM phase — this is the Phase 1 front-end.
          </p>
        </form>
      </div>
    </div>
  );
}
