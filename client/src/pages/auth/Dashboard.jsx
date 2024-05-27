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
        <Link to="/dashboard/team/register" className="team p-5">
          <div>
            <div className="flex justify-center mb-2 text-black">
              <IoFootball className="text-5xl" />
            </div>
            <span className="text-black">Film 1</span>
          </div>
        </Link>
        <Link to="/dashboard/player-mass" className="team p-5">
          <div>
            <div className="flex justify-center mb-2 text-black">
              <TbPlayFootball className="text-5xl" />
            </div>
            <span className="text-black">Film 2</span>
          </div>
        </Link>
        <Link to="/dashboard/team/besiktas" className="team p-5">
          <div>
            <div className="flex justify-center mb-2 text-black">
              <TbBrandDisney className="text-5xl" />
            </div>
            <span className="text-black">Film 3</span>
          </div>
        </Link>
        <Link to="/dashboard/management" className="team p-5">
          <div>
            <div className="flex justify-center mb-2 text-black">
              <CiSettings className="text-5xl" />
            </div>
            <span className="text-black">Film 4</span>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
