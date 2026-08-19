import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Api/Api";
export const createTestimonial = createAsyncThunk(
    "testimonial/createTestimonial",
    async (testimonialData, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/testimonials",
                testimonialData
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

export const getTestimonials = createAsyncThunk(
    "testimonial/getTestimonials",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                "/testimonials"
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch testimonials"
            );
        }
    }
);

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

export const updateTestimonial = createAsyncThunk(
    "testimonial/updateTestimonial",
    async (
        { id, testimonialData },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.put(
                `/testimonials/${id}`,
                testimonialData
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

const initialState = {
    testimonials: [],
    testimonial: null,
    loading: false,
    error: null,
    success: null,
};

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

export const {
    clearTestimonialError,
    clearTestimonialSuccess,
    clearSelectedTestimonial,
    resetTestimonialState,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;