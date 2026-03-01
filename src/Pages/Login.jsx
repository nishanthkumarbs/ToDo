import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
            const res = await axios.get("http://localhost:5000/users", {
                params: { email: loginData.email.trim() }
            });

            if (res.data.length === 0) {
                toast.error("User not found!");
                return;
            }

            if (res.data[0].password === loginData.password.trim()) {
                toast.success("Login Successful!");

                localStorage.setItem("user", JSON.stringify(res.data[0]));
                setUser(res.data[0]);   // 🔥 this updates App instantly
                navigate("/");


            } else {
                toast.error("Wrong Password!");
            }

        } catch (error) {
            console.error(error);
            toast.error("Login failed!");
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