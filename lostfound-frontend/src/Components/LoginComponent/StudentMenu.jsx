import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import { FaUser, FaBoxOpen, FaEdit, FaComments, FaSignOutAlt } from "react-icons/fa";

const StudentMenu = () => {
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
        Lost & Found Student Menu
      </h1>
      <p className="text-white/90 italic mt-1 text-lg md:text-xl drop-shadow-sm">
        Manage your profile, submissions, and items easily
      </p>
    </header>

    {/* Navbar */}
    <Navbar
      expand="lg"
      className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl mt-6 w-full px-4 lg:px-10"
    >
      <Navbar.Brand className="font-bold text-purple-700 ms-3">
        Student Panel
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto gap-6 md:gap-10 font-semibold text-purple-800 flex-wrap justify-center items-center">

          {/* Personal Section */}
          <NavDropdown
            id="personal-nav-dropdown"
            className="[&_.dropdown-toggle::after]:hidden"
            title={
              <span className="flex flex-col items-center justify-center text-center hover:text-purple-900 transition">
                <FaUser className="text-xl mb-1" />
                <span className="text-sm">Personal</span>
              </span>
            }
          >
            <NavDropdown.Item href="/profile" className="hover:bg-purple-100 transition">
              Personal Details
            </NavDropdown.Item>
          </NavDropdown>

          {/* Items Section */}
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
            <NavDropdown.Item href="/lost-report" className="hover:bg-purple-100 transition">
              Lost Item List
            </NavDropdown.Item>
            <NavDropdown.Item href="/found-report" className="hover:bg-purple-100 transition">
              Found Item List
            </NavDropdown.Item>
          </NavDropdown>

          {/* Submission Section */}
          <NavDropdown
            id="submission-nav-dropdown"
            className="[&_.dropdown-toggle::after]:hidden"
            title={
              <span className="flex flex-col items-center justify-center text-center hover:text-purple-900 transition">
                <FaEdit className="text-xl mb-1" />
                <span className="text-sm">Submission</span>
              </span>
            }
          >
            <NavDropdown.Item href="/lost-entry" className="hover:bg-purple-100 transition">
              Lost Item Form Submission
            </NavDropdown.Item>
            <NavDropdown.Item href="/found-entry" className="hover:bg-purple-100 transition">
              Found Item Form Submission
            </NavDropdown.Item>
          </NavDropdown>

          {/* Chat */}
          <Nav.Link
            href="/chat"
            className="flex flex-col items-center justify-center text-center hover:text-purple-900 transition"
          >
            <FaComments className="text-xl mb-1" />
            <span className="text-sm">Chat</span>
          </Nav.Link>

          {/* Logout */}
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
    <footer className="mt-auto text-center py-4 text-white/80 bg-purple-800/30 backdrop-blur-md shadow-inner">
      &copy; 2025 Lost & Found. All rights reserved.
    </footer>
  </div>
);


};

export default StudentMenu;