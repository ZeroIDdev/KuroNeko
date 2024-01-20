/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { IoMenu } from "react-icons/io5";
import { FaUser, FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import useLogout from "../hooks/useLogut";
import { useState, useRef } from "react";
import Logo from "../assets/Kuro-Neko.png";
import { MdLogout } from "react-icons/md";
export function Header({ setInputValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();
  const [userMenu, setUserMenu] = useState();
  const searchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const handleClick = () => {
    logout();
  };
  const openSearchHandle = () => {
    if (searchRef.current) {
      searchRef.current.focus();
      setOpenSearch((prev) => !prev);
    }
  };
  return (
    <div className="w-max-full w-full flex px-8 h-16 justify-between items-center bg-[#152232] sticky -top-1 z-40">
      
      <div className="flex gap-5 items-center">
        <div className="drawer">
          
          <input
            type="checkbox"
            name=""
            id="my-drawer"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button">
              <IoMenu size="35" />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="menu w-64 bg-base-200 min-h-full">
             {!user && (
                  <div className="flex gap-4 flex-col">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </div>
                )}
              <ul className="flex flex-col gap-5 mt-6">
                <li>Home</li>
                <li>Ongoing</li>
                <li>Complete</li>
                <li>Movie</li>
                <li>History</li>
                <li>Favorite</li>
              </ul>
              {user && (
                <div className="flex gap-4 flex-col">
                  <h1
                    className=" font-bold bottom-6 absolute flex items-center gap-2"
                    onClick={handleClick}
                  >
                    <MdLogout size={18} /> Logout
                  </h1>
                </div>
              )}
            </div>
          </div>
          
        </div>
       
       
      </div>
      <Link to="/">
            <img src={Logo} alt="" className="w-[25rem]" />
          </Link>{" "}
      <div>
        
        <div className="flex flex-row-reverse items-center gap-4">
          {/* {user && (
            <details className="dropdown">
              <summary className="btn bg-transparent border-none hover:bg-transparent ">
                {userMenu ? (
                  <RxCross2 size={22} onClick={() => setUserMenu(false)} />
                ) : (
                  <FaUser size="22" onClick={() => setUserMenu(true)} />
                )}
              </summary>
              <div
                className={`bg-[rgba(21,31,46,255)] absolute top-14 w-28 h-44 right-0 p-4 rounded-b menu shadowdropdown-content${
                  userMenu ? "block" : "hidden"
                }`}
              >
                <ul>
                  <li>
                    <Link to="/fav">Fav</Link>
                  </li>
                  <li onClick={handleClick}>logout</li>
                </ul>
              </div>
            </details>
          )} */}

          {openSearch ? (
            <RxCross2
              size="22"
              onClick={() => {
                setOpenSearch(false);
              }}
            />
          ) : (
            <FaSearch
              size="22"
              onClick={() => {
                setOpenSearch(true);
              }}
            />
          )}
        </div>
        <div
          className={`left-0 focus w-full absolute top-16 flex justify-center items-center pb-3 bg-[#152232] ${
            openSearch ? "" : "hidden"
          }`}
        >
          <input
            type="text"
            className="w-11/12 input-bordered relative mx-auto h-10 rounded border-white border bg-[rgb(83,83,84)] p-5"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            ref={searchRef}
          />
          <div className="absolute right-[2rem] md:right-[3rem] lg:right-[3.5rem] w-6 flex flex-row-reverse">
            <Link to={`/search?q=${search}`}>
              <FaSearch size="24" className="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
