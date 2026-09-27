import { configureStore } from "@reduxjs/toolkit";
import addonCategoryReducer from "./slices/addonCategorySlice";
import addonReducer from "./slices/addonSlice";
import appReducer from "./slices/appSlice";
import companyReducer from "./slices/companySlice";
import locationReducer from "./slices/locationSlice";
import menuAddonCategoryReducer from "./slices/menuAddonCategorySlice";
import menuCategoryMenuReducer from "./slices/menuCategoryMenuSlice";
import menuCategoryReducer from "./slices/menuCategorySlice";
import menuReducer from "./slices/menuSlice";
import tableReducer from "./slices/tableSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    // app all data
    app: appReducer,
    // current use data
    company: companyReducer,
    location: locationReducer,
    table: tableReducer,
    menu: menuReducer,
    menuCategory: menuCategoryReducer,
    addonCategory: addonCategoryReducer,
    addon: addonReducer,
    // join tables data
    menuCategoryMenu: menuCategoryMenuReducer,
    menuAddonCategory: menuAddonCategoryReducer,
    // theme mode
    theme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
