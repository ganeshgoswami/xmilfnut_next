"use client";
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
   
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="mb-4">Contact Us</h1>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="d-flex align-items-center"></div>
                </div>

                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-envelope fs-4 text-primary"></i>
                    </div>
                    <div>
                      <h6 className="mb-1">Email Us</h6>
                      <p className="mb-0 small text-muted">
                        support@xmilfnut.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="d-flex align-items-center"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="mb-4">Send us a message</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        name="message"
                        style={{ height: "150px" }}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary px-4" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
