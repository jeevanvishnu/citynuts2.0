import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AdminAuthState {
  isAuthenticated: boolean;
  admin: {
    id: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminAuthState = {
  isAuthenticated: false,
  admin: null,
  loading: false,
  error: null,
};

// Async Thunks for API Calls
export const loginAdmin = createAsyncThunk(
  'adminAuth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }
       
      return { id: '1', email: credentials.email, message: data.message };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  'adminAuth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await fetch('http://localhost:4000/admin/logout', { 
        method: 'POST', 
        credentials: 'include' 
      });
      return true;
    } catch (error: any) {
      return rejectWithValue('Logout failed');
    }
  }
);

export const checkAuthAdmin = createAsyncThunk(
  'adminAuth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/admin/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await response.json();
      if (!response.ok || !data.success) {
        return rejectWithValue('Not authenticated');
      }
      return data.admin;
    } catch (error: any) {
      return rejectWithValue('Check auth failed');
    }
  }
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginAdmin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.admin = { id: action.payload.id, email: action.payload.email };
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutAdmin.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      state.loading = false;
      state.error = null;
    });

    // Check Auth
    builder.addCase(checkAuthAdmin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    });
    builder.addCase(checkAuthAdmin.rejected, (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    });
  },
});

export default adminAuthSlice.reducer;
