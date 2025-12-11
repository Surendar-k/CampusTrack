import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import { FaUserGraduate, FaBoxOpen, FaComments, FaSignOutAlt } from 'react-icons/fa';

const AdminMenu = () => {
 let navigate=useNavigate();
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
      })
  };

return (
  <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-500 font-sans flex flex-col">

    {/* Header */}
    <header className="text-center py-6 bg-gradient-to-r from-green-600 to-green-400 shadow-lg">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
        Lost & Found Admin Menu
      </h1>
      <p className="text-white/90 italic mt-1 text-lg md:text-xl">
        Manage students, items & communications
      </p>
    </header>

    {/* Navbar */}
    <Navbar
      expand="lg"
      className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl mt-6 w-full px-4 lg:px-10"
    >
      <Navbar.Brand className="font-bold text-purple-700 ms-3">
        Admin Panel
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto gap-6 md:gap-10 font-semibold text-purple-800 flex-wrap justify-center items-center">

          {/* Students Dropdown — Icon Top + Label Bottom */}
          <NavDropdown
            id="student-nav-dropdown"
            className="[&_.dropdown-toggle::after]:hidden"
            title={
              <span className="flex flex-col items-center justify-center text-center hover:text-purple-900 transition">
                <FaUserGraduate className="text-xl mb-1" />
                <span className="text-sm">Students</span>
              </span>
            }
          >
            <NavDropdown.Item href="/student-list">Student List</NavDropdown.Item>
          </NavDropdown>

          {/* Items Dropdown — Icon Top + Label Bottom */}
          <NavDropdown
            id="items-nav-dropdown"
            className="[&_.dropdown-toggle::after]:hidden"
            title={
              <span className="flex flex-col items-center justify-center text-center hover:text-purple-900 transition">
                <FaBoxOpen className="text-xl mb-1" />
                <span className="text-sm">Items</span>
              </span>
            }
          >
            <NavDropdown.Item href="/lost-report">Lost Item List</NavDropdown.Item>
            <NavDropdown.Item href="/found-report">Found Item List</NavDropdown.Item>
          </NavDropdown>

          {/* Chat — Icon Top + Label Bottom */}
          <Nav.Link
            href="/chat"
            className="flex flex-col items-center justify-center text-center hover:text-purple-900 transition"
          >
            <FaComments className="text-xl mb-1" />
            <span className="text-sm">Chat</span>
          </Nav.Link>

          {/* Logout — Icon Top + Label Bottom */}
          <Nav.Link
            onClick={handleLogout}
            className="flex flex-col items-center justify-center text-center hover:text-red-600 transition"
          >
            <FaSignOutAlt className="text-xl mb-1" />
            <span className="text-sm">Logout</span>
          </Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>

    {/* Footer */}
    <footer className="mt-auto text-center py-4 text-white/80">
      &copy; 2025 Lost & Found. All rights reserved.
    </footer>
  </div>
);

}
export default AdminMenu;