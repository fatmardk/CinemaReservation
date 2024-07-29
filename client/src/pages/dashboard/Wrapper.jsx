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
      <section className=' ml-0 sm:ml-64 min-h-screen pt-28 px-4 bg-[#f3e7db]'>
      <div className='bg-[#e1c4a5] text-white px-4 py-6'>
       {children}
      </div>
    </section>
    </>
  );
};

export default Wrapper;
