import React from "react";
import FormInput from "../UI/FormInput";

export const AddContact = () => {
    
  return (
    <section>
      <div className="container mt-5">
        <div className="row g-2 ">
          <FormInput type="text" name="first_name" placeholder="FIRST NAME" label="FIRST NAME" />
          <FormInput type="text" name="last_name" placeholder="LAST NAME" label="LAST NAME" />
        </div>
        <div className="row g-2">
          <FormInput type="email" name="email" placeholder="EMAIL" label="EMAIL" />
          <FormInput type="number" name="phone" placeholder="PHONE" label="PHONE" />
        </div>
        <div className="row g-2">
          <FormInput type="text" name="street" placeholder="STREET" label="STREET" />
          <FormInput type="text" name="city" placeholder="CITY" label="CITY" />
        </div>
        <div className="row g-2">
          <FormInput type="number" name="zipcode" placeholder="ZIPCODE" label="ZIPCODE" />
          <FormInput type="file" name="image" placeholder="IMAGE" />
        </div>
        <button type="submit" className="btn btn-outline-warning text-black float-end">
          ADD-CONTACT
        </button>
      </div>
    </section>
  );
};
