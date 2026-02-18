import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import categoryReducer from "../features/category/CategorySlice";
import adminReducer from "../features/admin/AdminSlice";
import bookingReducer from "../features/booking/BookingSlice";
import influencerReducer from "../features/influencer/InfluencerSlice";
import usersReducer from "../features/users/UserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    admin: adminReducer,
    booking: bookingReducer,
    influencer: influencerReducer,
    users: usersReducer,
  },
});
