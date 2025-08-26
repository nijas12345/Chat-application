import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email.trim()) {
      toast.error("Email is required");
    }
    if (!password.trim()) {
      toast.error("Password is required");
    }
    try {
      const res = await login(formData);
      console.log("res", res);

      dispatch(loginSuccess(res));

      navigate("/");
    } catch (error) {
      console.log(error.message);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-orange-200 grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center  p-6">
        <img
          src="/3d-render-robot-with-padlock.jpg"
          alt="Login Illustration"
          className="w-80 h-80 md:w-92 md:h-96 object-cover rounded-full shadow-xl"
        />
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-orange-700 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
