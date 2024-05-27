import { useDispatch } from "react-redux";
import { logout } from "../app/reducers/authReducer";
import { BsFilterLeft } from "react-icons/bs";

const AdminNavigation = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const adminLogout = () => {
    dispatch(logout('user-token'));
  };
  return (
    <nav className="fixed left-0 sm:left-64 top-4 right-0">
      <div className="gradmenufooter w-full flex items-center p-4">
        <BsFilterLeft
          className="text-white text-3xl cursor-pointer sm:hidden block"
          onClick={openSidebar}
        />
        <button
          className="py-2 px-4 ml-auto gradmenufooter opacity-70 text-white rounded-md capitalize"
          onClick={adminLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavigation;
