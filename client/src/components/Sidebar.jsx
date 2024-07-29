import {
  BsCardList,
  BsBagCheck,
  BsPeople,
  BsXCircle,
  BsBarChart,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-[#332f1a] z-10 transition-all`}>
      <Link to="/dashboard">
        <img src="/logo.png" alt="Logo" />
      </Link>
      <ul className="mt-3">
        <li className="px-4 py-3 transition-all text-white flex items-center justify-center sm:hidden">
          <BsXCircle
            className="bi bi-x-lg absolute top-4 right-4 sm:hidden block cursor-pointer text-lg"
            onClick={closeSidebar}
          />
        </li>
        <li className="p-3 text-white cursor-pointer hover:bg-[#474330] transition 200 border-b border-stone-700">
          <BsCardList className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/reservation" className="text-base capitalize">
            New Customer
          </Link>
        </li>
        <li className="p-3 text-white cursor-pointer hover:bg-[#474330] transition 200 border-b border-stone-700">
          <BsBagCheck className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/movies" className="text-base capitalize">
            Settings Movie
          </Link>
        </li>
        {/* <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsPeople className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/showtimes/hall" className="text-base capitalize">
            Halls
          </Link>
        </li> */}
        <li className="p-3 text-white cursor-pointer hover:bg-[#474330] transition 200 border-b border-stone-700">
          <BsBarChart className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/showtimes/create" className="text-base capitalize">
            Add Showtime
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
