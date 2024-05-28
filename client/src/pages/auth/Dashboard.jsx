import React from "react";
import Wrapper from "../dashboard/Wrapper";
import Sidebar from "../../components/Sidebar";
import { IoFootball } from "react-icons/io5";
import { TbPlayFootball } from "react-icons/tb";
import { TbBrandDisney } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";

import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    // canooomm
    <Wrapper>
      <div className="container flex justify-center items-center flex-wrap text-center">
        <Link to="/filmsalon/1" className="team p-5">
          <div>
            <img src="./public/images/pulp-fiction.jpg" alt="" />
            <span className="text-black">Pulp Fiction</span>
          </div>
        </Link>
        <Link to="/filmsalon/2" className="team p-5">
          <div>
           <img src="./public/images/interstaller.jpg" alt="" />
            <span className="text-black">Interstaller</span>
          </div>
        </Link>
        <Link to="/filmsalon/3" className="team p-5">
          <div>
            <img src="./public/images/inception.jpg" alt="" />
            <span className="text-black">Inception</span>
          </div>
        </Link>
        <Link to="/filmsalon/9" className="team p-5">
          <div>
            <img src="./public/images/dark-knight.jpg" alt="" />
            <span className="text-black">The Drak Knight</span>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
