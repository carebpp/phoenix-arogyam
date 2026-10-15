export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 border border-amber-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">P</div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Phoenix Arogyam</h1>
            <p className="text-gray-500 mt-2 text-sm">Welcome back, please login</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Email</label>
              <input className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
              <input type="password" className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 outline-none transition-all" placeholder="••••••••" />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-semibold shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-200 hover:-translate-y-0.5 transition-all">
              Sign In
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">Golden Design • Ayurveda Wellness</p>
        </div>
      </div>
    </div>
  )
}
