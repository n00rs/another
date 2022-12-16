import React, { useEffect, useState } from "react";
import { deleteHandler, updateHandler } from "../../utils/api";
import { ContactCard } from "../UI/ContactCard";
// import FormInput from "../UI/FormInput";
// import { Modal } from "../UI/Modal";
import { EditContact } from "./EditContact";
// import { useEffect } from "react";

export const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [updateContact, setUpdateContact] = useState();

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (!res.ok) throw data;
      console.log(data);
      setContacts(data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    // console.log(id);
    try {
      const { success } = await deleteHandler(id);
      if (success) setContacts((prev) => prev.filter((contact) => contact._id !== id)); //REMOVING THE DELETED ID
    } catch (err) {
      console.log(err);
    }
  };
  const editHandler = (id) => {
    // console.log(id);
    setShowEdit(true);
    setUpdateContact(contacts.find((cont) => cont._id === id));
  };
  // console.log(showEdit);
  const hideModal = () => setShowEdit(false);
  const submitHandler = async (id, data) => {
    console.log(data);
    try {
      const { success } = await updateHandler({ id, body: data });
      hideModal();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      {showEdit && (
        <EditContact onClose={hideModal} data={updateContact} submitHandler={submitHandler} />
      )}
      <div className="container mt-5">
        <table className="table table-borderless table-responsive card-1 p-4 ">
          <thead>
            <tr className="border-bottom">
              <th>
                <span className="ml-2">#</span>
              </th>
              <th>
                <span className="ml-2">name</span>
              </th>
              <th>
                <span className="ml-2">phone</span>
              </th>
              <th>
                <span className="ml-2">address</span>
              </th>
              <th>
                <span className="ml-4">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, i) => {
              return (
                <>
                  <ContactCard
                    key={contact?._id}
                    address={contact?.address}
                    email={contact?.email}
                    index={i + 1}
                    phone={contact?.phone}
                    name={contact?.first_name + " " + contact?.last_name}
                    img={contact?.image}
                    deleteContact={deleteContact}
                    id={contact._id}
                    edit={editHandler}
                  />
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
