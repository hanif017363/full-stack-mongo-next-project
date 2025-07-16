"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data, status } = useSession();

  return (
    <nav className="bg-gray-100 py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Navigation Links */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
          >
            Shop
          </Link>
        </div>

        {/* Right: Auth Links */}
        <div className="flex space-x-6">
          {status !== "authenticated" && (
            <Link
              href="/register"
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
            >
              Register
            </Link>
          )}
          {status === "authenticated" && (
            <Link
              href="/dashboard"
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
          )}
          {status !== "authenticated" && (
            <Link
              href="/login"
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
            >
              Login
            </Link>
          )}
          {status === "authenticated" && data?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
