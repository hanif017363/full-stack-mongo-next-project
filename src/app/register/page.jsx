"use client";

import { useRouter } from "next/navigation"; // ✅ Correct import for app router
import { useState } from "react";
// ✅ Removed unnecessary `use`

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Fixed variable name

  const router = useRouter(); // ✅ Renamed from `route` to `router` for clarity

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErrorMessage(data.err || "Something went wrong, please try again.");
      } else {
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  return (
    <main>
      <section>
        <h1>Register</h1>

        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            {!loading && <button type="submit">Register</button>}
            {loading && <p>Creating New User...</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;
