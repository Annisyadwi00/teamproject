import React, { useState, ChangeEvent, FormEvent } from "react";
import backgroundImage from "../assets/image/login-bg.jpg";
import "boxicons/css/boxicons.min.css";
import logoSevigo from "../assets/image/logo-SeviGO.png";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; // Import API
import ErrorMessage from "../components/elements/forms/ErrorMessage"; // Import ErrorMessage
import { useAuth } from "../middlewares/AuthContext";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]); //handle error dari backend
  const [loading, setLoading] = useState<boolean>(false); // State untuk loading
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    login();
    e.preventDefault();
    setError(null); // Reset error sebelum pengiriman

    // Validasi input
    if (!formData.email || !formData.password) {
      setError("Email dan Password harus diisi.");
      return;
    }
    setLoading(true); // Set loading true saat mengirimkan form
    try {
      // const response = await api.post("/users/login", formData);
      // localStorage.setItem("token", response.data.data.token);
      if (
        formData.email === "admin@example.com" &&
        formData.password === "123"
      ) {
        navigate("/admin-panel"); // Arahkan ke halaman admin
      } else {
        navigate("/dashboard"); // Arahkan ke dashboard untuk user biasa
      }
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
      const errorMessages = Array.isArray(err.response.data.errors)
        ? err.response.data.errors
        : [err.response.data.message || "Login failed"];
      setErrors(errorMessages);
    } finally {
      setLoading(false); // Reset loading setelah pengiriman selesai
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="flex flex-col items-center z-10">
        <div className="flex flex-row items-center mb-6">
          <img
            src={logoSevigo}
            alt="Sevigo Logo"
            className="mb-2"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <h1
            className="mb-2 ml-4 text-2xl font-bold"
            style={{ color: "white", fontSize: "50px" }}
          >
            SeviGo
          </h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
          </h2>
          {errors.length > 0 && <ErrorMessage messages={errors} />}{" "}
          {/* Menampilkan pesan error */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              name="email"
              type="email"
              value={formData.email}
              placeholder="Email"
              icon="bx-envelope"
              onChange={handleChange}
            />
            <InputField
              name="password"
              type="password"
              value={formData.password}
              placeholder="Password"
              icon="bx-lock-alt"
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={loading} // Disable tombol saat loading
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-orange-500"
              } text-white py-3 rounded-lg hover:bg-orange-600 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2`}
            >
              {loading ? "Loading..." : "LOGIN"}
              <i className="bx bx-right-arrow-alt text-xl" />
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300 inline-flex items-center gap-1"
              aria-label="Sign up"
            >
              Register here
              <i className="bx bx-user-plus text-lg" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
