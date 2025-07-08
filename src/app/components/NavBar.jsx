// app/components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee", color: "black" }}>
      <Link href="/" style={{ marginRight: "1rem" }}>
        Home
      </Link>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
