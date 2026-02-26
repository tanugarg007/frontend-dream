import React, { useState } from "react";
import logo9 from "../Images/page-background.JPG";
import logo18 from "../Assets/orangeback.jpg";
import Footer from "../Component/Footer";


const ContactUs = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mail: "",
    contactNumber: "",
    address: "",
    course: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.mail) newErrors.mail = "Email is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.course) newErrors.course = "Please select a course";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

  //  addEnquiry({
  //   name: formData.fullName,
  //   email: formData.mail,
  //   phone: formData.contactNumber,
  //   address: formData.address,
  //   course: formData.course,
  //   page: "Contact",
  //   message: `Preferred course: ${formData.course}`,
  //  });
   setIsSubmitted(true);

  setFormData({
    fullName: "",
    mail: "",
    contactNumber: "",
    address: "",
    course: "",
  });
  };
  return (
    <div className="w-full">
      {/* ================= HERO BACKGROUND ================= */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${logo9})` }}
      >
   

        {/* ================= HERO SECTION ================= */}
      <div className="relative pt-[70px]">

  {/* ===== ORANGE BACKGROUND ===== */}
  <div
    className="w-full h-[320px] md:h-[450px]
               rounded-br-[60px] md:rounded-br-[180px]"
    style={{ backgroundImage: `url(${logo18})` }}
  >
     <div className="h-full flex flex-col justify-center items-center text-center">

      {/* Heading */}
      <h2 className="text-white text-4xl md:text-5xl font-semibold
                     mt-6 md:mb-3 "
             >
        CONTACT US
      </h2>

      {/* Paragraph */}
      <p
        className="text-white text-base md:text-xl
                   mb-20 md:mb-36
                   px-6 md:px-[420px]"
      >
        Reach out to us through the contact form below or simply give us a call.
        We’d love to connect and guide you toward a successful creative career.
      </p>

    </div>
  </div>
  {/* ================= FORM ================= */}
  {isSubmitted ? (
  <div className="w-[92%] md:w-[50%] mx-auto mt-[-150px] md:mt-[-200px]
                  bg-white rounded-lg shadow-lg p-10 text-center">
    <h2 className="text-3xl font-bold text-green-600 mb-4">
      🎉 Form Submitted Successfully!
    </h2>

    <p className="text-gray-600 mb-6">
      Thank you for contacting us. Our team will get back to you shortly.
    </p>

    <button
      onClick={() => setIsSubmitted(false)}
      className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
    >
      Submit Another Response
    </button>
  </div>
) : (
  <form
    onSubmit={handleSubmit}
    className="w-[92%] md:w-[50%]
               mx-auto
               mt-[-150px] md:mt-[-200px]
               bg-white rounded-lg shadow-lg 
               p-6 md:p-8"
  >

    {/* Row 1 */}
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full">
  <label className="font-semibold">Full Name</label>

  <input
    name="fullName"
    value={formData.fullName}
    placeholder="Full Name"
    onChange={handleChange}
    className={`w-full border px-4 py-2 rounded-lg mt-1
      focus:outline-none
      ${errors.fullName
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
  />

  {errors.fullName && (
    <p className="text-red-500 text-sm">{errors.fullName}</p>
  )}
</div>


      <div className="w-full">
        <label className="font-semibold">Email</label>
        <input
          name="mail"
          value={formData.mail}
          placeholder="Email"
          onChange={handleChange}
          className={`w-full border px-4 py-2 rounded-lg mt-1
             ${errors.mail
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
        />
         {errors.mail && (
          <p className="text-red-500 text-sm">{errors.mail}</p>
        )}
      </div>
    </div>

    {/* Row 2 */}
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      <div className="w-full">
        <label className="font-semibold">Contact Number</label>
        <input
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact number"
          className={`w-full border px-4 py-2 rounded-lg mt-1
            ${errors.contactNumber
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
        />
        {errors.contactNumber && (
          <p className="text-red-500 text-sm">{errors.contactNumber}</p>
        )}
      </div>

      <div className="w-full">
        <label className="font-semibold">City</label>
        <input
          name="city"
          value={formData.city}
          placeholder="City"
          onChange={handleChange}
          className={`w-full border px-4 py-2 rounded-lg mt-1
             ${errors.city
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city}</p>
        )}
      </div>
    </div>

    {/* Course */}
    <div className="mt-4">
      <label className="font-semibold">Preferred Course</label>
      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
        className={`w-full border px-4 py-2 rounded-lg mt-1
           ${errors.course
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
      >
        <option value="">Select Option</option>
        <option>Graphic Design</option>
        <option>UI & UX Design</option>
        <option>Digital Marketing</option>
        <option>Video Editing</option>
        <option>Graphic Design and Video Editing</option>
      </select>
      {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
    </div>

    {/* Submit */}
    <button className="w-full mt-6 bg-red-800 text-white py-3 rounded text-xl hover:bg-blue-800">
      Submit
    </button>
  </form>
)}
</div>
          

      

          <Footer />
              
                      </div>
                    </div>
                  );
                };
                
             
   export default ContactUs



