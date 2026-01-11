import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const services = [
  { key: "Cardiologist", title: "Cardiology", desc: "Heart care & vascular treatments", accent: "from-red-300 to-red-300" },
  { key: "Dentist", title: "Dental Care", desc: "Routine and cosmetic dentistry", accent: "from-indigo-300 to-indigo-300" },
  { key: "Neurologist", title: "Neurology", desc: "Brain & nervous system specialists", accent: "from-emerald-300 to-emerald-300" },
  { key: "Pediatrician", title: "Pediatrics", desc: "Child health and immunizations", accent: "from-pink-300 to-pink-300" },
  { key: "Orthopedic", title: "Orthopedics", desc: "Bone, joint and mobility care", accent: "from-yellow-300 to-yellow-300" },
  { key: "Psychiatrist", title: "Mental Health", desc: "Counseling and psychiatric care", accent: "from-indigo-300 to-indigo-300" },
];

const Services = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api
      .get("/doctors")
      .then((res) => {
        const list = res?.data?.data || res?.data || [];
        if (mounted) setDoctors(list);
      })
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  const findDoctorFor = (serviceKey) => {
    if (!doctors || doctors.length === 0) return null;
    
    // Create a mapping to ensure each service gets a unique doctor
    const serviceMap = {
      "Cardiologist": "Cardiologist",
      "Dentist": "Dentist",
      "Neurologist": "Neurologist",
      "Pediatrician": "Pediatrician",
      "Orthopedic": "Orthopedic",
      "Psychiatrist": "Psychiatrist",
    };
    
    const targetSpec = serviceMap[serviceKey];
    if (!targetSpec) return doctors[0];
    
    // Find doctor with exact specialization match
    return doctors.find((d) => d.specialization === targetSpec) || null;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&h=900&fit=crop")',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-blue-50/80 to-white/85"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0 py-20">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Our Medical Services
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
             Expert care across all specialties — Find the right specialist and book your appointment instantly
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((s) => {
            const mapped = findDoctorFor(s.key);
            return (
              <article
                key={s.title}
                className="relative rounded-2xl overflow-hidden bg-white/95 backdrop-blur shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition duration-300 h-full flex flex-col border border-white/50"
              >
                {/* Card accent gradient */}
                <div className={`h-1 bg-gradient-to-r ${s.accent}`} aria-hidden />
                
                <div className="p-8 flex flex-col h-full">
                  {/* Service Title & Icon */}
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-sm font-semibold text-blue-700 mb-3">
                      {s.key}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{s.title}</h3>
                  </div>

                  {/* Service Description */}
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow">{s.desc}</p>

                  {/* Doctor Info */}
                  {mapped && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <p className="text-xs font-semibold text-blue-600 mb-2 uppercase">Available with:</p>
                      <div className="flex items-center gap-3">
                        <img 
                          src={mapped.photo || 'https://via.placeholder.com/40'} 
                          alt={mapped.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{mapped.name}</p>
                          <p className="text-xs text-gray-600">{mapped.specialization}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Book Button */}
                  <button
                    onClick={() => (mapped ? navigate(`/payment/${mapped._id}`) : navigate("/doctors"))}
                    className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-xl transition duration-300 font-semibold flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    📅 Book Appointment
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Info Section */}
        <section className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-white/50">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold text-blue-600 mb-2">✓ Verified Specialists</h4>
              <p className="text-gray-700">All our doctors are highly qualified and verified professionals with years of experience</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-indigo-600 mb-2">⚡ Easy Booking</h4>
              <p className="text-gray-700">Book your appointment in seconds. Choose your preferred date, time, and specialist</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-blue-600 mb-2">💙 Personalized Care</h4>
              <p className="text-gray-700">Get personalized treatment plans and follow-up support from our caring medical team</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
