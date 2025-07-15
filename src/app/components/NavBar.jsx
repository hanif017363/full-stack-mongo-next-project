"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data, status } = useSession();
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee", color: "black" }}>
      <Link href="/" style={{ marginRight: "1rem" }}>
        Home
      </Link>
      <Link href="/shop" style={{ marginRight: "1rem" }}>
        Shop
      </Link>

      {status !== "authenticated" && <Link href="/register">Register</Link>}
      {status === "authenticated" && <Link href="/dashboard">Dashboard</Link>}
      {status !== "authenticated" && <Link href="/login">Login</Link>}
      {status === "authenticated" && data?.user?.role === "admin" && (
        <Link href="/admin" style={{ marginLeft: "1rem" }}>
          Admin
        </Link>
      )}
    </nav>
  );
}
