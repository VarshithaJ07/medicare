import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const DoctorDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!id) return;
    api
      .get(`/doctors/${id}`)
      .then((res) => {
        console.log("Doctor Details:", res.data);
        setDoctor(res.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor:", error);
        setDoctor(null);
      });
  }, [id]);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    api
      .get(`/reviews`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setReviews(data.filter((r) => r.doctor && r.doctor === id || (r.doctor && r.doctor._id === id)));
      })
      .catch(() => setReviews([]));
  }, [id]);

  const [rating, setRating] = useState(5);

  const submitFeedback = async () => {
    if (!user) return alert("Please login first");
    try {
      const payload = { doctor: id, user: user._id, reviewText: feedback, rating };
      const res = await api.post("/reviews", payload);
      // add new review to local state for immediate feedback
      const newReview = res.data?.review || res.data || payload;
      setReviews((prev) => [newReview, ...prev]);
      setFeedback("");
      setRating(5);
      alert("Feedback Submitted");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback. Try again.");
    }
  };

  const bookAppointment = () => {
    if (!user) return alert("Please login first");
    navigate(`/payment/${id}`);
  };

  if (!doctor) return <p className="text-center py-20 text-gray-500">Loading doctor profile...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-12 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
        <div className="flex items-center gap-6">
          <div className="w-36 h-36 rounded-xl overflow-hidden bg-gray-100">
            <img src={doctor.photo || 'https://via.placeholder.com/400x300'} alt={doctor.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{doctor.name}</h1>
            <p className="text-sm text-gray-500">{doctor.specialization}</p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-sm text-gray-600">Experience: <strong>{doctor.experience || 0} yrs</strong></span>
              <span className="text-sm text-gray-600">| Fees: <strong>₹{doctor.ticketPrice || 500}</strong></span>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={bookAppointment} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow">Book Appointment</button>
              <button onClick={()=>alert('Message feature coming soon')} className="px-4 py-2 border rounded-lg">Message</button>
            </div>
          </div>
        </div>

        <section className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold">About</h3>
          {doctor.bio ? (
            <p className="mt-2 text-gray-700">{doctor.bio}</p>
          ) : (
            <div className="mt-2 text-gray-700 space-y-2">
              <p>
                <strong className="font-medium">Specialization:</strong> {doctor.specialization || 'General'}
              </p>
              <p>
                <strong className="font-medium">Experience:</strong> {doctor.experience ? `${doctor.experience} years` : 'Not specified'}
              </p>
              <p>
                <strong className="font-medium">Consultation Fee:</strong> ₹{doctor.ticketPrice || '—'}
              </p>
              {doctor.qualifications && (
                <p>
                  <strong className="font-medium">Qualifications:</strong> {doctor.qualifications}
                </p>
              )}
              <p className="text-sm text-gray-500">Contact the clinic or use the Book Appointment button to schedule a visit.</p>
            </div>
          )}
        </section>

        <section className="mt-6">
          <h3 className="text-lg font-semibold">Patient Reviews</h3>
          <div className="mt-3 space-y-3">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              reviews.map((r) => (
                <div key={r._id || Math.random()} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{r.user?.name || r.user?.email || 'Anonymous'}</div>
                    <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{r.reviewText}</p>
                </div>
              ))
            )}
          </div>
        </section>

      </div>

      <aside className="bg-gradient-to-b from-white to-slate-50 rounded-2xl p-6 shadow flex flex-col gap-4">
        <div className="text-sm text-gray-500">Availability</div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Mon-Fri</span>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">Sat</span>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-500">Hospital Name</div>
          <div className="font-medium">{doctor.hospital || 'City Health Center'}</div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-500">Language</div>
          <div className="font-medium">English, Hindi</div>
        </div>

        <div className="mt-auto">
          <button onClick={bookAppointment} className="w-[17%] px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg">Book a Slot</button>
        </div>
      </aside>
      
      {/* Floating feedback panel (bottom-right) */}
      <div className="fixed right-6 bottom-6 w-80 md:w-96 bg-white rounded-xl shadow-2xl p-4 z-50">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Leave Feedback</h4>
          <span className="text-xs text-gray-400">{doctor.name}</span>
        </div>

        <textarea
          className="mt-3 w-full border rounded p-2 text-sm h-28 resize-none"
          placeholder={user ? "Write your review..." : "Please login to leave a review"}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={!user}
        />

        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Rating</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="text-sm border rounded px-2 py-1">
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (!user) return navigate('/login'); setFeedback(''); setRating(5); }}
              className="text-sm px-3 py-1 border rounded"
            >
              Clear
            </button>
            <button
              onClick={submitFeedback}
              className="text-sm px-3 py-1 bg-indigo-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
