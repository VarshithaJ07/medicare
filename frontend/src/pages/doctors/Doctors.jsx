import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/doctors")
      .then((res) => {
        console.log("API Response:", res.data); // Check data coming
        // Handle different response formats
        const doctorsData = res.data?.data || res.data || [];
        console.log("Doctors Data:", doctorsData);
        setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
        setLoading(false);
      });
  }, []);




  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading doctors...</p>;
  }

  if (!doctors || doctors.length === 0) {
    return <p className="text-center py-10 text-gray-500">No doctors available.</p>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Find a Doctor</h1>
          <p className="text-gray-600">Browse through our network of certified specialists</p>
        </div>

        {doctors.length > 0 && (
          <p className="text-center text-sm text-gray-500 mb-6">Showing {doctors.length} doctors</p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100"
              onClick={() => navigate(`/doctor/${doc._id}`)}
            >
              <div className="h-48 w-full bg-gray-200 overflow-hidden">
                <img
                  src={doc.photo || "https://via.placeholder.com/400x300"}
                  alt={doc.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">{doc.name}</h3>
                <p className="text-blue-600 font-semibold text-sm">{doc.specialization}</p>
                
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p> Experience: <span className="font-medium">{doc.experience || 0} years</span></p>
                  <p> Fees: <span className="font-medium text-slate-900">₹{doc.ticketPrice || 500}</span></p>
                  {doc.hospital && <p> {doc.hospital}</p>}
                </div>

                <button
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:shadow-md transition font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/doctor/${doc._id}`);
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
