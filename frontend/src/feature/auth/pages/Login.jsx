import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useauth } from "../hook/useauth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth.user);
  const loding = useSelector((state) => state.auth.Loading);

  const navigate = useNavigate();
  const { loginuser } = useauth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { email, password };
    await loginuser(payload);
    navigate("/");
  };

  if (!loding && user) {
    return navigate("/");
  }

  return (
    <main className="min-h-screen bg-[#030303] text-white flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-orange-500/20 bg-slate-950/95 p-10 shadow-[0_25px_80px_-35px_rgba(249,115,22,0.8)] backdrop-blur-sm">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-400/90">
            Welcome back
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Login to your account
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Minimal dark form with black and orange accents.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="group block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              placeholder="you@example.com"
            />
          </label>

          <label className="group block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
