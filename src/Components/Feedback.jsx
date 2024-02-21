import React, { useState } from "react";
import imgs from "./feedback.gif";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && value.length < formData.phone.length) {
      setFormData({
        ...formData,
        [name]: value,
      });
      return;
    }

    if (name === "phone" && formData.phone.length === 10) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (value.trim() === "") {
      newErrors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required`;
    } else {
      newErrors[name] = "";
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }

    if (!formData.phone.trim() || formData.phone.length !== 10) {
      newErrors.phone = "Phone number is required and must be 10 digits";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const feedbackId = uuidv4();
      toast.success(`Feedback submitted with id: 
      #${feedbackId}`, {
        duration: 4000,
        style: {
          height: "100px",
          background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)",
          color: "#fff",
          fontWeight: "bolder",
          position: "top-center",
        },
      });
      console.log("inputfield data=", formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  return (
    <>
      <div>
        <div className="container mt-5">
          <div className="cards">
            <div className="row">
              <div className="col col-sm-6 col-md-6 col-lg-6 ">
                <div className="d-flex justify-content-center">
                  <img
                    alt="something"
                    src={imgs}
                    height="95%"
                    width="100%"
                    className=" d-sm-block mt-1 mb-1"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="input-section col-sm-12 col-12">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="name">Name</label>
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="email">Email</label>
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">+91</span>
                      <div className="form-floating">
                        <input
                          type="number"
                          className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          placeholder="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="phone">Phone</label>
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        className={`form-control mb-3 ${
                          errors.message ? "is-invalid" : ""
                        }`}
                        placeholder="Leave a comment here"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Comments</label>
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>
                    <div className="d-grid gap-2">
                      <button className="btn btn btn-outline-primary ">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}

export default Feedback;