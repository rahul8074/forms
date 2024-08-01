import React, { useEffect, useState } from "react";
import DisplayForm from "./DisplayForm";

const Form = () => {
    const fields = [
        {
          name: "Name",
          type: "text",
          placeholder: "Enter your name",
          required: true,
          validType: "string",
        },
        {
          name: "Email",
          type: "text",
          placeholder: "Enter Email address",
          required: true,
          validType: "email",
        },
        {
          name: "Mobile",
          type: "text",
          minLength: 8,
          maxLength: 10,
          placeholder: "Enter Mobile number",
          required: true,
          validType: "number",
        },
        {
          name: "Address",
          type: "text",
          placeholder: "Enter your address",
          required: true,
          validType: "string",
        },
      ];
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Address: "",
  });
  const [errors, setErrors] = useState({});
  const [afterData, setAfterData] = useState();


  const validateField = (name, value) => {
    let error = "";
    const field = fields.find((item) => item.name === name);

    if (field.required && !value) {
      error = `${name} is required.`;
    } else if (field.validType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format.";
      }
    } else if (field.validType === "number") {
        if (isNaN(value)) {
            error = `Mobile Number should be Integer only`;
        }
     else if (value.length < field.minLength || value.length > field.maxLength) {
        error = `Mobile number Length should be between ${field.minLength} and ${field.maxLength}`;
      }
    }

    return error;
  };

  function handleSubit(e) {
    e.preventDefault();

    // validations
    let newErrors = {};
    for (let key in formData) {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    }

    setErrors(newErrors);

    if (Object.keys(errors).length === 0) {
        localStorage.setItem("formData", JSON.stringify(formData));
        setFormData({ Name: "", Email: "", Mobile: "", Address: "" });
    }

    setTimeout(() => {
        setAfterData({... JSON.parse(localStorage.getItem("formData"))})
    },30000)
  }

  function handleChange(e) {
    console.log("event in change::", e.target.name);
    for (let key in formData) {
      if (!formData[key]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: `${key} is required.`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: ``,
        }));
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    console.log("formDataf::", formData);
  }, [formData]);

  return (
    <>
      <form onSubmit={handleSubit}>
        {fields.map((field, ind) => (
          <div style={{ marginTop: "5px" }}>
            <label style={{ marginRight: "5px" }}>{field.name}</label>
            <input
              onChange={handleChange}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <div style={{ color: "red" }}>{errors[field.name]}</div>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      <DisplayForm data={afterData}/>
    </>
  );
};


export default Form;
