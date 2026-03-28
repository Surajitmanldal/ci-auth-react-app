import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register({ initialMode = "register" }) {
    const navigate = useNavigate();
    const [isLoginView, setIsLoginView] = useState(initialMode === "login");
    const [registerForm, setRegisterForm] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        university_name: "",
        gender: "",
        year_joined: "",
    });
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const handleRegisterChange = (field) => (e) => {
        setRegisterForm({ ...registerForm, [field]: e.target.value });
    };

    const handleLoginChange = (field) => (e) => {
        setLoginForm({ ...loginForm, [field]: e.target.value });
    };

    const handleRegisterSubmit = async () => {
        try {
            await API.post("/register", registerForm);
            alert("Registered Successfully");
            setIsLoginView(true);
        } catch (err) {
            alert("Error");
        }
    };

    const handleLoginSubmit = async () => {
        try {
            const res = await API.post("/login", loginForm);
            localStorage.setItem("token", res.data.token);
            alert("Login Successful");
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    const inputClassName =
        "w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30";

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-slate-100">
            <div className="absolute inset-0">
                <div className="absolute left-[-8rem] top-[-5rem] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))]" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
                <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="hidden bg-gradient-to-br from-cyan-400 via-sky-500 to-emerald-400 p-10 text-slate-950 lg:flex lg:flex-col lg:justify-between">

                            <div>
                                <p className="inline-flex rounded-full bg-slate-950/10 px-4 py-1 text-sm font-semibold tracking-wide">
                                    Auth System Project
                                </p>

                                <h1 className="mt-6 text-4xl font-black leading-tight">
                                    Secure authentication with seamless user management.
                                </h1>

                                <p className="mt-4 max-w-md text-sm leading-6 text-slate-900/80">
                                    Register and login users with JWT-based authentication while managing
                                    structured data across multiple tables in a clean and modern interface.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-950/10 bg-white/30 p-6 backdrop-blur-sm">
                                <p className="text-sm font-medium text-slate-900/75">
                                    Built with modern technologies
                                </p>

                                <p className="mt-2 text-2xl font-bold">
                                    Full-stack system using React, CodeIgniter, and MySQL with secure API integration.
                                </p>
                            </div>

                        </div>

                        <div className="animate-fadeIn overflow-hidden px-0 py-8 sm:py-10">
                            <div className="mx-auto mb-6 flex w-fit rounded-full border border-white/10 bg-slate-900/60 p-1">
                                <button
                                    type="button"
                                    onClick={() => setIsLoginView(false)}
                                    className={`rounded-full px-5 py-2 text-sm font-semibold transition duration-300 ${!isLoginView
                                            ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950"
                                            : "text-slate-300 hover:text-white"
                                        }`}
                                >
                                    Register
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsLoginView(true)}
                                    className={`rounded-full px-5 py-2 text-sm font-semibold transition duration-300 ${isLoginView
                                            ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950"
                                            : "text-slate-300 hover:text-white"
                                        }`}
                                >
                                    Login
                                </button>
                            </div>

                            <div className="overflow-hidden">
                                <div
                                    className={`flex w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoginView ? "translate-x-0" : "-translate-x-1/2"
                                        }`}
                                >
                                    <section className="w-1/2 shrink-0 px-6 sm:px-10">
                                        <div className="mx-auto max-w-md">
                                            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
                                                Login
                                            </p>
                                            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                                                Welcome back
                                            </h2>
                                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                                Sign in to continue to your dashboard and access
                                                your student profile.
                                            </p>

                                            <div className="mt-8 space-y-4">
                                                <label className="block">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        Email Address
                                                    </span>
                                                    <input
                                                        className={inputClassName}
                                                        placeholder="you@example.com"
                                                        value={loginForm.email}
                                                        onChange={handleLoginChange("email")}
                                                    />
                                                </label>

                                                <label className="block">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        Password
                                                    </span>
                                                    <input
                                                        type="password"
                                                        className={inputClassName}
                                                        placeholder="Enter your password"
                                                        value={loginForm.password}
                                                        onChange={handleLoginChange("password")}
                                                    />
                                                </label>
                                            </div>

                                            <button
                                                onClick={handleLoginSubmit}
                                                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-cyan-400/30"
                                            >
                                                Login
                                            </button>

                                            <p className="mt-5 text-center text-sm text-slate-300">
                                                New here?{" "}
                                                <button
                                                    type="button"
                                                    onClick={() => setIsLoginView(false)}
                                                    className="font-semibold text-cyan-300 transition duration-200 hover:text-cyan-200 hover:underline"
                                                >
                                                    Create an account
                                                </button>
                                            </p>
                                        </div>
                                    </section>

                                    <section className="w-1/2 shrink-0 px-6 sm:px-10">
                                        <div className="mx-auto max-w-xl">
                                            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
                                                Register
                                            </p>
                                            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                                                Create your account
                                            </h2>
                                            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
                                                Fill in your details below to get started with a
                                                cleaner and more polished signup experience.
                                            </p>

                                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                                <label className="block">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        First Name
                                                    </span>
                                                    <input
                                                        className={inputClassName}
                                                        placeholder="Enter first name"
                                                        value={registerForm.first_name}
                                                        onChange={handleRegisterChange("first_name")}
                                                    />
                                                </label>

                                                <label className="block">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        Last Name
                                                    </span>
                                                    <input
                                                        className={inputClassName}
                                                        placeholder="Enter last name"
                                                        value={registerForm.last_name}
                                                        onChange={handleRegisterChange("last_name")}
                                                    />
                                                </label>

                                                <label className="block sm:col-span-2">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        Email Address
                                                    </span>
                                                    <input
                                                        className={inputClassName}
                                                        placeholder="you@example.com"
                                                        value={registerForm.email}
                                                        onChange={handleRegisterChange("email")}
                                                    />
                                                </label>

                                                <label className="block sm:col-span-2">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        Password
                                                    </span>
                                                    <input
                                                        type="password"
                                                        className={inputClassName}
                                                        placeholder="Create a secure password"
                                                        value={registerForm.password}
                                                        onChange={handleRegisterChange("password")}
                                                    />
                                                </label>

                                                <label className="block sm:col-span-2">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        University
                                                    </span>
                                                    <input
                                                        className={inputClassName}
                                                        placeholder="Enter university name"
                                                        value={registerForm.university_name}
                                                        onChange={handleRegisterChange("university_name")}
                                                    />
                                                </label>

                                                <label className="block">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        Gender
                                                    </span>
                                                    <input
                                                        className={inputClassName}
                                                        placeholder="Enter gender"
                                                        value={registerForm.gender}
                                                        onChange={handleRegisterChange("gender")}
                                                    />
                                                </label>

                                                <label className="block">
                                                    <span className="mb-2 block text-sm font-medium text-slate-200">
                                                        Year Joined
                                                    </span>
                                                    <input
                                                        className={inputClassName}
                                                        placeholder="2024"
                                                        value={registerForm.year_joined}
                                                        onChange={handleRegisterChange("year_joined")}
                                                    />
                                                </label>
                                            </div>

                                            <button
                                                onClick={handleRegisterSubmit}
                                                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-cyan-400/30"
                                            >
                                                Create Account
                                            </button>

                                            <p className="mt-5 text-center text-sm text-slate-300">
                                                Already have an account?{" "}
                                                <button
                                                    type="button"
                                                    onClick={() => setIsLoginView(true)}
                                                    className="font-semibold text-cyan-300 transition duration-200 hover:text-cyan-200 hover:underline"
                                                >
                                                    Login
                                                </button>
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
