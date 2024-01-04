import React, { Fragment } from "react";
import { useLocation } from 'react-router-dom';
import Header from "../Header/Header";
import AdminHeader from "../Header/AdminHeader";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

const Layout = () => {
  const location = useLocation();

  // Access the pathname property of the location object to get the current URL path
  const currentPath = location.pathname;
  const isAdmin = currentPath.includes("admin");
  

  return (
    <Fragment>
      {isAdmin? <AdminHeader />:<Header />}
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
