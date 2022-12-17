import React, { useCallback, useEffect, useState } from "react";
// import { useRef } from "react";
import { deleteHandler, updateHandler } from "../../utils/api";
import { ContactCard } from "../UI/ContactCard";
import { Search } from "../UI/Search";
// import FormInput from "../UI/FormInput";
// import { Modal } from "../UI/Modal";
import { EditContact } from "./EditContact";
// import { useEffect } from "react";

export const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [updateContact, setUpdateContact] = useState();
  const [searchInp, setSearchInp] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchVal = (e) => setSearchInp(e.target.value);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch(`/api/contact?search=${searchInp}&page=${pageNo}`); //can add pageSize also
      const data = await res.json();
      if (!res.ok) throw data;
      console.log(data);
      setContacts(data?.data);
      setTotalPages(data?.metadata[0]?.totalPages);
    } catch (err) {
      console.error(err.message);
    }
  }, [searchInp, pageNo]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

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
  const searchHandler = () => {
    console.log(searchInp);
  };
  const prev = () => setPageNo((prev) => Math.max(1, prev - 1));
  const next = () => setPageNo((prev) => Math.min(totalPages, prev - 1));
  const changePageNo = (pageNo) => setPageNo(pageNo);
  const pages = new Array(totalPages).fill(null).map((_, i) => i);
console.log(pages,pageNo,totalPages);
  return (
    <>
      {showEdit && (
        <EditContact onClose={hideModal} data={updateContact} submitHandler={submitHandler} />
      )}
      <div className="container mt-5">
        <Search onChange={searchVal} search={searchHandler} />
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
        <nav className="float-end me-5">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" onClick={prev}>
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {pages.map((_, i) => (
              <li className="page-item" key={Math.random()}>
                <button className="page-link" onClick={() => changePageNo(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link" onClick={next}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
