import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">PHOENIX AROGYAM HOSPITAL</h1>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold">Book Appointment</button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">Your Health is Our <span className="text-blue-600">Priority</span></h2>
            <p className="mt-6 text-gray-600 text-lg">Best Healthcare in Moradabad with Advanced Technology & Expert Doctors. 24/7 Emergency Care Available.</p>
            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">Emergency: 108</button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold">Our Doctors</button>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1519494026892-d82c3a9c2a94?w=600" className="rounded-3xl shadow-2xl" />
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Specialities</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {['Cardiology','Neurology','Orthopedics','Emergency Care'].map(s => (
              <div key={s} className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-xl transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">❤️</div>
                <h4 className="font-bold text-lg">{s}</h4>
                <p className="text-gray-500 text-sm mt-2">Expert care with modern equipment</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p>© 2026 Phoenix Arogyam Hospital, Moradabad | Call: +91 99999 99999</p>
      </footer>
    </div>
  )
}

export default App