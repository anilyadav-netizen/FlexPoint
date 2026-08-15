import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../Api/Api";

export const getGallery = createAsyncThunk(
    "gallery/getGallery",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/gallery");
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch gallery"
            );
        }
    }
);

// ==========================================
// GET SINGLE GALLERY
// ==========================================

export const getGalleryById = createAsyncThunk(
    "gallery/getGalleryById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`/gallery/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch gallery"
            );
        }
    }
);

// ==========================================
// CREATE GALLERY
// ==========================================

export const createGallery = createAsyncThunk(
    "gallery/createGallery",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await API.post("/gallery", formData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create gallery"
            );
        }
    }
);

// ==========================================
// UPDATE GALLERY
// ==========================================

export const updateGallery = createAsyncThunk(
    "gallery/updateGallery",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(
                `/gallery/${id}`,
                formData
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update gallery"
            );
        }
    }
);

// ==========================================
// DELETE GALLERY
// ==========================================

export const deleteGallery = createAsyncThunk(
    "gallery/deleteGallery",
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/gallery/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete gallery"
            );
        }
    }
);

// ==========================================
// SLICE
// ==========================================

const gallerySlice = createSlice({
    name: "gallery",

    initialState: {
        gallery: [],
        selectedGallery: null,
        loading: false,
        error: null,
    },

    reducers: {
        clearSelectedGallery: (state) => {
            state.selectedGallery = null;
        },

        clearGalleryError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ==========================================
            // GET ALL GALLERY
            // ==========================================

            .addCase(getGallery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getGallery.fulfilled, (state, action) => {
                state.loading = false;
                state.gallery = action.payload || [];
            })

            .addCase(getGallery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==========================================
            // GET SINGLE GALLERY
            // ==========================================

            .addCase(getGalleryById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedGallery = null;
            })

            .addCase(getGalleryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedGallery = action.payload;
            })

            .addCase(getGalleryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==========================================
            // CREATE GALLERY
            // ==========================================

            .addCase(createGallery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createGallery.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload) {
                    state.gallery.unshift(action.payload);
                }
            })

            .addCase(createGallery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==========================================
            // UPDATE GALLERY
            // ==========================================

            .addCase(updateGallery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateGallery.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.gallery.findIndex(
                    (item) => item._id === action.payload._id
                );

                if (index !== -1) {
                    state.gallery[index] = action.payload;
                }

                state.selectedGallery = action.payload;
            })

            .addCase(updateGallery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==========================================
            // DELETE GALLERY
            // ==========================================

            .addCase(deleteGallery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteGallery.fulfilled, (state, action) => {
                state.loading = false;

                state.gallery = state.gallery.filter(
                    (item) => item._id !== action.payload
                );
            })

            .addCase(deleteGallery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearSelectedGallery,
    clearGalleryError,
} = gallerySlice.actions;

export default gallerySlice.reducer;