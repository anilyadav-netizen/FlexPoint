import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// ============================
// GET ALL PROGRAMS
// ============================
export const getPrograms = createAsyncThunk(
    "program/getPrograms",
    async (active, { rejectWithValue }) => {
        try {
            const url =
                active !== undefined
                    ? `/programs?active=${active}`
                    : "/programs";

            const { data } = await API.get(url);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "No Program Available"
            );
        }
    }
);

// ============================
// GET SINGLE PROGRAM
// ============================
export const getProgramById = createAsyncThunk(
    "program/getProgramById",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/programs/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch program"
            );
        }
    }
);

// ============================
// CREATE PROGRAM
// ============================
export const createProgram = createAsyncThunk(
    "program/createProgram",
    async (programData, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("title", programData.title || "");
            formData.append("subtitle", programData.subtitle || "");
            formData.append("description", programData.description || "");
            formData.append("icon", programData.icon || "");
            formData.append(
                "isActive",
                String(programData.isActive ?? true)
            );

            // Actual File object
            if (programData.image instanceof File) {
                formData.append("image", programData.image);
            }

            const { data } = await API.post("/programs", formData);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to create program"
            );
        }
    }
);

// ============================
// UPDATE PROGRAM
// ============================
export const updateProgram = createAsyncThunk(
    "program/updateProgram",
    async ({ id, programData }, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            if (programData.title !== undefined) {
                formData.append("title", programData.title);
            }

            if (programData.subtitle !== undefined) {
                formData.append("subtitle", programData.subtitle);
            }

            if (programData.description !== undefined) {
                formData.append(
                    "description",
                    programData.description
                );
            }

            if (programData.icon !== undefined) {
                formData.append("icon", programData.icon);
            }

            if (programData.isActive !== undefined) {
                formData.append(
                    "isActive",
                    String(programData.isActive)
                );
            }

            // Only send actual File when a new image is selected
            if (programData.image instanceof File) {
                formData.append("image", programData.image);
            }

            const { data } = await API.put(
                `/programs/${id}`,
                formData
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to update program"
            );
        }
    }
);

// ============================
// DELETE PROGRAM
// ============================
export const deleteProgram = createAsyncThunk(
    "program/deleteProgram",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.delete(`/programs/${id}`);

            return {
                ...data,
                id,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to delete program"
            );
        }
    }
);

// ============================
// INITIAL STATE
// ============================
const initialState = {
    programs: [],
    selectedProgram: null,
    loading: false,
    error: null,
    success: false,
    message: "",
};

// ============================
// SLICE
// ============================
const programSlice = createSlice({
    name: "program",

    initialState,

    reducers: {
        clearProgramError: (state) => {
            state.error = null;
        },

        clearProgramSuccess: (state) => {
            state.success = false;
            state.message = "";
        },

        clearSelectedProgram: (state) => {
            state.selectedProgram = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ============================
            // GET ALL PROGRAMS
            // ============================
            .addCase(getPrograms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getPrograms.fulfilled, (state, action) => {
                state.loading = false;
                state.program = action.payload.data || [];
                state.error = null;
            })

            .addCase(getPrograms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ============================
            // GET SINGLE PROGRAM
            // ============================
            .addCase(getProgramById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getProgramById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProgram = action.payload.data;
                state.error = null;
            })

            .addCase(getProgramById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ============================
            // CREATE PROGRAM
            // ============================
            .addCase(createProgram.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(createProgram.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                if (action.payload.data) {
                    state.program.unshift(action.payload.data);
                }
            })

            .addCase(createProgram.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ============================
            // UPDATE PROGRAM
            // ============================
            .addCase(updateProgram.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(updateProgram.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                const updatedProgram = action.payload.data;

                if (updatedProgram) {
                    const index = state.program.findIndex(
                        (program) =>
                            program._id === updatedProgram._id
                    );

                    if (index !== -1) {
                        state.program[index] = updatedProgram;
                    }

                    if (
                        state.selectedProgram &&
                        state.selectedProgram._id ===
                            updatedProgram._id
                    ) {
                        state.selectedProgram = updatedProgram;
                    }
                }
            })

            .addCase(updateProgram.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ============================
            // DELETE PROGRAM
            // ============================
            .addCase(deleteProgram.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(deleteProgram.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                state.program = state.program.filter(
                    (program) => program._id !== action.payload.id
                );

                if (
                    state.selectedProgram &&
                    state.selectedProgram._id === action.payload.id
                ) {
                    state.selectedProgram = null;
                }
            })

            .addCase(deleteProgram.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

// ============================
// ACTIONS
// ============================
export const {
    clearProgramError,
    clearProgramSuccess,
    clearSelectedProgram,
} = programSlice.actions;

// ============================
// REDUCER
// ============================
export default programSlice.reducer;