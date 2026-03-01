import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/api";

const Login = ({ setUser }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginUser(
                loginData.email.trim(),
                loginData.password.trim()
            );

            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login Successful!");
            setUser(user);
            navigate("/");

        } catch (error) {
            if (error.message === "USER_NOT_FOUND") {
                toast.error("User not found!");
            } else if (error.message === "INVALID_PASSWORD") {
                toast.error("Wrong password!");
            } else {
                toast.error("Login failed!");
            }
        }
    };

    return (

        <>
            <div className="auth-container">
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />

                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit">Login</button>
                </form>
                <p className="auth-switch">
                    Don’t have an account?{" "}
                    <span onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
};

export default Login;