import React, { useState } from "react";
import { submitContact } from "../../utils/api";
import FormInput from "../UI/FormInput";

const initialState = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  street: "",
  city: "",
  zipcode: "",
};

export const AddContact = () => {
  const [formInput, setFormInput] = useState(initialState);
  const [image, setImage] = useState();

  const getInputVal = (e) => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getFile = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //TODO add validation
      const formData = new FormData();
      formData.append("image", image);
      for (let value in formInput) {
        formData.append(value, formInput[value]);
      }
      console.log(formData.get("first_name"));
      const data = await submitContact(formData);
      console.log(data);
      if (data.success) {
        alert("contact added");
        setFormInput(initialState);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section>
      <div className="container mt-5">
        <form onSubmit={submitHandler}>
          <div className="row g-2 ">
            <FormInput
              type="text"
              name="first_name"
              placeholder="FIRST NAME"
              label="FIRST NAME"
              onChange={getInputVal}
              defaultValue={initialState.first_name}
            />
            <FormInput
              type="text"
              name="last_name"
              placeholder="LAST NAME"
              label="LAST NAME"
              onChange={getInputVal}
              defaultValue={initialState.last_name}
            />
          </div>
          <div className="row g-2">
            <FormInput
              type="email"
              name="email"
              placeholder="EMAIL"
              label="EMAIL"
              onChange={getInputVal}
            />
            <FormInput
              type="number"
              name="phone"
              placeholder="PHONE"
              label="PHONE"
              onChange={getInputVal}
            />
          </div>
          <div className="row g-2">
            <FormInput
              type="text"
              name="street"
              placeholder="STREET"
              label="STREET"
              onChange={getInputVal}
              defaultValue={initialState.street}
            />
            <FormInput
              type="text"
              name="city"
              placeholder="CITY"
              label="CITY"
              onChange={getInputVal}
              defaultValue={initialState.city}
            />
          </div>
          <div className="row g-2">
            <FormInput
              type="number"
              name="zipcode"
              placeholder="ZIPCODE"
              label="ZIPCODE"
              onChange={getInputVal}
              defaultValue={initialState.zipcode}
            />
            <FormInput type="file" name="image" placeholder="IMAGE" onChange={getFile} />
          </div>
          <button type="submit" className="btn btn-outline-warning text-black float-end">
            ADD-CONTACT
          </button>
        </form>
      </div>
    </section>
  );
};
