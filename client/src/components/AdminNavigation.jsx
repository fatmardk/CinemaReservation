import { useDispatch } from "react-redux";
import { logout } from "../app/reducers/authReducer";
import { BsFilterLeft } from "react-icons/bs";

const AdminNavigation = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const adminLogout = () => {
    dispatch(logout('user-token'));
  };
  return (
    <nav className="absolute left-0 sm:left-64 top-4 right-0 mx-4">
      <div className="bg-[#e1c4a5] w-full justify-between sm:justify-end items-center flex p-4 h-15">
        <BsFilterLeft
          className="bi bi-filter-left text-white text-2xl cursor-pointer sm:hidden block" 
          onClick={openSidebar}
        />
        <button
          className="py-2 px-4 bg-amber-50 hover:bg-[#937d68] hover:text-white transition 200 text-black rounded-md capitalize"
          onClick={adminLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavigation;
