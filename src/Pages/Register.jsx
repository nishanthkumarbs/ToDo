import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerUser({
                name: registerData.name.trim(),
                email: registerData.email.trim(),
                password: registerData.password.trim()
            });

            toast.success("Registration successful!");
            navigate("/login");

        } catch (error) {
            if (error.message === "EMAIL_EXISTS") {
                toast.error("Email already registered!");
            } else {
                toast.error("Registration failed!");
            }
        }
    };

    const isRegisterValid =
        passwordChecks.length &&
        passwordChecks.uppercase &&
        passwordChecks.number &&
        passwordChecks.special &&
        registerData.password === registerData.confirmPassword;

    return (
        <>
            <div className="auth-container">
                <h2>Register</h2>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={registerData.name}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                name: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={registerData.email}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                email: e.target.value
                            })
                        }
                        required
                    />

                    {/* Password */}
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={registerData.password}
                            onChange={(e) => {
                                const value = e.target.value;

                                setRegisterData({
                                    ...registerData,
                                    password: value
                                });

                                setPasswordChecks({
                                    length: value.length >= 6,
                                    uppercase: /[A-Z]/.test(value),
                                    number: /[0-9]/.test(value),
                                    special: /[^A-Za-z0-9]/.test(value)
                                });
                            }}
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {registerData.password && (
                        <div className="password-checklist">
                            <p className={passwordChecks.length ? "valid" : "invalid"}>
                                {passwordChecks.length ? "✔" : "✖"} At least 6 characters
                            </p>
                            <p className={passwordChecks.uppercase ? "valid" : "invalid"}>
                                {passwordChecks.uppercase ? "✔" : "✖"} One uppercase letter
                            </p>
                            <p className={passwordChecks.number ? "valid" : "invalid"}>
                                {passwordChecks.number ? "✔" : "✖"} One number
                            </p>
                            <p className={passwordChecks.special ? "valid" : "invalid"}>
                                {passwordChecks.special ? "✔" : "✖"} One special character
                            </p>
                        </div>
                    )}

                    {/* Confirm Password */}
                    <div className="password-wrapper">
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={registerData.confirmPassword}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    confirmPassword: e.target.value
                                })
                            }
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {registerData.confirmPassword && (
                        <div
                            className={`password-match ${registerData.password === registerData.confirmPassword
                                ? "match"
                                : "no-match"
                                }`}
                        >
                            {registerData.password === registerData.confirmPassword
                                ? "✔ Passwords match"
                                : "✖ Passwords do not match"}
                        </div>
                    )}

                    <button type="submit" disabled={!isRegisterValid}>
                        Register
                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
};

export default Register;