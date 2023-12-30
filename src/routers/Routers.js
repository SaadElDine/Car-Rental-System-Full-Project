import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import { AdminReport } from "../pages/AdminReport";
import { LoginPage } from "../pages/Login";
import { AdminLogin } from "../pages/AdminLogin";
import { RegisterPage } from "../pages/Register";
import { AdminHome } from "../pages/AdminHome";
import { AdminUpdate } from "../pages/AdminUpdate";
import { Table } from "../pages/Table";
import { Reservation } from "../pages/Reservation";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/update" element={<AdminUpdate />} />
      <Route path="/admin/report" element={<AdminReport />} />
      <Route path="/admin/table" element={<Table />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;