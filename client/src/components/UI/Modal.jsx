import styles from "./Modal.module.css";

export const Modal = ({ children, onClose }) => {
  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
