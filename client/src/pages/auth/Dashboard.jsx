import React from "react";
import Wrapper from "../dashboard/Wrapper";

import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    // canooomm
    <Wrapper>
      <div className="container flex justify-center items-center flex-wrap text-center">
        <Link to="/filmsalon/1" className="team p-5">
          <div>
            <img src="/images/pulp-fiction.jpg" alt="" />
            <span className="text-white font-semibold text-lg mt-2">Pulp Fiction</span>
          </div>
        </Link>
        <Link to="/filmsalon/2" className="team p-5">
          <div>
           <img src="/images/interstaller.jpg" alt="" />
            <span className="text-white font-semibold text-lg mt-2">Interstaller</span>
          </div>
        </Link>
        <Link to="/filmsalon/3" className="team p-5">
          <div>
            <img src="/images/inception.jpg" alt="" />
            <span className="text-white font-semibold text-lg mt-2">Inception</span>
          </div>
        </Link>
        <Link to="/filmsalon/9" className="team p-5">
          <div>
            <img src="/images/dark-knight.jpg" alt="" />
            <span className="text-white font-semibold text-lg mt-2">The Dark Knight</span>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
