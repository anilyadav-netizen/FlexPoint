
import React, { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    CalendarDays,
    Edit,
    Save,
    Lock,
    Activity,
    Users,
    Dumbbell,
    CreditCard,
    CheckCircle,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/Slicer/authSlice";

const MyProfile = () => {
    const dispatch = useDispatch();

    // =========================================================
    // GET AUTH DATA FROM REDUX
    // =========================================================
    const { user, checkingAuth, error } = useSelector(
        (state) => state.auth
    );

    const [editing, setEditing] = useState(false);

    // =========================================================
    // LOCAL OPTIONAL PROFILE FIELDS
    // These fields are NOT currently present in your User model.
    // So they are kept locally until backend support is added.
    // =========================================================
    const [extraProfile, setExtraProfile] = useState({
        phone: "",
        location: "",
        bio: "",
    });

    // =========================================================
    // GET CURRENT LOGGED-IN USER
    // =========================================================
    useEffect(() => {
        // If user is already available in Redux,
        // don't make another API call.
        if (!user && !checkingAuth) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, user, checkingAuth]);

    // =========================================================
    // HANDLE EXTRA PROFILE FIELDS
    // =========================================================
    const handleChange = (e) => {
        setExtraProfile({
            ...extraProfile,
            [e.target.name]: e.target.value,
        });
    };

    // =========================================================
    // SAVE
    // =========================================================
    const handleSave = () => {
        /*
         * IMPORTANT:
         * Your current backend does NOT have an update-profile API.
         *
         * Therefore:
         * - name/email/role cannot be updated from this page yet.
         * - phone/location/bio are only local frontend values.
         *
         * Once we create PUT /auth/profile,
         * this function can dispatch an updateProfile thunk.
         */

        setEditing(false);
    };

    // =========================================================
    // LOADING
    // =========================================================
    if (checkingAuth) {
        return (
            <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-10 h-10 border-4 border-[#3420FF]/20 border-t-[#3420FF] rounded-full animate-spin mx-auto"></div>

                        <p className="mt-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Loading admin profile...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // =========================================================
    // ERROR / USER NOT FOUND
    // =========================================================
    if (!user) {
        return (
            <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl p-8 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                        <ShieldCheck size={25} />
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                        Unable to load profile
                    </h2>

                    <p className="mt-2 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                        {error || "Admin profile could not be loaded."}
                    </p>

                    <button
                        onClick={() => dispatch(getCurrentUser())}
                        className="mt-5 px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // =========================================================
    // REAL USER DATA
    // =========================================================
    const adminName = user?.name || "Admin User";
    const adminEmail = user?.email || "No email available";
    const adminRole = user?.role || "admin";

    const isActive = user?.isActive !== false;

    // =========================================================
    // ADMIN INITIALS
    // =========================================================
    const getInitials = (name) => {
        if (!name) return "AU";

        const words = name.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    };

    const adminInitials = getInitials(adminName);

    // =========================================================
    // JOINED DATE
    // =========================================================
    const formatJoinedDate = (date) => {
        if (!date) return "Not available";

        const formattedDate = new Date(date);

        if (Number.isNaN(formattedDate.getTime())) {
            return "Not available";
        }

        return formattedDate.toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
        });
    };

    const joinedDate = formatJoinedDate(user?.createdAt);

    // =========================================================
    // DISPLAY ROLE
    // =========================================================
    const formattedRole =
        adminRole.charAt(0).toUpperCase() +
        adminRole.slice(1);

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div>
                {/* =====================================================
                    HEADER
                ===================================================== */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                            My Profile
                        </h1>

                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                            Manage your admin account and personal information
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            editing
                                ? handleSave()
                                : setEditing(true)
                        }
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition"
                    >
                        {editing ? (
                            <>
                                <Save size={17} />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <Edit size={17} />
                                Edit Profile
                            </>
                        )}
                    </button>
                </div>

                {/* =====================================================
                    MAIN GRID
                ===================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">

                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}
                    <div className="space-y-5">

                        {/* =================================================
                            PROFILE CARD
                        ================================================= */}
                        <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl overflow-hidden">

                            <div className="h-24 bg-[#3420FF]"></div>

                            <div className="px-5 pb-5">

                                {/* AVATAR */}
                                <div className="-mt-12 flex justify-center">
                                    <div className="w-24 h-24 rounded-full bg-white dark:bg-[#1C2529] p-1.5 shadow-lg">
                                        <div className="w-full h-full rounded-full bg-[#3420FF] flex items-center justify-center text-white text-2xl font-bold">
                                            {adminInitials}
                                        </div>
                                    </div>
                                </div>

                                {/* ADMIN BASIC INFO */}
                                <div className="text-center mt-3">

                                    <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                        {adminName}
                                    </h2>

                                    <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                                        {formattedRole}
                                    </p>

                                    <span
                                        className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                                            isActive
                                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                                        }`}
                                    >
                                        <CheckCircle size={13} />

                                        {isActive
                                            ? "Active Account"
                                            : "Inactive Account"}
                                    </span>
                                </div>

                                {/* CONTACT INFORMATION */}
                                <div className="border-t border-[#E7EAED] dark:border-[#303A3F] mt-5 pt-5 space-y-4">

                                    {/* EMAIL */}
                                    <div className="flex items-center gap-3">
                                        <div className="profile-icon">
                                            <Mail size={16} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="info-title">
                                                Email
                                            </p>

                                            <p className="info-value truncate">
                                                {adminEmail}
                                            </p>
                                        </div>
                                    </div>

                                    {/* PHONE */}
                                    <div className="flex items-center gap-3">
                                        <div className="profile-icon">
                                            <Phone size={16} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="info-title">
                                                Phone
                                            </p>

                                            <p className="info-value">
                                                {extraProfile.phone ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* LOCATION */}
                                    <div className="flex items-center gap-3">
                                        <div className="profile-icon">
                                            <MapPin size={16} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="info-title">
                                                Location
                                            </p>

                                            <p className="info-value">
                                                {extraProfile.location ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* JOINED */}
                                    <div className="flex items-center gap-3">
                                        <div className="profile-icon">
                                            <CalendarDays size={16} />
                                        </div>

                                        <div>
                                            <p className="info-title">
                                                Joined
                                            </p>

                                            <p className="info-value">
                                                {joinedDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            ACCOUNT SECURITY
                        ================================================= */}
                        <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl p-5">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-xl bg-[#FFF7E6] dark:bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                                    <ShieldCheck size={19} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                        Account Security
                                    </p>

                                    <p className="text-xs text-green-500 mt-1">
                                        Your account is secure
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5 transition"
                            >
                                <Lock size={15} />
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* =================================================
                        RIGHT COLUMN
                    ================================================= */}
                    <div className="space-y-5">

                        {/* =================================================
                            STATS
                        ================================================= */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            <div className="stat-card">
                                <div className="stat-icon bg-[#F3F0FF] dark:bg-[#3420FF]/10 text-[#3420FF]">
                                    <Users size={18} />
                                </div>

                                <p className="stat-label">
                                    Members
                                </p>

                                <h3 className="stat-value">
                                    1,248
                                </h3>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon bg-[#ECFDF3] dark:bg-green-500/10 text-green-500">
                                    <Dumbbell size={18} />
                                </div>

                                <p className="stat-label">
                                    Trainers
                                </p>

                                <h3 className="stat-value">
                                    18
                                </h3>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon bg-[#EEF5FF] dark:bg-blue-500/10 text-blue-500">
                                    <Activity size={18} />
                                </div>

                                <p className="stat-label">
                                    Programs
                                </p>

                                <h3 className="stat-value">
                                    24
                                </h3>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon bg-[#FFF7E6] dark:bg-yellow-500/10 text-yellow-500">
                                    <CreditCard size={18} />
                                </div>

                                <p className="stat-label">
                                    Revenue
                                </p>

                                <h3 className="stat-value">
                                    ₹4.2L
                                </h3>
                            </div>
                        </div>

                        {/* =================================================
                            PERSONAL INFORMATION
                        ================================================= */}
                        <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl p-5">

                            <div className="flex items-center gap-3 mb-5">

                                <div className="w-9 h-9 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 text-[#3420FF] flex items-center justify-center">
                                    <User size={18} />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                        Personal Information
                                    </h2>

                                    <p className="text-xs text-[#778387] mt-1">
                                        Update your account details
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* FULL NAME */}
                                <div>
                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        value={adminName}
                                        disabled
                                        className="form-input opacity-60"
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={adminEmail}
                                        disabled
                                        className="form-input opacity-60"
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        name="phone"
                                        value={extraProfile.phone}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        placeholder="Enter phone number"
                                        className="form-input disabled:opacity-60"
                                    />
                                </div>

                                {/* ROLE */}
                                <div>
                                    <label className="form-label">
                                        Role
                                    </label>

                                    <input
                                        value={formattedRole}
                                        disabled
                                        className="form-input opacity-60"
                                    />
                                </div>

                                {/* LOCATION */}
                                <div>
                                    <label className="form-label">
                                        Location
                                    </label>

                                    <input
                                        name="location"
                                        value={extraProfile.location}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        placeholder="Enter location"
                                        className="form-input disabled:opacity-60"
                                    />
                                </div>

                                {/* JOINED DATE */}
                                <div>
                                    <label className="form-label">
                                        Joined Date
                                    </label>

                                    <input
                                        value={joinedDate}
                                        disabled
                                        className="form-input opacity-60"
                                    />
                                </div>

                                {/* BIO */}
                                <div className="md:col-span-2">
                                    <label className="form-label">
                                        About
                                    </label>

                                    <textarea
                                        name="bio"
                                        value={extraProfile.bio}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        placeholder="Write something about your role..."
                                        rows="3"
                                        className="form-input resize-none disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            {/* BACKEND NOTE */}
                            {editing && (
                                <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                    <p className="text-xs text-[#606E6E] dark:text-[#AEB7BA]">
                                        Name, email and role are managed by your
                                        authentication system. Phone, location
                                        and bio will require backend profile
                                        fields and an update API to persist them.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* =================================================
                            RECENT ACCOUNT ACTIVITY
                        ================================================= */}
                        <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl p-5">

                            <div className="flex items-center justify-between mb-4">

                                <div>
                                    <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                        Recent Account Activity
                                    </h2>

                                    <p className="text-xs text-[#778387] mt-1">
                                        Latest actions performed from your account
                                    </p>
                                </div>

                                <Activity
                                    size={18}
                                    className="text-[#3420FF]"
                                />
                            </div>

                            <div className="space-y-4">

                                {/* PROFILE */}
                                <div className="flex items-center gap-3">

                                    <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                                        <CheckCircle size={15} />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                            Profile information loaded
                                        </p>

                                        <p className="text-xs text-[#778387] mt-0.5">
                                            Current session
                                        </p>
                                    </div>
                                </div>

                                {/* LOGIN */}
                                <div className="flex items-center gap-3">

                                    <div className="w-8 h-8 rounded-full bg-[#3420FF]/10 text-[#3420FF] flex items-center justify-center">
                                        <Lock size={15} />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                            Authentication verified
                                        </p>

                                        <p className="text-xs text-[#778387] mt-0.5">
                                            Current session
                                        </p>
                                    </div>
                                </div>

                                {/* MEMBER */}
                                <div className="flex items-center gap-3">

                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                        <Users size={15} />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                            Admin account active
                                        </p>

                                        <p className="text-xs text-[#778387] mt-0.5">
                                            Account status verified
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
                CUSTOM STYLES
            ========================================================= */}
            <style>{`
                .profile-icon {
                    width: 34px;
                    height: 34px;
                    border-radius: 9px;
                    background: #F3F0FF;
                    color: #3420FF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .dark .profile-icon {
                    background: rgba(52,32,255,.1);
                }

                .info-title {
                    font-size: .7rem;
                    color: #778387;
                }

                .info-value {
                    font-size: .82rem;
                    color: #1F272B;
                    margin-top: 2px;
                }

                .dark .info-value {
                    color: #F4F6F7;
                }

                .stat-card {
                    background: #fff;
                    border: 1px solid #E2E6E8;
                    border-radius: .75rem;
                    padding: 1rem;
                }

                .dark .stat-card {
                    background: #1C2529;
                    border-color: #303A3F;
                }

                .stat-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: .7rem;
                }

                .stat-label {
                    font-size: .72rem;
                    color: #778387;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1F272B;
                    margin-top: .2rem;
                }

                .dark .stat-value {
                    color: #F4F6F7;
                }

                .form-label {
                    display: block;
                    font-size: .8rem;
                    font-weight: 500;
                    color: #1F272B;
                    margin-bottom: .45rem;
                }

                .dark .form-label {
                    color: #F4F6F7;
                }

                .form-input {
                    width: 100%;
                    padding: .65rem .8rem;
                    border: 1px solid #E2E6E8;
                    border-radius: .5rem;
                    background: #F8F9FB;
                    color: #1F272B;
                    font-size: .85rem;
                    outline: none;
                    transition: .2s;
                }

                .form-input:focus {
                    border-color: #3420FF;
                    background: #fff;
                }

                .dark .form-input {
                    background: #12181B;
                    border-color: #303A3F;
                    color: #F4F6F7;
                }

                .dark .form-input:focus {
                    border-color: #3420FF;
                }

                .form-input::placeholder {
                    color: #9AA3A6;
                }
            `}</style>
        </div>
    );
};

export default MyProfile;

