import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useauth } from "../hook/useauth";
import { useSelector } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth.user);
  const loding = useSelector((state) => state.auth.Loading);

  const { registeruser } = useauth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { username, email, password };
    await registeruser(payload);
    navigate("/login");
  };

  if (!loding && user) {
    navigate("/");
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-orange-500/20 bg-slate-950/95 p-10 shadow-[0_25px_80px_-35px_rgba(252,165,165,0.3)] backdrop-blur-sm">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-400/90">
            Create account
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Register new user
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Simple form with black and red/orange accents.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="group block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Username
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              placeholder="Your username"
            />
          </label>

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
              placeholder="Create a password"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-orange-600 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
