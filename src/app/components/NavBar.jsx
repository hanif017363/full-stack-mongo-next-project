"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const NavBar = () => {
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Title with Link to Home */}
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-800 cursor-pointer">
            MyShop
          </h1>
        </Link>

        <div className="flex">
          {status === "authenticated" && (
            <div className="block md:hidden text-red-600 font-bold ">
              {data.user.name || data.user.email}
            </div>
          )}

          {/* Hamburger / Close button on mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none text-gray-700 ml-4"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // Close icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>

          <nav className="hidden md:flex md:items-center md:gap-6">
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  Shop
                </Link>
              </li>
              {status !== "authenticated" && (
                <li>
                  <Link
                    href="/register"
                    className="text-gray-700 hover:text-blue-600 font-semibold"
                  >
                    Sign Up
                  </Link>
                </li>
              )}
              {status === "authenticated" &&
                (data?.user?.role === "admin" ||
                  data?.user?.role === "super-admin") && (
                  <li>
                    <Link
                      href="/dashboard/admin/add-product"
                      className="text-gray-700 hover:text-blue-600 font-semibold"
                    >
                      Add Product
                    </Link>
                  </li>
                )}
              <li>
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/ai"
                  className="block text-gray-700 hover:text-blue-600 font-semibold"
                >
                  Ai
                </Link>
              </li>

              {/* Logout button */}
              {status === "authenticated" && (
                <li>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </li>
              )}

              {/* Username displayed AFTER logout button on desktop */}
              {status === "authenticated" && (
                <li className="text-red-600 font-bold">
                  {data.user.name || data.user.email}
                </li>
              )}

              {status !== "authenticated" && (
                <li>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 font-semibold"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu (visible when open) */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="block text-gray-700 hover:text-blue-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
            </li>
            {status !== "authenticated" && (
              <li>
                <Link
                  href="/register"
                  className="block text-gray-700 hover:text-blue-600 font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            )}
            {status === "authenticated" &&
              (data?.user?.role === "admin" ||
                data?.user?.role === "super-admin") && (
                <li>
                  <Link
                    href="/dashboard/admin/add-product"
                    className="block text-gray-700 hover:text-blue-600 font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Add Product
                  </Link>
                </li>
              )}
            <li>
              <Link
                href="/cart"
                className="block text-gray-700 hover:text-blue-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/ai"
                className="block text-gray-700 hover:text-blue-600 font-semibold"
              >
                Ai
              </Link>
            </li>

            {/* Logout button */}
            {status === "authenticated" && (
              <li>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </li>
            )}

            {status !== "authenticated" && (
              <li>
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-blue-600 font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
