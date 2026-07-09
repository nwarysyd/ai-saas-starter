"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-bg-page text-primary-text">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-1 w-full overflow-y-auto scrollbar-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Contact Us</h1>
          <p className="text-lg text-secondary-text mb-12">We'd love to hear from you. Send us a message!</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-bg-card border border-divider/50 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-text mb-1">Email</h3>
                    <p className="text-sm text-secondary-text">support@aiforge.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-bg-card border border-divider/50 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <FaPhone className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-text mb-1">Phone</h3>
                    <p className="text-sm text-secondary-text">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-bg-card border border-divider/50 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-text mb-1">Address</h3>
                    <p className="text-sm text-secondary-text">123 AI Street, Tech Valley, CA 94025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-bg-card border border-divider/50 rounded-lg p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bg-page border border-divider/30 text-primary-text placeholder-secondary-text focus:border-primary focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bg-page border border-divider/30 text-primary-text placeholder-secondary-text focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-bg-page border border-divider/30 text-primary-text placeholder-secondary-text focus:border-primary focus:outline-none transition-colors"
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-bg-page border border-divider/30 text-primary-text placeholder-secondary-text focus:border-primary focus:outline-none transition-colors resize-none"
                />

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/30"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
