import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `https://ecommercemern-1-iiys.onrender.com/api/common/feature/get`
    );
    return response.data;
  }
);

// Add image
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `https://ecommercemern-1-iiys.onrender.com/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

// Remove image
export const removeFeatureImage = createAsyncThunk(
  "/order/removeFeatureImage",
  async (imageId) => {
    // Adjust the URL and payload according to your backend API.
    const response = await axios.delete(
      `https://ecommercemern-1-iiys.onrender.com/api/common/feature/remove/${imageId}`
    );
    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(removeFeatureImage.fulfilled, (state, action) => {
        // Optimistically update the state, or refetch as in your UI.
        // Here, we'll remove img by id:
        state.featureImageList = state.featureImageList.filter(
          (img) => img._id !== action.meta.arg && img.id !== action.meta.arg
        );
      });
  },
});

export default commonSlice.reducer;
