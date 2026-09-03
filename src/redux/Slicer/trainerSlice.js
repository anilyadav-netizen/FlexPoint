import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// ======================================
// GET ALL TRAINERS
// GET /api/trainers
// GET /api/trainers?active=true
// ======================================
export const getTrainers = createAsyncThunk(
  "trainer/getTrainers",
  async (active, { rejectWithValue }) => {
    try {
      let url = "/trainers";

      if (active !== undefined && active !== null) {
        url += `?active=${Boolean(active)}`;
      }

      const response = await API.get(url);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch trainers"
      );
    }
  }
);

// ======================================
// GET SINGLE TRAINER
// GET /api/trainers/:id
// ======================================
export const getTrainerById = createAsyncThunk(
  "trainer/getTrainerById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("Trainer ID is required");
      }

      const response = await API.get(`/trainers/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch trainer"
      );
    }
  }
);

// ======================================
// CREATE TRAINER
// POST /api/trainers
// ======================================
export const createTrainer = createAsyncThunk(
  "trainer/createTrainer",
  async (trainerData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Required fields
      formData.append(
        "number",
        trainerData.number ?? ""
      );

      formData.append(
        "name",
        trainerData.name ?? ""
      );

      formData.append(
        "role",
        trainerData.role ?? ""
      );

      formData.append(
        "specialty",
        trainerData.specialty ?? ""
      );

      formData.append(
        "experience",
        trainerData.experience ?? ""
      );

      // Optional fields
      formData.append(
        "icon",
        trainerData.icon || "Users"
      );

      formData.append(
        "isActive",
        String(trainerData.isActive ?? true)
      );

      // Image
      if (
        typeof File !== "undefined" &&
        trainerData.image instanceof File
      ) {
        formData.append(
          "image",
          trainerData.image
        );
      }

      const response = await API.post(
        "/trainers",
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create trainer"
      );
    }
  }
);

// ======================================
// UPDATE TRAINER
// PUT /api/trainers/:id
// ======================================
export const updateTrainer = createAsyncThunk(
  "trainer/updateTrainer",
  async (
    { id, trainerData },
    { rejectWithValue }
  ) => {
    try {
      if (!id) {
        return rejectWithValue("Trainer ID is required");
      }

      const formData = new FormData();

      // Number
      if (
        trainerData.number !== undefined &&
        trainerData.number !== null
      ) {
        formData.append(
          "number",
          trainerData.number
        );
      }

      // Name
      if (
        trainerData.name !== undefined &&
        trainerData.name !== null
      ) {
        formData.append(
          "name",
          trainerData.name
        );
      }

      // Role
      if (
        trainerData.role !== undefined &&
        trainerData.role !== null
      ) {
        formData.append(
          "role",
          trainerData.role
        );
      }

      // Specialty
      if (
        trainerData.specialty !== undefined &&
        trainerData.specialty !== null
      ) {
        formData.append(
          "specialty",
          trainerData.specialty
        );
      }

      // Experience
      if (
        trainerData.experience !== undefined &&
        trainerData.experience !== null
      ) {
        formData.append(
          "experience",
          trainerData.experience
        );
      }

      // Icon
      if (
        trainerData.icon !== undefined &&
        trainerData.icon !== null
      ) {
        formData.append(
          "icon",
          trainerData.icon
        );
      }

      // Active status
      if (
        trainerData.isActive !== undefined &&
        trainerData.isActive !== null
      ) {
        formData.append(
          "isActive",
          String(trainerData.isActive)
        );
      }

      // New image only
      if (
        typeof File !== "undefined" &&
        trainerData.image instanceof File
      ) {
        formData.append(
          "image",
          trainerData.image
        );
      }

      const response = await API.put(
        `/trainers/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update trainer"
      );
    }
  }
);

// ======================================
// DELETE TRAINER
// DELETE /api/trainers/:id
// ======================================
export const deleteTrainer = createAsyncThunk(
  "trainer/deleteTrainer",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue(
          "Trainer ID is required"
        );
      }

      const response = await API.delete(
        `/trainers/${id}`
      );

      return {
        ...response.data,
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

// ======================================
// INITIAL STATE
// ======================================
const initialState = {
  trainers: [],
  selectedTrainer: null,

  loading: false,
  error: null,

  success: false,
  message: "",
};

// ======================================
// SLICE
// ======================================
const trainerSlice = createSlice({
  name: "trainer",

  initialState,

  reducers: {
    // ======================================
    // CLEAR ERROR
    // ======================================
    clearTrainerError: (state) => {
      state.error = null;
    },

    // ======================================
    // CLEAR SUCCESS
    // ======================================
    clearTrainerSuccess: (state) => {
      state.success = false;
      state.message = "";
    },

    // ======================================
    // CLEAR SELECTED TRAINER
    // ======================================
    clearSelectedTrainer: (state) => {
      state.selectedTrainer = null;
    },

    // ======================================
    // RESET TRAINER STATE
    // ======================================
    resetTrainerState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
      state.selectedTrainer = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================
      // GET ALL TRAINERS
      // ======================================
      .addCase(
        getTrainers.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getTrainers.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.trainers =
            action.payload?.data || [];
        }
      )

      .addCase(
        getTrainers.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch trainers";
        }
      )

      // ======================================
      // GET SINGLE TRAINER
      // ======================================
      .addCase(
        getTrainerById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getTrainerById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.selectedTrainer =
            action.payload?.data || null;
        }
      )

      .addCase(
        getTrainerById.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch trainer";
        }
      )

      // ======================================
      // CREATE TRAINER
      // ======================================
      .addCase(
        createTrainer.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
          state.message = "";
        }
      )

      .addCase(
        createTrainer.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Trainer created successfully";

          const newTrainer =
            action.payload?.data;

          if (newTrainer) {
            state.trainers.unshift(
              newTrainer
            );
          }
        }
      )

      .addCase(
        createTrainer.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to create trainer";
        }
      )

      // ======================================
      // UPDATE TRAINER
      // ======================================
      .addCase(
        updateTrainer.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
          state.message = "";
        }
      )

      .addCase(
        updateTrainer.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Trainer updated successfully";

          const updatedTrainer =
            action.payload?.data;

          if (!updatedTrainer) {
            return;
          }

          // Update trainer inside list
          const index =
            state.trainers.findIndex(
              (trainer) =>
                trainer._id ===
                updatedTrainer._id
            );

          if (index !== -1) {
            state.trainers[index] =
              updatedTrainer;
          }

          // Update selected trainer
          if (
            state.selectedTrainer?._id ===
            updatedTrainer._id
          ) {
            state.selectedTrainer =
              updatedTrainer;
          }
        }
      )

      .addCase(
        updateTrainer.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to update trainer";
        }
      )

      // ======================================
      // DELETE TRAINER
      // ======================================
      .addCase(
        deleteTrainer.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
          state.message = "";
        }
      )

      .addCase(
        deleteTrainer.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Trainer deleted successfully";

          const deletedId =
            action.payload?.id;

          state.trainers =
            state.trainers.filter(
              (trainer) =>
                trainer._id !== deletedId
            );

          if (
            state.selectedTrainer?._id ===
            deletedId
          ) {
            state.selectedTrainer = null;
          }
        }
      )

      .addCase(
        deleteTrainer.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to delete trainer";
        }
      );
  },
});

// ======================================
// ACTIONS
// ======================================
export const {
  clearTrainerError,
  clearTrainerSuccess,
  clearSelectedTrainer,
  resetTrainerState,
} = trainerSlice.actions;

// ======================================
// REDUCER
// ======================================
export default trainerSlice.reducer;