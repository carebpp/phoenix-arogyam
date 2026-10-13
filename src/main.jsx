import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-green-700 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Phoenix Arogyam</h1>
        <p className="mt-2">Your Path to Holistic Wellness</p>
      </header>
      <section className="p-10 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to Phoenix Arogyam</h2>
        <p>Authentic Ayurvedic treatments in Moradabad.</p>
        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">
          Book Appointment
        </button>
      </section>
      <footer className="bg-green-900 text-white text-center p-4">
        © 2026 Phoenix Arogyam
      </footer>
    </div>
  );
}

export default App;