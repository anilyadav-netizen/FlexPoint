import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// ================= REGISTER USER =================
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/register", userData);

            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

// ================= LOGIN USER =================
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/login", userData);

            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

// ================= GET CURRENT USER =================
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get("/auth/me");
            return data;
        } catch (error) {
            return rejectWithValue({
                message:
                    error.response?.data?.message ||
                    "Authentication failed",
                status: error.response?.status,
            });
        }
    }
);

// ================= LOGOUT USER =================
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/logout");

            localStorage.removeItem("token");

            return data;
        } catch (error) {
            localStorage.removeItem("token");

            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);

// ================= GET ALL USERS =================
export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get("/auth/users");

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch users"
            );
        }
    }
);

// ================= INITIAL STATE =================
const initialState = {
    user: null,
    users: [],

    isAuthenticated: false,

    // Normal API loading
    loading: false,

    // Important for page refresh
    checkingAuth: true,

    error: null,
};

// ================= AUTH SLICE =================
const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        // ================= CLEAR ERROR =================
        clearAuthError: (state) => {
            state.error = null;
        },

        // ================= LOCAL LOGOUT =================
        clearAuth: (state) => {
            state.user = null;
            state.users = [];
            state.isAuthenticated = false;
            state.loading = false;
            state.checkingAuth = false;
            state.error = null;

            localStorage.removeItem("token");
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

                state.user = action.payload?.user || null;

                state.isAuthenticated = Boolean(
                    action.payload?.user
                );

                state.error = null;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

                state.user = null;
                state.isAuthenticated = false;
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

                state.user = action.payload?.user || null;

                state.isAuthenticated = Boolean(
                    action.payload?.user
                );

                state.error = null;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;

                state.user = null;
                state.isAuthenticated = false;
            })

            // =================================================
            // GET CURRENT USER
            // =================================================
            .addCase(getCurrentUser.pending, (state) => {
                state.checkingAuth = true;
                state.error = null;
            })

            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.checkingAuth = false;

                state.user = action.payload?.user || null;

                state.isAuthenticated = Boolean(
                    action.payload?.user
                );

                state.error = null;
            })

            .addCase(getCurrentUser.rejected, (state, action) => {
                state.checkingAuth = false;

                /*
                 * Authentication check failed.
                 * Don't remove local token here automatically.
                 */
                state.user = null;
                state.isAuthenticated = false;

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

// ================= EXPORTS =================
export const {
    clearAuthError,
    clearAuth,
} = authSlice.actions;

export default authSlice.reducer;