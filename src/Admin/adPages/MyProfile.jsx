import React, { useState } from "react";
import { User, Mail, Phone, MapPin, ShieldCheck, CalendarDays, Edit, Save, Lock, Activity, Users, Dumbbell, CreditCard, CheckCircle } from "lucide-react";

const MyProfile = () => {
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@fitnesscenter.com",
        phone: "+91 98765 43210",
        role: "Administrator",
        location: "New Delhi, India",
        joined: "January 2025",
        bio: "Managing members, trainers, programs and daily fitness center operations."
    });

    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const handleSave = () => setEditing(false);

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">My Profile</h1>
                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Manage your admin account and personal information</p>
                    </div>
                    <button onClick={() => editing ? handleSave() : setEditing(true)} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition">
                        {editing ? <><Save size={17} /> Save Changes</> : <><Edit size={17} /> Edit Profile</>}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
                    <div className="space-y-5">
                        <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl overflow-hidden">
                            <div className="h-24 bg-[#3420FF]"></div>

                            <div className="px-5 pb-5">
                                <div className="-mt-12 flex justify-center">
                                    <div className="w-24 h-24 rounded-full bg-white dark:bg-[#1C2529] p-1.5 shadow-lg">
                                        <div className="w-full h-full rounded-full bg-[#3420FF] flex items-center justify-center text-white text-2xl font-bold">
                                            AU
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-3">
                                    <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">{profile.name}</h2>
                                    <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">{profile.role}</p>
                                    <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold">
                                        <CheckCircle size={13} /> Active Account
                                    </span>
                                </div>

                                <div className="border-t border-[#E7EAED] dark:border-[#303A3F] mt-5 pt-5 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="profile-icon"><Mail size={16} /></div>
                                        <div className="min-w-0">
                                            <p className="info-title">Email</p>
                                            <p className="info-value truncate">{profile.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="profile-icon"><Phone size={16} /></div>
                                        <div>
                                            <p className="info-title">Phone</p>
                                            <p className="info-value">{profile.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="profile-icon"><MapPin size={16} /></div>
                                        <div>
                                            <p className="info-title">Location</p>
                                            <p className="info-value">{profile.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="profile-icon"><CalendarDays size={16} /></div>
                                        <div>
                                            <p className="info-title">Joined</p>
                                            <p className="info-value">{profile.joined}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#FFF7E6] dark:bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                                    <ShieldCheck size={19} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Account Security</p>
                                    <p className="text-xs text-green-500 mt-1">Your account is secure</p>
                                </div>
                            </div>
                            <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5 transition">
                                <Lock size={15} /> Change Password
                            </button>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="stat-card">
                                <div className="stat-icon bg-[#F3F0FF] dark:bg-[#3420FF]/10 text-[#3420FF]"><Users size={18} /></div>
                                <p className="stat-label">Members</p>
                                <h3 className="stat-value">1,248</h3>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon bg-[#ECFDF3] dark:bg-green-500/10 text-green-500"><Dumbbell size={18} /></div>
                                <p className="stat-label">Trainers</p>
                                <h3 className="stat-value">18</h3>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon bg-[#EEF5FF] dark:bg-blue-500/10 text-blue-500"><Activity size={18} /></div>
                                <p className="stat-label">Programs</p>
                                <h3 className="stat-value">24</h3>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon bg-[#FFF7E6] dark:bg-yellow-500/10 text-yellow-500"><CreditCard size={18} /></div>
                                <p className="stat-label">Revenue</p>
                                <h3 className="stat-value">₹4.2L</h3>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 text-[#3420FF] flex items-center justify-center">
                                    <User size={18} />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Personal Information</h2>
                                    <p className="text-xs text-[#778387] mt-1">Update your account details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Full Name</label>
                                    <input name="name" value={profile.name} onChange={handleChange} disabled={!editing} className="form-input disabled:opacity-60" />
                                </div>

                                <div>
                                    <label className="form-label">Email Address</label>
                                    <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={!editing} className="form-input disabled:opacity-60" />
                                </div>

                                <div>
                                    <label className="form-label">Phone Number</label>
                                    <input name="phone" value={profile.phone} onChange={handleChange} disabled={!editing} className="form-input disabled:opacity-60" />
                                </div>

                                <div>
                                    <label className="form-label">Role</label>
                                    <input value={profile.role} disabled className="form-input opacity-60" />
                                </div>

                                <div>
                                    <label className="form-label">Location</label>
                                    <input name="location" value={profile.location} onChange={handleChange} disabled={!editing} className="form-input disabled:opacity-60" />
                                </div>

                                <div>
                                    <label className="form-label">Joined Date</label>
                                    <input value={profile.joined} disabled className="form-input opacity-60" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="form-label">About</label>
                                    <textarea name="bio" value={profile.bio} onChange={handleChange} disabled={!editing} rows="3" className="form-input resize-none disabled:opacity-60" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Recent Account Activity</h2>
                                    <p className="text-xs text-[#778387] mt-1">Latest actions performed from your account</p>
                                </div>
                                <Activity size={18} className="text-[#3420FF]" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center"><CheckCircle size={15} /></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">Profile information updated</p>
                                        <p className="text-xs text-[#778387] mt-0.5">Today, 10:42 AM</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#3420FF]/10 text-[#3420FF] flex items-center justify-center"><Lock size={15} /></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">Successful login</p>
                                        <p className="text-xs text-[#778387] mt-0.5">Today, 09:15 AM</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center"><Users size={15} /></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">Member records viewed</p>
                                        <p className="text-xs text-[#778387] mt-0.5">Yesterday, 04:30 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .profile-icon{width:34px;height:34px;border-radius:9px;background:#F3F0FF;color:#3420FF;display:flex;align-items:center;justify-content:center;flex-shrink:0}
                .dark .profile-icon{background:rgba(52,32,255,.1)}
                .info-title{font-size:.7rem;color:#778387}
                .info-value{font-size:.82rem;color:#1F272B;margin-top:2px}
                .dark .info-value{color:#F4F6F7}
                .stat-card{background:#fff;border:1px solid #E2E6E8;border-radius:.75rem;padding:1rem}
                .dark .stat-card{background:#1C2529;border-color:#303A3F}
                .stat-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;margin-bottom:.7rem}
                .stat-label{font-size:.72rem;color:#778387}
                .stat-value{font-size:1.25rem;font-weight:700;color:#1F272B;margin-top:.2rem}
                .dark .stat-value{color:#F4F6F7}
                .form-label{display:block;font-size:.8rem;font-weight:500;color:#1F272B;margin-bottom:.45rem}
                .dark .form-label{color:#F4F6F7}
                .form-input{width:100%;padding:.65rem .8rem;border:1px solid #E2E6E8;border-radius:.5rem;background:#F8F9FB;color:#1F272B;font-size:.85rem;outline:none;transition:.2s}
                .form-input:focus{border-color:#3420FF;background:#fff}
                .dark .form-input{background:#12181B;border-color:#303A3F;color:#F4F6F7}
                .dark .form-input:focus{border-color:#3420FF}
            `}</style>
        </div>
    );
};

export default MyProfile;