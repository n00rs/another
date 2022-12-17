import React from "react";
import { Modal } from "../UI/Modal";
import styles from "./BlogModal.module.css";

export const BlogModal = ({ onClose, blog }) => {
  const { thumbnail, author } = blog;
  return (
    <Modal onClose={onClose}>
      <header className="text-end" style={{ cursor: "pointer" }} onClick={onClose}>
        X
      </header>
      <section className="container">
        <div className="">
          <img
            src={thumbnail?.large}
            alt=''
            className="img-fluid img-thumbnail"
            style={{ width: "100%" }}
          />
        </div>
        <figcaption className="mt-3 ms-2">
          <h4 className="">{blog?.title}</h4>
        </figcaption>
        <p className="ms-2">{blog?.content}</p>
        <div className={styles["author-details"]}>
          <img src={author?.avatar} alt="sdfs" className={styles["author-image"]} />
          <p>{author?.name} </p>
          <p>{author?.role} </p>
        </div>
      </section>
    </Modal>
  );
};
