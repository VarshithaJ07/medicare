import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-gray-800">

      {/* HERO - clean, soft medical look */}
      <section className="bg-gradient-to-b from-sky-200 to-sky-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Quality Healthcare, <span className="text-blue-600">Close to You</span></h1>
            <p className="text-lg text-gray-600 mb-6 max-w-lg">Book trusted specialists, manage appointments, and access medical care from home — all in one simple and secure place.</p>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/services')} className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Find Services</button>
              <button onClick={() => navigate('/doctors')} className="px-5 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">Browse Doctors</button>
              <button onClick={() => navigate('/signup')} className="px-5 py-3 text-sm text-gray-600">Sign Up</button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 max-w-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-500">Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-500">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold mb-3">Quick Booking</h3>
              <p className="text-sm text-gray-600 mb-4">Choose a specialty and book an appointment in minutes.</p>
              <div className="grid gap-3">
                <button onClick={() => navigate('/services')} className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded">Find a Specialist</button>
                <button onClick={() => navigate('/doctors')} className="w-full px-4 py-3 border rounded">See All Doctors</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - neat cards */}
      <section className="bg-sky-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">What We Offer</h2>
            <p className="text-sm text-gray-600 mt-2">Comprehensive care and easy booking — tailored to your needs.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h4 className="font-semibold mb-2 text-blue-600">Verified Specialists</h4>
              <p className="text-sm text-gray-600">Certified doctors with verified credentials.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h4 className="font-semibold mb-2 text-blue-600">Secure Payments</h4>
              <p className="text-sm text-gray-600">Encrypted transactions and protected data.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h4 className="font-semibold mb-2 text-blue-600">Patient Support</h4>
              <p className="text-sm text-gray-600">24/7 assistance and follow-up scheduling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-12 bg-sky-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Popular Services</h3>
            <button onClick={() => navigate('/services')} className="text-sm text-blue-600">View All</button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-3xl mb-3">❤️</div>
              <h4 className="font-semibold">Cardiology</h4>
              <p className="text-sm text-gray-600">Heart care and diagnostics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-3xl mb-3">🧠</div>
              <h4 className="font-semibold">Neurology</h4>
              <p className="text-sm text-gray-600">Brain and nervous system care.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-3xl mb-3">🦷</div>
              <h4 className="font-semibold">Dental</h4>
              <p className="text-sm text-gray-600">Oral and dental services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-sky-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-6">How it Works</h3>
          <div className="grid sm:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">1</div>
              <div className="font-semibold">Sign Up</div>
            </div>
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">2</div>
              <div className="font-semibold">Find Specialist</div>
            </div>
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">3</div>
              <div className="font-semibold">Book Slot</div>
            </div>
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">4</div>
              <div className="font-semibold">Visit & Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to improve your health?</h3>
          <p className="mb-6 text-sm">Book an appointment with trusted specialists today.</p>
          <button onClick={() => navigate('/services')} className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold">Get Started</button>
        </div>
      </section>

    </div>
  );
};

export default Home;
