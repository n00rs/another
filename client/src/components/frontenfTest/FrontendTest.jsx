import React from "react";
import { useState } from "react";
import { testContent } from "../../utils/frontentApi";
import { BlogCard } from "../UI/BlogCard";
import { BlogModal } from "./BlogModal";

const FrontendTest = () => {
  const [blog, setBlog] = useState({});
  const [modalBlog, setModalBlog] = useState(false);
  const showBlog = (id) => {
    console.log(id);
    const blog = testContent?.find((blog) => blog?.id === id);
    if (blog) {
      setBlog(blog);
      setModalBlog(true);
    }
  };

  const blogContent = testContent?.map((blog) => (
    <BlogCard
      key={blog?.id}
      content={blog?.content}
      thumbnail={blog?.thumbnail?.small}
      title={blog?.title}
      date={blog?.date}
      id={blog?.id}
      onClick={showBlog}
    />
  ));
  console.log(blog);
  const hideModal = () => setModalBlog(false);
  return (
    <>
      {modalBlog && <BlogModal onClose={hideModal} blog={blog}/>}
      <div className="container mt-5">
        <div className="row ">{blogContent}</div>
      </div>
    </>
  );
};

export default FrontendTest;
