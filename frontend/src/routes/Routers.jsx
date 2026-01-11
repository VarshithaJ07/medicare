import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import Doctors from "../pages/Doctors/Doctors.jsx";
import DoctorDetails from "../pages/Doctors/DoctorDetails.jsx";
import Payment from "../pages/Payment.jsx";
import Services from "../pages/Services.jsx";  
import Contact from "../pages/Contact.jsx";    

const Routers = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/doctors" element={<Doctors />} />
    <Route path="/doctor/:id" element={<DoctorDetails />} />
    <Route path="/payment/:id" element={<Payment />} />
    <Route path="/services" element={<Services />} />  {/* New route */}
    <Route path="/contact" element={<Contact />} />    {/* New route */}
  </Routes>
);

export default Routers;
