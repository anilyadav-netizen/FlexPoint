import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/contact";

// ==========================
// CREATE CONTACT
// ==========================
export const createContact = createAsyncThunk(
    "contact/createContact",
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, contactData);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to send message"
            );
        }
    }
);

// ==========================
// GET ALL CONTACTS
// ==========================
export const getAllContacts = createAsyncThunk(
    "contact/getAllContacts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch contacts"
            );
        }
    }
);

// ==========================
// GET SINGLE CONTACT
// ==========================
export const getContactById = createAsyncThunk(
    "contact/getContactById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch contact"
            );
        }
    }
);

// ==========================
// DELETE CONTACT
// ==========================
export const deleteContact = createAsyncThunk(
    "contact/deleteContact",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);

            return {
                id,
                ...response.data,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete contact"
            );
        }
    }
);

// ==========================
// SLICE
// ==========================
const contactSlice = createSlice({
    name: "contact",

    initialState: {
        contacts: [],
        selectedContact: null,

        loading: false,
        error: null,
        success: false,
        message: "",
    },

    reducers: {
        clearContactError: (state) => {
            state.error = null;
        },

        clearContactSuccess: (state) => {
            state.success = false;
            state.message = "";
        },

        clearSelectedContact: (state) => {
            state.selectedContact = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ==========================
            // CREATE
            // ==========================
            .addCase(createContact.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(createContact.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;

                if (action.payload.contact) {
                    state.contacts.unshift(action.payload.contact);
                }
            })

            .addCase(createContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==========================
            // GET ALL
            // ==========================
            .addCase(getAllContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload.contacts || [];
            })

            .addCase(getAllContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==========================
            // GET SINGLE
            // ==========================
            .addCase(getContactById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getContactById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedContact = action.payload.contact;
            })

            .addCase(getContactById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ==========================
            // DELETE
            // ==========================
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;

                state.contacts = state.contacts.filter(
                    (contact) => contact._id !== action.payload.id
                );

                if (state.selectedContact?._id === action.payload.id) {
                    state.selectedContact = null;
                }
            })

            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearContactError,
    clearContactSuccess,
    clearSelectedContact,
} = contactSlice.actions;

export default contactSlice.reducer;