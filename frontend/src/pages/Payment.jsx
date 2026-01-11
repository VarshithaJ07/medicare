import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useMemo, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState("today");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState(500);
  const [doctor, setDoctor] = useState(null);

  // fetch doctor details to read ticketPrice (if available)
  useEffect(() => {
    if (!id) return;
    api
      .get(`/doctors/${id}`)
      .then((res) => {
        setDoctor(res.data || null);
        if (res.data && res.data.ticketPrice) setTicketPrice(res.data.ticketPrice);
      })
      .catch(() => {});
  }, [id]);

  const confirmBooking = async () => {
    if (!user) return navigate('/login');

    // determine date string (YYYY-MM-DD)
    let dateStr = appointmentDate;
    if (selectedDay === "today") {
      dateStr = new Date().toISOString().slice(0, 10);
    } else if (selectedDay === "tomorrow") {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      dateStr = d.toISOString().slice(0, 10);
    }

    if (!dateStr) {
      alert("Please choose a date for the appointment.");
      return;
    }

    if (!selectedTime) {
      alert("Please choose a time slot.");
      return;
    }

    const appointmentDateISO = new Date(`${dateStr}T${selectedTime}`);

    try {
      await api.post("/bookings", {
        doctor: id,
        user: user._id,
        ticketPrice: ticketPrice,
        appointmentDate: appointmentDateISO,
      });
      alert("Appointment Confirmed");
      navigate("/");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to confirm appointment. Try again.");
    }
  };

  const timeSlots = useMemo(
    () => ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
    []
  );

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop")',
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-indigo-900/70"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto py-20 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Confirm Your Appointment</h1>
          <p className="text-blue-100">Complete your booking securely</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">
          
          {/* Doctor Info Section */}
          {doctor && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src={doctor.photo || 'https://via.placeholder.com/80'} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{doctor.name}</h2>
                  <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                  <p className="text-sm text-gray-600">Experience: {doctor.experience || 0} years</p>
                </div>
              </div>
            </div>
          )}

          {/* Day Selection */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-800 mb-3">Select Day</label>
            <div className="grid grid-cols-3 gap-3">
              <label className="cursor-pointer">
                <input 
                  type="radio" 
                  name="day" 
                  checked={selectedDay === 'today'} 
                  onChange={()=>{setSelectedDay('today'); setAppointmentDate('');}}
                  className="sr-only"
                />
                <div className={`p-3 rounded-lg text-center transition ${selectedDay === 'today' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <div className="font-semibold">Today</div>
                </div>
              </label>
              <label className="cursor-pointer">
                <input 
                  type="radio" 
                  name="day" 
                  checked={selectedDay === 'tomorrow'} 
                  onChange={()=>{setSelectedDay('tomorrow'); setAppointmentDate('');}}
                  className="sr-only"
                />
                <div className={`p-3 rounded-lg text-center transition ${selectedDay === 'tomorrow' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <div className="font-semibold">Tomorrow</div>
                </div>
              </label>
              <label className="cursor-pointer">
                <input 
                  type="radio" 
                  name="day" 
                  checked={selectedDay === 'choose'} 
                  onChange={()=>{setSelectedDay('choose');}}
                  className="sr-only"
                />
                <div className={`p-3 rounded-lg text-center transition ${selectedDay === 'choose' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <div className="font-semibold">Choose Date</div>
                </div>
              </label>
            </div>
          </div>

          {/* Custom Date Picker */}
          {selectedDay === 'choose' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <label className="block font-semibold text-gray-800 mb-2">Select Appointment Date</label>
              <input
                type="date"
                className="w-full border-2 border-blue-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
          )}

          {/* Time Slot Selection */}
          <div className="mb-8">
            <label className="block font-semibold text-gray-800 mb-3">Select Time Slot</label>
            <select 
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 font-medium"
              value={selectedTime} 
              onChange={(e)=>setSelectedTime(e.target.value)}
            >
              <option value="">-- Choose a time --</option>
              {timeSlots.map((t) => (
                <option key={t} value={`${t}:00`}>{t} - {String(parseInt(t) + 1).padStart(2, '0')}:00</option>
              ))}
            </select>
          </div>

          {/* Booking Summary */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 font-medium">Consultation Fee</div>
                <div className="text-3xl font-bold text-blue-600 mt-1">₹{ticketPrice}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 font-medium">Status</div>
                <div className="text-lg font-semibold text-green-600 mt-1">Ready to Confirm</div>
              </div>
            </div>
          </div>

          {/* Confirmation Button */}
          <button
            onClick={confirmBooking}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition shadow-lg transform hover:scale-105 active:scale-95"
          >
            💳 Pay ₹{ticketPrice} & Confirm Appointment
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            🔒 Your payment is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
