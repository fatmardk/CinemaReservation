import {
  BsCardList,
  BsBagCheck,
  BsPeople,
  BsXCircle,
  BsBarChart,
} from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import { SlPencil } from "react-icons/sl";

import { Link } from "react-router-dom";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed z-10 top-0 ${side} sm:left-0  w-64 h-screen bg-palette1 transition-all ease-in-out duration-200`}
    >
      <Link to="/dashboard">
        <img src="/images/logo.png" alt="Logo" />
      </Link>
      <ul className="-mt-8">
        <li className="px-4 py-3 transition-all text-white flex items-center justify-center sm:hidden">
          <BsXCircle
            className="mr-2 text-3xl inline-block cursor-pointer"
            onClick={closeSidebar}
          />
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsBagCheck className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/players" className="text-base capitalize">
            Movies
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsCardList className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/teams" className="text-base capitalize">
            Comments
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <IoMdNotificationsOutline className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/notification" className="text-base capitalize">
            Latest Published
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
          <BsBarChart className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/brands" className="text-base capitalize">
            Statistics
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
        <BsPeople className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/users" className="text-base capitalize">
            Users
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
        <MdMeetingRoom className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/users" className="text-base capitalize">
            Room Settings
          </Link>
        </li>
        <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-palette2">
        <SlPencil className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/questions" className="text-base capitalize">
            Questions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
