import styles from "./BlogCard.module.css";
export const BlogCard = () => {
  return (
    <div class={styles["blog-card"]}>
      <img
        src="https://images.unsplash.com/photo-1454692173233-f4f34c12adad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80"
        alt="Blog post image"
      />
      <div class={styles["card-content"]}>
        <h3>Blog post title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada mauris id nunc
          ornare, et aliquam leo fermentum.
        </p>
      </div>
      <div class={styles["card-footer"]}>
        <p>Posted on January 1, 2020</p>
        <p>Read more</p>
      </div>
    </div>
  );
};
