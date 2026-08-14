import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../Api/Api'

// ============================
// GET ALL PLANS
// ============================
export const getPlans = createAsyncThunk(
    'plans/getPlans',
    async (active, { rejectWithValue }) => {
        try {
            const url = active !== undefined
                ? `/plans?active=${active}`
                : '/plans'

            const { data } = await API.get(url)
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch plans'
            )
        }
    }
)

// ============================
// GET SINGLE PLAN
// ============================
export const getPlanById = createAsyncThunk(
    'plans/getPlanById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/plans/${id}`)
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch plan'
            )
        }
    }
)

// ============================
// CREATE PLAN
// ============================
export const createPlan = createAsyncThunk(
    'plans/createPlan',
    async (planData, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/plans', planData)
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create plan'
            )
        }
    }
)

// ============================
// UPDATE PLAN
// ============================
export const updatePlan = createAsyncThunk(
    'plans/updatePlan',
    async ({ id, planData }, { rejectWithValue }) => {
        try {
            const { data } = await API.put(`/plans/${id}`, planData)
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update plan'
            )
        }
    }
)

// ============================
// DELETE PLAN
// ============================
export const deletePlan = createAsyncThunk(
    'plans/deletePlan',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await API.delete(`/plans/${id}`)
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete plan'
            )
        }
    }
)

// ============================
// INITIAL STATE
// ============================
const initialState = {
    plans: [],
    selectedPlan: null,
    loading: false,
    error: null,
    success: false,
    message: '',
}

// ============================
// SLICE
// ============================
const planSlice = createSlice({
    name: 'plans',
    initialState,

    reducers: {
        clearPlanError: (state) => {
            state.error = null
        },
        clearPlanSuccess: (state) => {
            state.success = false
            state.message = ''
        },
        clearSelectedPlan: (state) => {
            state.selectedPlan = null
        },
    },

    extraReducers: (builder) => {
        builder

            // ============================
            // GET ALL PLANS
            // ============================
            .addCase(getPlans.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPlans.fulfilled, (state, action) => {
                state.loading = false
                state.plans = action.payload.data || []
                state.error = null
            })
            .addCase(getPlans.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // ============================
            // GET SINGLE PLAN
            // ============================
            .addCase(getPlanById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPlanById.fulfilled, (state, action) => {
                state.loading = false
                state.selectedPlan = action.payload.data
                state.error = null
            })
            .addCase(getPlanById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // ============================
            // CREATE PLAN
            // ============================
            .addCase(createPlan.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(createPlan.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.message = action.payload.message
                state.error = null

                if (action.payload.data) {
                    state.plans.push(action.payload.data)
                }
            })
            .addCase(createPlan.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload
            })

            // ============================
            // UPDATE PLAN
            // ============================
            .addCase(updatePlan.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(updatePlan.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.message = action.payload.message
                state.error = null

                const updatedPlan = action.payload.data

                const index = state.plans.findIndex(
                    (plan) => plan._id === updatedPlan._id
                )

                if (index !== -1) {
                    state.plans[index] = updatedPlan
                }

                if (
                    state.selectedPlan &&
                    state.selectedPlan._id === updatedPlan._id
                ) {
                    state.selectedPlan = updatedPlan
                }
            })
            .addCase(updatePlan.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload
            })

            // ============================
            // DELETE PLAN
            // ============================
            .addCase(deletePlan.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.message = action.payload.message
                state.error = null

                const deletedPlan = action.payload.data

                state.plans = state.plans.filter(
                    (plan) => plan._id !== deletedPlan._id
                )

                if (
                    state.selectedPlan &&
                    state.selectedPlan._id === deletedPlan._id
                ) {
                    state.selectedPlan = null
                }
            })
            .addCase(deletePlan.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload
            })
    },
})

export const {
    clearPlanError,
    clearPlanSuccess,
    clearSelectedPlan,
} = planSlice.actions

export default planSlice.reducer