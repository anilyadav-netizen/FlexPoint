import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../Api/Api";

// ============================
// GET ALL BLOGS
// ============================
export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await API.get("/blogs", {
                params,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch blogs"
            );
        }
    }
);

// ============================
// GET SINGLE BLOG
// ============================
export const getBlog = createAsyncThunk(
    "blog/getBlog",
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.get(`/blogs/${id}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch blog"
            );
        }
    }
);

// ============================
// GET BLOG BY SLUG
// ============================
export const getBlogBySlug = createAsyncThunk(
    "blog/getBlogBySlug",
    async (slug, { rejectWithValue }) => {
        try {
            const response = await API.get(
                `/blogs/slug/${slug}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch blog"
            );
        }
    }
);

// ============================
// CREATE BLOG
// ============================
export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await API.post(
                "/blogs",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create blog"
            );
        }
    }
);

// ============================
// UPDATE BLOG
// ============================
export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await API.put(
                `/blogs/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update blog"
            );
        }
    }
);

// ============================
// DELETE BLOG
// ============================
export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async (id, { rejectWithValue }) => {
        try {
            const response = await API.delete(
                `/blogs/${id}`
            );

            return {
                ...response.data,
                id,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete blog"
            );
        }
    }
);

// ============================
// INITIAL STATE
// ============================
const initialState = {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
    success: false,
    message: "",
};

// ============================
// SLICE
// ============================
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        clearBlogError: (state) => {
            state.error = null;
        },

        clearBlogSuccess: (state) => {
            state.success = false;
            state.message = "";
        },

        clearSelectedBlog: (state) => {
            state.blog = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ============================
            // GET BLOGS
            // ============================
            .addCase(getBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = Array.isArray(action.payload?.data)
                    ? action.payload.data
                    : [];
            })

            .addCase(getBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ============================
            // GET SINGLE BLOG
            // ============================
            .addCase(getBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blog = action.payload?.data || null;
            })

            .addCase(getBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ============================
            // GET BLOG BY SLUG
            // ============================
            .addCase(getBlogBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getBlogBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.blog = action.payload?.data || null;
            })

            .addCase(getBlogBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ============================
            // CREATE BLOG
            // ============================
            .addCase(createBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message =
                    action.payload?.message ||
                    "Blog created successfully";

                if (action.payload?.data) {
                    state.blogs.unshift(
                        action.payload.data
                    );
                }
            })

            .addCase(createBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // ============================
            // UPDATE BLOG
            // ============================
            .addCase(updateBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message =
                    action.payload?.message ||
                    "Blog updated successfully";

                const updatedBlog =
                    action.payload?.data;

                if (updatedBlog?._id) {
                    state.blogs = state.blogs.map(
                        (item) =>
                            item._id === updatedBlog._id
                                ? updatedBlog
                                : item
                    );

                    state.blog = updatedBlog;
                }
            })

            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // ============================
            // DELETE BLOG
            // ============================
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message =
                    action.payload?.message ||
                    "Blog deleted successfully";

                state.blogs = state.blogs.filter(
                    (item) =>
                        item._id !== action.payload.id
                );
            })

            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearBlogError,
    clearBlogSuccess,
    clearSelectedBlog,
} = blogSlice.actions;

export default blogSlice.reducer;