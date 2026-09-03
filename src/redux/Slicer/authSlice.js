import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// =====================================================
// GET SAVED USER FROM LOCAL STORAGE
// =====================================================

const getSavedUser = () => {
    try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        return JSON.parse(savedUser);
    } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("user");
        return null;
    }
};

// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        console.log(
            "🔥 REGISTER THUNK CALLED:",
            userData
        );

        try {
            console.log(
                "🔥 CALLING REGISTER API..."
            );

            const { data } = await API.post(
                "/auth/register",
                userData
            );

            console.log(
                "🔥 REGISTER RESPONSE:",
                data
            );

            if (data?.token) {
                localStorage.setItem(
                    "token",
                    data.token
                );
                console.log(
                    "🔥 TOKEN SAVED:",
                    data.token
                );
            } else {
                console.log(
                    "❌ REGISTER RESPONSE ME TOKEN NAHI HAI"
                );
            }

            if (data?.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            return data;
        } catch (error) {
            console.log(
                "❌ REGISTER API ERROR:",
                error
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    }
);

// =====================================================
// LOGIN USER
// =====================================================

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        console.log("🔥🔥 LOGIN THUNK CALLED:", userData);

        try {
            console.log("🚀 CALLING LOGIN API...");

            const { data } = await API.post("/auth/login", userData);

            console.log("✅ LOGIN API RESPONSE:", data);

            if (data?.token) {
                localStorage.setItem("token", data.token);
                console.log("✅ TOKEN SAVED:", data.token);
            } else {
                console.log("❌ RESPONSE ME TOKEN NAHI HAI");
            }

            if (data?.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                console.log("✅ USER SAVED:", data.user);
            }

            return data;
        } catch (error) {
            console.log("❌ LOGIN API ERROR:", error);
            console.log("❌ ERROR RESPONSE:", error.response?.data);

            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);
// =====================================================
// GET CURRENT USER
// =====================================================

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return rejectWithValue({
                    message: "No authentication token",
                    status: 401,
                });
            }

            const { data } = await API.get("/auth/me");

            const currentUser =
                data?.user ||
                data?.data?.user ||
                data?.data ||
                null;

            if (currentUser) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(currentUser)
                );
            }

            return {
                ...data,
                user: currentUser,
            };
        } catch (error) {
            const status = error.response?.status;

            if (status === 401 || status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }

            return rejectWithValue({
                message:
                    error.response?.data?.message ||
                    "Authentication failed",
                status,
            });
        }
    }
);

// =====================================================
// LOGOUT
// =====================================================

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.post(
                "/auth/logout"
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            return data;
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            return rejectWithValue(
                error.response?.data?.message ||
                "Logout failed"
            );
        }
    }
);

// =====================================================
// GET ALL USERS
// =====================================================

export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get(
                "/auth/users"
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch users"
            );
        }
    }
);

// =====================================================
// INITIAL STATE
// =====================================================

const savedUser = getSavedUser();

const initialState = {
    user: savedUser,
    users: [],

    isAuthenticated: Boolean(savedUser),

    loading: false,

    // Agar localStorage me user hai to
    // Navbar ko turant profile dikhani hai.
    checkingAuth: Boolean(
        localStorage.getItem("token")
    ),

    error: null,
};

// =====================================================
// SLICE
// =====================================================

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },

        clearAuth: (state) => {
            state.user = null;
            state.users = [];
            state.isAuthenticated = false;
            state.loading = false;
            state.checkingAuth = false;
            state.error = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },

    extraReducers: (builder) => {
        builder

            // =================================================
            // REGISTER
            // =================================================

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;

                const user = action.payload?.user || null;

                state.user = user;
                state.isAuthenticated = Boolean(user);
                state.checkingAuth = false;
                state.error = null;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.checkingAuth = false;
            })

            // =================================================
            // LOGIN
            // =================================================

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                const user = action.payload?.user || null;

                state.user = user;
                state.isAuthenticated = Boolean(user);
                state.checkingAuth = false;
                state.error = null;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
                state.checkingAuth = false;
            })

            // =================================================
            // GET CURRENT USER
            // =================================================

            .addCase(getCurrentUser.pending, (state) => {
                state.checkingAuth = true;
            })

            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.checkingAuth = false;

                const user = action.payload?.user || null;

                state.user = user;
                state.isAuthenticated = Boolean(user);
                state.error = null;
            })

            .addCase(getCurrentUser.rejected, (state, action) => {
                state.checkingAuth = false;

                // Sirf tab clear karo jab actual authentication
                // invalid ho.
                if (
                    action.payload?.status === 401 ||
                    action.payload?.status === 403
                ) {
                    state.user = null;
                    state.isAuthenticated = false;
                }

                state.error =
                    action.payload?.message ||
                    "Authentication failed";
            })

            // =================================================
            // GET ALL USERS
            // =================================================

            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;

                state.users =
                    action.payload?.users || [];

                state.error = null;
            })

            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;

                state.users = [];

                state.error = action.payload;
            })

            // =================================================
            // LOGOUT
            // =================================================

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.checkingAuth = false;
                state.user = null;
                state.users = [];
                state.isAuthenticated = false;
                state.error = null;
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.checkingAuth = false;
                state.user = null;
                state.users = [];
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearAuthError,
    clearAuth,
} = authSlice.actions;

export default authSlice.reducer;