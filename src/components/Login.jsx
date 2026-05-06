import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const getAuthToken = (data) => {
  if (typeof data === "string") return data;

  return (
    data?.token ||
    data?.accessToken ||
    data?.jwtToken ||
    data?.data?.token ||
    data?.data?.accessToken ||
    data?.data?.jwtToken
  );
};

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Sending payload:", formData); // Debug

      const res = await api.post("/Auth/login", formData);
      console.log("Response:", res.data); // Debug

      const token = getAuthToken(res.data);
      if (!token) {
        throw new Error("Token tidak ditemukan pada respons API.");
      }

      localStorage.setItem("token", token);
      onLogin?.(token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response || err); // Debug detail

      const message =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.response?.data ||
        err.message ||
        "Kredensial tidak valid. Silakan coba lagi.";

      setError(typeof message === "string" ? message : JSON.stringify(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#161616] border border-gray-800 p-8 rounded-sm shadow-2xl">
        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
          Login <span className="text-orange-500">Otopart</span>
        </h2>

        {error && (
          <div className="text-red-500 text-xs mb-4 bg-red-500/10 p-3 border border-red-500/50 rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5 font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@mail.com"
              className="w-full bg-[#0f0f0f] border border-gray-800 text-white p-4 rounded-sm outline-none focus:border-orange-500 transition-all"
              value={formData.email}
              required
              autoComplete="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5 font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#0f0f0f] border border-gray-800 text-white p-4 rounded-sm outline-none focus:border-orange-500 transition-all"
              value={formData.password}
              required
              autoComplete="current-password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-bold py-4 uppercase tracking-[0.2em] hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 transition-all mt-2"
          >
            {loading ? "Memproses..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}