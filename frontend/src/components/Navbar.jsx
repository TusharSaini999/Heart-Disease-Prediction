import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-[#F2F7FF] bg-opacity-80 p-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <Link to="/">
          <img
            className="h-[50px] rounded-full w-[50px] object-contain"
            src="https://th.bing.com/th/id/OIP.Y2dAxeNpJoEBfex-qXl3UAHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
            alt="Logo"
          />
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          <li>
            <Link className="text-primary-start hover:text-primary-start hover:opacity-100" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-para opacity-80 hover:text-primary-start hover:opacity-100" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="text-para opacity-80 hover:text-primary-start hover:opacity-100" to="/services">
              Service
            </Link>
          </li>
          <li>
            <Link className="text-para opacity-80 hover:text-primary-start hover:opacity-100" to="/contact">
              Contact
            </Link>
          </li>
        </ul>

        <Link to="/login" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-7 py-4 rounded-full text-lg font-semibold hover:-rotate-3 transition">
          Login
        </Link>

        {/* Mobile Screen */}
        <div className="relative md:hidden">
          {isOpen ? (
            <IoMdClose
              onClick={() => setIsOpen(false)}
              className="size-7 cursor-pointer text-primary-end"
            />
          ) : (
            <HiMiniBars3BottomRight
              onClick={() => setIsOpen(true)}
              className="size-7 cursor-pointer text-primary-end"
            />
          )}

          {isOpen && (
            <div className="absolute right-2 top-8 min-w-[220px] rounded-2xl border bg-white p-4 shadow-lg">
              <ul className="mb-8 flex flex-col items-center gap-6">
                <li>
                  <Link className="text-primary-start hover:text-primary-start hover:opacity-100" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-para opacity-80 hover:text-primary-start hover:opacity-100" to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="text-para opacity-80 hover:text-primary-start hover:opacity-100" to="/services">
                    Service
                  </Link>
                </li>
                <li>
                  <Link className="text-para opacity-80 hover:text-primary-start hover:opacity-100" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>

              <Link to="/login" className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-7 py-4 rounded-full text-lg font-semibold hover:-rotate-3 transition">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
