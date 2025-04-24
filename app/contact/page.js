"use client";

import styles from "../page.module.css"; // Ensure this path is correct

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import Navbar from "../nav/nav";

export default function ContactPage() {
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("An error occurred.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-start items-start h-screen  overflow-auto contactPage mt-10 p-5">
        {/* Back Button */}

        {/* Left Section: Contact Information */}
        <div className="w-full md:w-1/2 pr-8 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold p-4">Contact Us</h1>
          <p className="">
            We’re here to assist you! If you have any questions or need
            assistance, please feel free to reach out.
          </p>
          <p className="mb-2">
            Whether you have questions about our products, need support with
            your order, or just want to share your thoughts, we’re always happy
            to hear from you.
          </p>
          <p className="mb-2">
            <b>Phone:</b> +251-939-098-222
          </p>
          <p className="mb-2">
            <b>Email:</b> rahwa3113@gmail.com
          </p>
          <p className="mb-4">
            <b>Location:</b> Addis Ababa, Ethiopia
          </p>
          <p>
            Alternatively, fill out the contact form, and we’ll get back to you
            as soon as possible. Your satisfaction is our priority!
          </p>
        </div>

        <div
          className={`${styles.contactPage} w-full md:w-1/2 flex flex-col items-start`}
        >
          <h1 className="text-2xl font-extrabold mb-4">Contact Form</h1>
          {status && <p className="mb-2">{status}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className="mb-4 w-full">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded text-black bg-white"
              />
            </div>
            <button
              className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md transition-all duration-300 focus:outline-none cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
