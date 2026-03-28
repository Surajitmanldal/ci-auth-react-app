import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await API.get("/teachers");
                setTeachers(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
                <div className="absolute left-[-4rem] top-[-3rem] h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
                <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_35%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))]" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
                    <div className="border-b border-white/10 px-6 py-8 sm:px-8">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="mb-6 inline-flex items-center rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                        >
                            Back to Dashboard
                        </button>

                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">
                            Directory
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                            Teachers
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                            Browse the teacher records in a cleaner, more readable table
                            layout with modern styling and improved spacing.
                        </p>
                    </div>

                    <div className="px-6 py-8 sm:px-8">
                        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
                                <p className="text-sm font-medium text-slate-400">
                                    Total Teachers
                                </p>
                                <p className="mt-4 text-4xl font-black text-white">
                                    {teachers.length}
                                </p>
                            </div>

                            <div className="rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/15 to-cyan-400/10 p-5 shadow-lg shadow-emerald-950/20">
                                <p className="text-sm font-medium text-slate-300">
                                    Data Source
                                </p>
                                <p className="mt-4 text-2xl font-bold text-emerald-300">
                                    Live API
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
                                <p className="text-sm font-medium text-slate-400">
                                    Coverage
                                </p>
                                <p className="mt-4 text-2xl font-bold text-white">
                                    University Records
                                </p>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70 shadow-lg shadow-slate-950/30">
                            <div className="flex flex-col gap-2 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Teacher List
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        Detailed records for all available teachers
                                    </p>
                                </div>
                                <span className="inline-flex w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                                    {teachers.length} entries
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] text-left">
                                    <thead className="bg-white/5 text-sm uppercase tracking-[0.2em] text-slate-400">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">ID</th>
                                            <th className="px-6 py-4 font-medium">User ID</th>
                                            <th className="px-6 py-4 font-medium">University</th>
                                            <th className="px-6 py-4 font-medium">Gender</th>
                                            <th className="px-6 py-4 font-medium">Year Joined</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {teachers.map((t) => (
                                            <tr
                                                key={t.id}
                                                className="border-t border-white/10 text-sm text-slate-200 transition duration-200 hover:bg-white/5"
                                            >
                                                <td className="px-6 py-4">{t.id}</td>
                                                <td className="px-6 py-4">{t.user_id}</td>
                                                <td className="px-6 py-4">{t.university_name}</td>
                                                <td className="px-6 py-4">{t.gender}</td>
                                                <td className="px-6 py-4">{t.year_joined}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teachers;
