import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMessage(res.data.message);

                const usersRes = await API.get("/users");
                setUsers(usersRes.data);

                const teachersRes = await API.get("/teachers");
                setTeachers(teachersRes.data);
            } catch (err) {
                setMessage("Unauthorized");
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
                <div className="absolute left-[-5rem] top-[-4rem] h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute right-[-6rem] top-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_35%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))]" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
                    <div className="border-b border-white/10 px-6 py-8 sm:px-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
                                    Dashboard
                                </p>
                                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                                    Welcome back
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                                    {message}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    onClick={() => navigate("/users")}
                                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400/20"
                                >
                                    View Users
                                </button>

                                <button
                                    onClick={() => navigate("/teachers")}
                                    className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400/20"
                                >
                                    View Teachers
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-8 sm:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
                                <p className="text-sm font-medium text-slate-400">
                                    Total Users
                                </p>
                                <p className="mt-4 text-4xl font-black text-white">
                                    {users.length}
                                </p>
                                <p className="mt-2 text-sm text-slate-400">
                                    Registered accounts in the system
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
                                <p className="text-sm font-medium text-slate-400">
                                    Teachers
                                </p>
                                <p className="mt-4 text-4xl font-black text-white">
                                    {teachers.length}
                                </p>
                                <p className="mt-2 text-sm text-slate-400">
                                    Teacher records currently available
                                </p>
                            </div>

                            <div className="rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/15 to-cyan-400/10 p-5 shadow-lg shadow-emerald-950/20">
                                <p className="text-sm font-medium text-slate-300">
                                    Status
                                </p>
                                <p className="mt-4 text-2xl font-bold text-emerald-300">
                                    Active
                                </p>
                                <p className="mt-2 text-sm text-slate-300/80">
                                    Authentication and data access are live
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70 shadow-lg shadow-slate-950/30">
                            <div className="flex flex-col gap-2 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Recent Users
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        Preview of the latest user records
                                    </p>
                                </div>
                                <span className="inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                                    Live Data
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[520px] text-left">
                                    <thead className="bg-white/5 text-sm uppercase tracking-[0.2em] text-slate-400">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Email</th>
                                            <th className="px-6 py-4 font-medium">Name</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.slice(0, 5).map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-t border-white/10 text-sm text-slate-200 transition duration-200 hover:bg-white/5"
                                            >
                                                <td className="px-6 py-4">{user.email}</td>
                                                <td className="px-6 py-4">
                                                    {user.first_name} {user.last_name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleLogout}
                                className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm font-semibold text-rose-200 transition duration-300 hover:-translate-y-0.5 hover:bg-rose-400/20"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
