import { useState } from "react";
import AdminNavigation from "../../components/AdminNavigation";
import Sidebar from "../../components/Sidebar";

const Wrapper = ({ children }) => {
  const [side, setSide] = useState("-left-64");

  const openSidebar = () => {
    setSide("left-0");
  };

  const closeSidebar = () => {
    setSide("-left-64");
  };

  return (
    <>
      <Sidebar side={side} closeSidebar={closeSidebar} />
      <AdminNavigation openSidebar={openSidebar} />
      <section className="ml-0 sm:ml-64 bg-custom-gradient min-h-screen pt-28">
        <div className=" text-white p-4">{children}</div>
      </section>
    </>
  );
};

export default Wrapper;
