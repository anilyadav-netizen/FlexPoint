import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Api/Api";

// ======================================================
// CREATE TESTIMONIAL
// ======================================================

export const createTestimonial = createAsyncThunk(
    "testimonial/createTestimonial",
    async (testimonialData, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("name", testimonialData.name);
            formData.append("role", testimonialData.role);
            formData.append("rating", testimonialData.rating);
            formData.append("review", testimonialData.review);
            formData.append("initials", testimonialData.initials || "");
            formData.append(
                "status",
                testimonialData.status !== undefined
                    ? testimonialData.status
                    : true
            );

            // Image
            if (testimonialData.image) {
                formData.append("image", testimonialData.image);
            }

            const response = await api.post(
                "/testimonials",
                formData
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to create testimonial"
            );
        }
    }
);

// ======================================================
// GET ALL TESTIMONIALS
// ======================================================

export const getTestimonials = createAsyncThunk(
    "testimonial/getTestimonials",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/testimonials");

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch testimonials"
            );
        }
    }
);

// ======================================================
// GET ACTIVE TESTIMONIALS
// ======================================================

export const getActiveTestimonials = createAsyncThunk(
    "testimonial/getActiveTestimonials",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                "/testimonials/active"
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch active testimonials"
            );
        }
    }
);

// ======================================================
// GET SINGLE TESTIMONIAL
// ======================================================

export const getTestimonialById = createAsyncThunk(
    "testimonial/getTestimonialById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `/testimonials/${id}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch testimonial"
            );
        }
    }
);

// ======================================================
// UPDATE TESTIMONIAL
// ======================================================

export const updateTestimonial = createAsyncThunk(
    "testimonial/updateTestimonial",
    async (
        { id, testimonialData },
        { rejectWithValue }
    ) => {
        try {
            const formData = new FormData();

            if (testimonialData.name !== undefined) {
                formData.append(
                    "name",
                    testimonialData.name
                );
            }

            if (testimonialData.role !== undefined) {
                formData.append(
                    "role",
                    testimonialData.role
                );
            }

            if (testimonialData.rating !== undefined) {
                formData.append(
                    "rating",
                    testimonialData.rating
                );
            }

            if (testimonialData.review !== undefined) {
                formData.append(
                    "review",
                    testimonialData.review
                );
            }

            if (testimonialData.initials !== undefined) {
                formData.append(
                    "initials",
                    testimonialData.initials
                );
            }

            if (testimonialData.status !== undefined) {
                formData.append(
                    "status",
                    testimonialData.status
                );
            }

            // New image only if selected
            if (testimonialData.image) {
                formData.append(
                    "image",
                    testimonialData.image
                );
            }

            const response = await api.put(
                `/testimonials/${id}`,
                formData
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to update testimonial"
            );
        }
    }
);

// ======================================================
// DELETE TESTIMONIAL
// ======================================================

export const deleteTestimonial = createAsyncThunk(
    "testimonial/deleteTestimonial",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(
                `/testimonials/${id}`
            );

            return {
                ...response.data,
                id,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to delete testimonial"
            );
        }
    }
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
    testimonials: [],
    testimonial: null,
    loading: false,
    error: null,
    success: null,
};

// ======================================================
// SLICE
// ======================================================

const testimonialSlice = createSlice({
    name: "testimonial",
    initialState,

    reducers: {
        clearTestimonialError: (state) => {
            state.error = null;
        },

        clearTestimonialSuccess: (state) => {
            state.success = null;
        },

        clearSelectedTestimonial: (state) => {
            state.testimonial = null;
        },

        resetTestimonialState: (state) => {
            state.testimonials = [];
            state.testimonial = null;
            state.loading = false;
            state.error = null;
            state.success = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ==================================================
            // CREATE
            // ==================================================

            .addCase(
                createTestimonial.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = null;
                }
            )

            .addCase(
                createTestimonial.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.success =
                        action.payload.message;

                    if (action.payload.data) {
                        state.testimonials.unshift(
                            action.payload.data
                        );
                    }
                }
            )

            .addCase(
                createTestimonial.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // ==================================================
            // GET ALL
            // ==================================================

            .addCase(
                getTestimonials.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getTestimonials.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.testimonials =
                        action.payload.data || [];

                    state.error = null;
                }
            )

            .addCase(
                getTestimonials.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // ==================================================
            // GET ACTIVE
            // ==================================================

            .addCase(
                getActiveTestimonials.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getActiveTestimonials.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.testimonials =
                        action.payload.data || [];

                    state.error = null;
                }
            )

            .addCase(
                getActiveTestimonials.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // ==================================================
            // GET BY ID
            // ==================================================

            .addCase(
                getTestimonialById.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getTestimonialById.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.testimonial =
                        action.payload.data || null;

                    state.error = null;
                }
            )

            .addCase(
                getTestimonialById.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // ==================================================
            // UPDATE
            // ==================================================

            .addCase(
                updateTestimonial.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = null;
                }
            )

            .addCase(
                updateTestimonial.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.success =
                        action.payload.message;

                    const updatedTestimonial =
                        action.payload.data;

                    if (updatedTestimonial) {
                        const index =
                            state.testimonials.findIndex(
                                (item) =>
                                    item._id ===
                                    updatedTestimonial._id
                            );

                        if (index !== -1) {
                            state.testimonials[index] =
                                updatedTestimonial;
                        }

                        state.testimonial =
                            updatedTestimonial;
                    }
                }
            )

            .addCase(
                updateTestimonial.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // ==================================================
            // DELETE
            // ==================================================

            .addCase(
                deleteTestimonial.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = null;
                }
            )

            .addCase(
                deleteTestimonial.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.success =
                        action.payload.message;

                    state.testimonials =
                        state.testimonials.filter(
                            (item) =>
                                item._id !==
                                action.payload.id
                        );

                    if (
                        state.testimonial?._id ===
                        action.payload.id
                    ) {
                        state.testimonial = null;
                    }
                }
            )

            .addCase(
                deleteTestimonial.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
    clearTestimonialError,
    clearTestimonialSuccess,
    clearSelectedTestimonial,
    resetTestimonialState,
} = testimonialSlice.actions;

// ======================================================
// REDUCER
// ======================================================

export default testimonialSlice.reducer;