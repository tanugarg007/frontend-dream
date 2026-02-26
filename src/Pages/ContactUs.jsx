import React, { useState } from "react";
import logo9 from "../Images/page-background.JPG";
import contactBg from "../Images/contact-bg.JPG.jpeg";
import Footer from "../Component/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mail: "",
    contactNumber: "",
    city: "",
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

    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.mail) newErrors.mail = "Email is required";
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    }
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.course) newErrors.course = "Please select a course";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitted(true);
    setFormData({
      fullName: "",
      mail: "",
      contactNumber: "",
      city: "",
      course: "",
    });
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
            className="w-full h-[340px] md:h-[440px] overflow-hidden rounded-b-[44px] md:rounded-b-[64px] border-b border-white/10 shadow-2xl bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(90, 10, 10, 0.68), rgba(55, 10, 10, 0.72)), url(${contactBg})`,
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-cyan-300/70" />
            <div className="h-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col justify-start items-center text-center relative pt-14 md:pt-16">
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-red-400/20 blur-3xl rounded-full" />
              <div className="absolute bottom-4 right-0 w-52 h-52 bg-red-300/20 blur-3xl rounded-full" />
              <h2 className="text-white text-4xl md:text-5xl font-bold tracking-[0.06em] mt-2 md:mb-2 relative">
                CONTACT US
              </h2>

              <p className="text-white/90 text-base md:text-lg mb-6 max-w-3xl leading-relaxed relative">
                Have questions about our courses? Fill out the contact form below
                or call us directly. Our team is here to guide you toward the
                right creative career path.
              </p>
              {/* <div className="hidden md:flex items-center gap-4 relative">
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
            <div className="relative z-20 w-[92%] md:w-[62%] lg:w-[52%] mx-auto mt-[-170px] md:mt-[-220px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 text-center">
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
            <div className="relative z-20 w-[92%] lg:w-[78%] xl:w-[72%] mx-auto mt-[-170px] md:mt-[-220px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div
                  className="lg:col-span-2 text-white p-8 md:p-10 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15, 23, 52, 0.92), rgba(30, 64, 185, 0.78)), url(${logo9})`,
                  }}
                >
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

                <form
                  onSubmit={handleSubmit}
                  className="lg:col-span-3 p-6 md:p-10"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                    Let's Connect
                  </h3>
                  <p className="text-slate-600 mt-2 mb-6">
                    Fill out this form, and our team will contact you shortly.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="font-semibold text-slate-700">
                        Full Name
                      </label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        placeholder="Full Name"
                        onChange={handleChange}
                        className={fieldClass(errors.fullName)}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="font-semibold text-slate-700">Email</label>
                      <input
                        name="mail"
                        value={formData.mail}
                        placeholder="Email"
                        onChange={handleChange}
                        className={fieldClass(errors.mail)}
                      />
                      {errors.mail && (
                        <p className="text-red-500 text-sm mt-1">{errors.mail}</p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="font-semibold text-slate-700">
                        Contact Number
                      </label>
                      <input
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Contact number"
                        className={fieldClass(errors.contactNumber)}
                      />
                      {errors.contactNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contactNumber}
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
