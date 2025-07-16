"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErrorMessage(
          data.err || "Invalid email or password, please try again."
        );
      } else {
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <section className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col items-center">
            {!loading && (
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
            {loading && <p className="text-gray-600">Logging in...</p>}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
