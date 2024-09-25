import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import type { RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export interface User {
  id?: number
  name: string
  email: string
  phone: string
}

export interface UserState {
  isLoading: boolean
  isError: boolean
  usersList: User[]
}

const initialState: UserState = {
  isLoading: false,
  isError: false,
  usersList: [],
}

/*
  A function that accepts an initial state, 
  an object of reducer functions, 
  and a "slice name",
  and automatically generates action creators 
  and action types that correspond to the reducers and state.
*/

// Writing a fn to connect to rest api to fetch all users
export const fetchUsersAsync = createAsyncThunk<
  User[], // return type,
  void, // for get method -- we are not passing any data to rest api. so it must be void,
  { state: RootState }
>(
  "users/fetchUsers", // action type a.k.a typePrefix
  async _ => {
    console.log("HITTING API");
    // should we pass anything from component to rest api? no
    // first param (_)  represents nothing to pass to axios call

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    )
    return response.data // avail it in action.payload
  },
)

export const addUserAsync = createAsyncThunk(
  "users/addUser",
  async(user: any) => { // user is the form data coming from component
    console.log("HITTING API FOR ADDING USER");
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      user,
    )

    return response.data;
  }
)

// using the createSlice function from redux toolkit -- I am creating a slice for the users feature
export const usersSlice = createAppSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    // if you want to update the store only locally.
    // w/o connecting to rest api -- if you want to update the store locally.
  },
  extraReducers: builder => {
    // if you want to update the store with rest api.
    builder
      .addCase(fetchUsersAsync.pending, state => {
        console.log("HITTING pending")
        // state is store data for this feaure
        // console.log(state);
        state.isLoading = true
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        console.log("HITTING fulfilled")
        // action will have the data from rest api
        state.isLoading = false
        state.usersList = action.payload
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        console.log("HITTING rejected")
        // action will have the error message
        state.isLoading = false
        state.isError = true
      })
      .addCase(addUserAsync.pending, state => {
        // state is store data for this feaure
        console.log("HITTING pending of addUser")
        state.isLoading = true
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        console.log("HITTING fulfilled of AddUser")
        state.isLoading = false
        state.usersList = [...state.usersList, action.payload]
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        console.log("HITTING rejected of AddUser")
        state.isLoading = false
        state.isError = true
      })
  },
})

export default usersSlice.reducer

/*
Promise States 
---
while api call is in progress -- pending 
once api call is successful -- fulfilled 
once api call is failed -- rejected

*/
