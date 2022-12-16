import React, { useEffect, useState } from "react";
import { ContactCard } from "../UI/ContactCard";
// import { useEffect } from "react";

export const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (!res.ok) throw data;
      setContacts(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  console.log(contacts);
  return (
    <div className="container mt-5">
      <table className="table table-borderless table-responsive card-1 p-4">
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
          <ContactCard />
        </tbody>
      </table>
    </div>
  );
};
