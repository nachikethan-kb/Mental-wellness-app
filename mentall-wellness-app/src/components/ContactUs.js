import React from "react";

const ContactUs = () => (
  <div style={{ maxWidth: 500, margin: "auto", background: "#f7f7fa", borderRadius: 10, padding: 28, boxShadow: "0 2px 16px #ccc4" }}>
    <h2>Contact Us</h2>
    <form
      onSubmit={e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        alert(`Thank you ${name}! We'll respond to ${email} soon.`);
        e.target.reset();
      }}
    >
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" required style={{ width: "100%" }}/>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" required style={{ width: "100%" }}/>
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message" rows={5} required style={{ width: "100%" }}/>
      </div>
      <button type="submit" className="btn btn-primary">Send Message</button>
    </form>
  </div>
);

export default ContactUs;
