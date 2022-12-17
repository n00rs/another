import styles from "./BlogCard.module.css";

export const BlogCard = ({ thumbnail, title, content, date, onClick, id }) => {
  date = new Date(date * 1000).toDateString().substring(3);
  return (
    <div className={` p-2 ${styles["blog-card"]}`} onClick={() => onClick(id)}>
      <img src={thumbnail} alt="Blog post image" />
      <div className={styles["card-content"]}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      <div className={styles["card-footer"]}>
        <p>Read more</p>
        <p>Posted on {date}</p>
      </div>
    </div>
  );
};
