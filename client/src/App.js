import { useState } from "react";
import { AddContact } from "./components/contact/AddContact";
import { ViewContacts } from "./components/contact/ViewContacts";
import FrontendTest from "./components/frontenfTest/FrontendTest";
import { ErrorPage } from "./components/UI/ErrorPage";
import Layout from "./components/UI/Layout";

function App() {
  const [tab, setTab] = useState("addContact");  //                          // not using react router since its an small project
  const changeTab = (tab) => setTab(tab);
  return (
    <Layout currentTab={tab} changeTab={changeTab}>
      {tab === "addContact" ? (
        <AddContact />
      ) : tab === "viewContacts" ? (
        <ViewContacts />
      ) : tab === "frontendTest" ? (
        <FrontendTest />
      ) : (
        <ErrorPage />
      )}
    </Layout>
  );
}

export default App;
