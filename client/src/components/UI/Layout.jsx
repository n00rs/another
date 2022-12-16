import React from "react";
import { Nav } from "./Nav";

const Layout = ({ children, currentTab, changeTab }) => {
  return (
    <section>
      <Nav currentTab={currentTab} changeTab={changeTab} />
      {children}
    </section>
  );
};

export default Layout;
