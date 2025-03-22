import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import Logout from "./Logout";

function Header() {
  const authStatus = useSelector((state) => state.auth?.status);
  console.log(authStatus);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:border rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <a
          href="https://github.com/VanshAggarwal881/V-Blog"
          target="_blank"
          className="btn btn-ghost text-xl hover:border-white rounded-full"
        >
          V-blog
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-bock px-6 py-2 duration-200 hover:border rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </div>
      <div className="navbar-end flex items-center justify-end">
        <ThemeToggler />
      </div>
      {authStatus && <Logout />}
    </div>
  );
}

export default Header;
