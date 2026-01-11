import React from "react";

const Contact = () => {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: 'url("https://img.freepik.com/premium-photo/abstract-blur-beautiful-luxury-hospital-clinic-interior-background_103324-624.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* subtle overlay to keep form readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/80" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">Have questions? Send us a message and we will get back to you soon.</p>
        </div>

        <form className="space-y-4 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full name"
              className="border border-gray-200 rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="email"
              placeholder="Email address"
              className="border border-gray-200 rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="border border-gray-200 rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-200"
          />
          <textarea
            rows="6"
            placeholder="Message"
            className="border border-gray-200 rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-200"
          />

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Or email us directly at <a href="mailto:help@medicare.local" className="text-blue-600">help@medicare.local</a></div>
            <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
