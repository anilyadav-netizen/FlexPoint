import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// ============================
// GET ALL TRAINERS
// ============================
export const getTrainers = createAsyncThunk(
    "trainer/getTrainers",
    async (active, { rejectWithValue }) => {
        try {
            const url =
                active !== undefined
                    ? `/trainers?active=${active}`
                    : "/trainers";

            const { data } = await API.get(url);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "No Trainer Available"
            );
        }
    }
);

// ============================
// GET SINGLE TRAINER
// ============================
export const getTrainerById = createAsyncThunk(
    "trainer/getTrainerById",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/trainers/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch trainer"
            );
        }
    }
);

// ============================
// CREATE TRAINER
// ============================
export const createTrainer = createAsyncThunk(
    "trainer/createTrainer",
    async (trainerData, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("number", trainerData.number || "");
            formData.append("name", trainerData.name || "");
            formData.append("role", trainerData.role || "");
            formData.append(
                "specialty",
                trainerData.specialty || ""
            );
            formData.append(
                "experience",
                trainerData.experience || ""
            );
            formData.append("icon", trainerData.icon || "Users");
            formData.append(
                "isActive",
                String(trainerData.isActive ?? true)
            );

            if (trainerData.image instanceof File) {
                formData.append("image", trainerData.image);
            }

            const { data } = await API.post(
                "/trainers",
                formData
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create trainer"
            );
        }
    }
);

// ============================
// UPDATE TRAINER
// ============================
export const updateTrainer = createAsyncThunk(
    "trainer/updateTrainer",
    async ({ id, trainerData }, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            if (trainerData.number !== undefined) {
                formData.append(
                    "number",
                    trainerData.number
                );
            }

            if (trainerData.name !== undefined) {
                formData.append("name", trainerData.name);
            }

            if (trainerData.role !== undefined) {
                formData.append("role", trainerData.role);
            }

            if (trainerData.specialty !== undefined) {
                formData.append(
                    "specialty",
                    trainerData.specialty
                );
            }

            if (trainerData.experience !== undefined) {
                formData.append(
                    "experience",
                    trainerData.experience
                );
            }

            if (trainerData.icon !== undefined) {
                formData.append("icon", trainerData.icon);
            }

            if (trainerData.isActive !== undefined) {
                formData.append(
                    "isActive",
                    String(trainerData.isActive)
                );
            }

            // Only send image when a new file is selected
            if (trainerData.image instanceof File) {
                formData.append(
                    "image",
                    trainerData.image
                );
            }

            const { data } = await API.put(
                `/trainers/${id}`,
                formData
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update trainer"
            );
        }
    }
);

// ============================
// DELETE TRAINER
// ============================
export const deleteTrainer = createAsyncThunk(
    "trainer/deleteTrainer",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.delete(
                `/trainers/${id}`
            );

            return {
                ...data,
                id,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete trainer"
            );
        }
    }
);

// ============================
// INITIAL STATE
// ============================
const initialState = {
    trainers: [],
    selectedTrainer: null,
    loading: false,
    error: null,
    success: false,
    message: "",
};

// ============================
// SLICE
// ============================
const trainerSlice = createSlice({
    name: "trainer",
    initialState,

    reducers: {
        clearTrainerError: (state) => {
            state.error = null;
        },

        clearTrainerSuccess: (state) => {
            state.success = false;
            state.message = "";
        },

        clearSelectedTrainer: (state) => {
            state.selectedTrainer = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ============================
            // GET ALL TRAINERS
            // ============================
            .addCase(getTrainers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getTrainers.fulfilled, (state, action) => {
                state.loading = false;
                state.trainers = action.payload.data || [];
                state.error = null;
            })

            .addCase(getTrainers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ============================
            // GET SINGLE TRAINER
            // ============================
            .addCase(getTrainerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getTrainerById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTrainer =
                    action.payload.data;
                state.error = null;
            })

            .addCase(getTrainerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ============================
            // CREATE TRAINER
            // ============================
            .addCase(createTrainer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(createTrainer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                if (action.payload.data) {
                    state.trainers.unshift(
                        action.payload.data
                    );
                }
            })

            .addCase(createTrainer.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ============================
            // UPDATE TRAINER
            // ============================
            .addCase(updateTrainer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(updateTrainer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                const updatedTrainer =
                    action.payload.data;

                if (updatedTrainer) {
                    const index = state.trainers.findIndex(
                        (trainer) =>
                            trainer._id ===
                            updatedTrainer._id
                    );

                    if (index !== -1) {
                        state.trainers[index] =
                            updatedTrainer;
                    }

                    if (
                        state.selectedTrainer &&
                        state.selectedTrainer._id ===
                        updatedTrainer._id
                    ) {
                        state.selectedTrainer =
                            updatedTrainer;
                    }
                }
            })

            .addCase(updateTrainer.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ============================
            // DELETE TRAINER
            // ============================
            .addCase(deleteTrainer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(deleteTrainer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;

                state.trainers = state.trainers.filter(
                    (trainer) =>
                        trainer._id !== action.payload.id
                );

                if (
                    state.selectedTrainer &&
                    state.selectedTrainer._id ===
                    action.payload.id
                ) {
                    state.selectedTrainer = null;
                }
            })

            .addCase(deleteTrainer.rejected, (state, action) => {
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
    clearTrainerError,
    clearTrainerSuccess,
    clearSelectedTrainer,
} = trainerSlice.actions;

// ============================
// REDUCER
// ============================
export default trainerSlice.reducer;