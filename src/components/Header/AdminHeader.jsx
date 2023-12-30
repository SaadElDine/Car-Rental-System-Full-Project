import React, { useEffect, useRef, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/admin/home",
    display: "New Car",
  },
  {
    path: "/admin/update",
    display: "Update Status",
  },
  {
    path: "/admin/report",
    display: "Report",
  },
];

const AdminHeader = () => {
  const menuRef = useRef(null);
  const [adminisLoggedIn, setadminIsLoggedIn] = useState(localStorage.getItem("adminloggedIn"));
  const [adminEmail, setadminEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search based on searchQuery
    console.log("Search query:", searchQuery);
  };

  useEffect(() => {
  
    const adminloggedIn = localStorage.getItem("loggedIn") === "true";
    const adminEmail = localStorage.getItem("adminEmail");
    setadminIsLoggedIn(adminloggedIn);
    setadminEmail(adminEmail);
    }, [adminisLoggedIn]);

  console.log(localStorage.getItem("adminloggedIn"));
  
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
              { adminisLoggedIn ? ( 
                    <div>
                      <span>Welcome, {adminEmail}</span>
                    </div>
                  ) 
                  : 
                  (
                    <>
                      <Link to="/admin/login" className=" d-flex align-items-center gap-1">
                        <i className="ri-login-circle-line"></i> Login
                      </Link>
                    </>
                )
              }
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      SAM Rental <br /> Car Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Egypt</h4>
                  <h6>Alexandria, Egypt</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Saturday to Friday</h4>
                  <h6>24 Hrs</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button type="submit">
                    <i className="ri-search-line"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default AdminHeader;
