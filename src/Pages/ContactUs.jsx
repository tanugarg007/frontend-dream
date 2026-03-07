import React, { useState } from "react";
import logo9 from "../Images/page-background.JPG";
import contactBg from "../Images/contact-bg.JPG.jpeg";
import Footer from "../Component/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { serverUrl } from "../url/url";
const ContactUs = () => {
  const NAME_REGEX = /^[A-Za-z ]+$/;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "",
    message:""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!formData.name.trim()) newErrors.name = "Full name is required";
  else if (!NAME_REGEX.test(formData.name.trim()))
    newErrors.name = "Full name can contain only letters and spaces";
  if (!formData.email) newErrors.email = "Email is required";
  if (!formData.phone)
    newErrors.phone = "Contact number is required";
  if (!formData.city) newErrors.city = "City is required";
  if (!formData.course) newErrors.course = "Please select a course";
  if (!formData.message) newErrors.message = "Message is required";
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  try {
    const response = await fetch(
      `${serverUrl}/users/enquiry`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error("Failed to submit");
    }

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      course: "",
      message:"",
    });
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  const fieldClass = (hasError) =>
    `w-full mt-2 border-2 bg-white/95 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
      hasError
        ? "border-red-500"
        : "border-slate-200 focus:border-blue-700 hover:border-blue-500"
    }`;

  return (
    <div className="w-full bg-slate-50">
      <div
        className="relative w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${logo9})` }}
      >
        <div className="absolute inset-0 bg-slate-900/35 pointer-events-none" />
        <div className="relative z-10 pt-[52px] pb-0">
          <div
            className="w-full h-[380px] lg:h-[440px] overflow-hidden rounded-b-[36px] lg:rounded-b-[64px] border-b border-white/10 shadow-2xl bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(90, 10, 10, 0.68), rgba(55, 10, 10, 0.72)), url(${contactBg})`,
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-cyan-300/70" />
            <div className="h-full max-w-6xl mx-auto px-4 lg:px-10 flex flex-col justify-start items-center text-center relative pt-[72px] lg:pt-16">
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-red-400/20 blur-3xl rounded-full" />
              <div className="absolute bottom-4 right-0 w-52 h-52 bg-red-300/20 blur-3xl rounded-full" />
              <h2 className="text-white text-3xl lg:text-5xl font-bold tracking-[0.04em] mt-1 lg:mb-2 relative">
                CONTACT US
              </h2>

              <p className="text-white/95 text-sm lg:text-lg mb-5 lg:mb-6 max-w-[22rem] lg:max-w-3xl leading-6 lg:leading-relaxed relative">
                Have questions about our courses? Fill out the contact form below
                or call us directly. Our team is here to guide you toward the
                right creative career path.
              </p>
              {/* <div className="hidden lg:flex items-center gap-4 relative">
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm">
                  Career Guidance
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm">
                  Fast Response
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm">
                  Expert Team
                </span>
              </div> */}
            </div>
          </div>

          {isSubmitted ? (
            <div className="relative z-20 w-[92%] lg:w-[62%] lg:w-[52%] mx-auto mt-[-170px] lg:mt-[-220px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center mx-auto mb-4">
                DONE
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Form Submitted Successfully!
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Thank you for contacting us. Our team will get back to you
                shortly.
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="px-7 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900 transition"
              >
                Submit Another Response
              </button>
            </div>
          ) : (
            <div className="relative z-20 w-[92%] lg:w-[78%] xl:w-[72%] mx-auto mt-[-190px] lg:mt-[-220px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div
                  className="lg:col-span-2 relative overflow-hidden text-white p-8 lg:p-10 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${logo9})`,
                  }}
                >
                  <div className="absolute inset-0 bg-slate-900/35 pointer-events-none" />
                  <div className="relative z-10">
                  <p className="text-blue-200 text-sm tracking-[0.2em] font-semibold uppercase">
                    Contact Details
                  </p>
                  <h3 className="text-3xl font-bold mt-3 leading-tight">
                    Start Your Creative Journey Today
                  </h3>
                  <p className="text-slate-300 mt-4 leading-relaxed">
                    Share your details, and our counselors will help you choose
                    the best course based on your goals.
                  </p>

                  <div className="mt-8 space-y-4">
                   
                    <div className="rounded-xl border border-slate-600/80 bg-slate-700/50 px-4 py-3">
                      <p className="text-xs text-slate-300 uppercase tracking-wide">
                        Support
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        Fast responses for all course inquiries
                      </p>
                    </div>
                  </div>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="lg:col-span-3 p-6 lg:p-10"
                >
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-800">
                    Let's Connect
                  </h3>
                  <p className="text-slate-600 mt-2 mb-6">
                    Fill out this form, and our team will contact you shortly.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
<div className="w-full">
                      <label className="font-semibold text-slate-700">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        placeholder="Full Name"
                        onChange={handleChange}
                        className={fieldClass(errors.name)}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="font-semibold text-slate-700">Email</label>
                      <input
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                        className={fieldClass(errors.email)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                  <div className="w-full">
  <label className="font-semibold text-slate-700">
    Contact Number
  </label>

  <PhoneInput
    country={"in"} // default India
    enableSearch
    value={formData.phone}
    onChange={(phone) =>
      setFormData({ ...formData, phone })
    }
    inputStyle={{
      width: "100%",
      height: "50px",
      borderRadius: "12px",
      borderWidth: "2px",
      borderColor: errors.phone ? "#ef4444" : "#e2e8f0",
      paddingLeft: "52px",
      fontSize: "14px",
    
    }}
    buttonStyle={{
      height: "50px",
      borderTopLeftRadius: "12px",
      borderBottomLeftRadius: "12px",
      borderWidth: "2px",
      borderColor: errors.phone ? "#ef4444" : "#e2e8f0",
      backgroundColor: "#fff",
    }}
    containerClass="contact-phone !w-full"
    containerStyle={{ width: "100%", marginTop: "8px" }}
  />

  {errors.phone && (
    <p className="text-red-500 text-sm mt-1">
      {errors.phone}
    </p>
  )}
</div>

                    <div className="w-full">
                      <label className="font-semibold text-slate-700">City</label>
                      <input
                        name="city"
                        value={formData.city}
                        placeholder="City"
                        onChange={handleChange}
                        className={fieldClass(errors.city)}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="font-semibold text-slate-700">
                      Preferred Course
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className={fieldClass(errors.course)}
                    >
                      <option value="">Select Option</option>
                      <option>Graphic Design</option>
                      <option>UI & UX Design</option>
                      <option>Digital Marketing</option>
                      <option>Video Editing</option>
                      <option>Graphic Design and Video Editing</option>
                    </select>
                    {errors.course && (
                      <p className="text-red-500 text-sm mt-1">{errors.course}</p>
                    )}
                  </div>
                    <div className="mt-4">
  <label className="font-semibold text-slate-700">Message</label>
  <textarea
    name="message"   // 👈 YE ADD KARNA THA
    value={formData.message}
    onChange={handleChange}
    rows="3"
    className="w-full px-3 py-2 border rounded"
  />
  {errors.message && (
    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
  )}
</div>
                  <button className="w-full mt-6 bg-red-800 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-800 transition">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
