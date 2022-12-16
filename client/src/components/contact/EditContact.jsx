import React, { useState } from "react";
import FormInput from "../UI/FormInput";
import { Modal } from "../UI/Modal";

export const EditContact = ({ onClose, data, submitHandler }) => {
  console.log(data);

  const initialState = {
    first_name: data?.first_name,
    last_name: data?.last_name,
    street: data?.address?.street,
    city: data?.address?.city,
    zipcode: data?.address?.zipcode,
    phone: "",
  };

  const [inputVal, setInputVal] = useState(initialState);

  const onChangeHandler = (e) =>
    setInputVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(data?._id, inputVal);
  };

  return (
    <Modal onClose={onClose}>
      <header>
        <h5 className="text-center">UPDATE DATA</h5>
      </header>
      <form onSubmit={onSubmit}>
        <div className="row">
          <FormInput
            name="first_name"
            label="FIRST_NAME"
            onChange={onChangeHandler}
            defaultValue={inputVal.first_name}
          />
          <FormInput
            name="last_name"
            label="LAST NAME"
            onChange={onChangeHandler}
            defaultValue={inputVal.last_name}
          />
        </div>
        <div className="row">
          <FormInput
            name="phone"
            label="PHONE"
            onChange={onChangeHandler}
            defaultValue={inputVal.phone}
          />
          <FormInput
            name="street"
            label="STREET"
            onChange={onChangeHandler}
            defaultValue={inputVal.street}
          />
        </div>
        <div className="row">
          <FormInput
            name="city"
            label="CITY"
            onChange={onChangeHandler}
            defaultValue={inputVal.city}
          />
          <FormInput
            name="zipcode"
            label="zipcode"
            onChange={onChangeHandler}
            defaultValue={inputVal.zipcode}
          />
        </div>
        <button className="btn">update</button>
      </form>
    </Modal>
  );
};
