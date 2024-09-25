import { useEffect } from "react"
import AddUser from "./AddUser"
import type { User } from "./usersSlice";
import { fetchUsersAsync } from "./usersSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { RootState } from "../../app/store"

const Users = () => {

  // get the data (isLoading, isError, userList) from the store and display them
  const usersState = useAppSelector((state: RootState) => {
    return state.users;
  })

  // in order to fetch the data from rest api and then move it to the store -- we must dispatch the action
  const dispatch =  useAppDispatch();

  useEffect(() => {
    // In order to update the store  -- we must dispatch the action
    dispatch(fetchUsersAsync())
  }, [])


  return (
    <div className="row">
      <h1>User Management</h1>
      <div className="col-md-4">
        <AddUser />
      </div>

      <div className="col-md-8">
        <h2>List Users</h2>
        {/* Showing the loader */}
        {usersState.isLoading && <div className="spinner spinner-border"></div>}

        {/* is error occurred */}
        {usersState.isError && (
          <div className="alert alert-danger">Some error occurred</div>
        )}

        {/* is we get the usersList data */}
        {usersState.usersList.length > 0 && (
          <div className="row">
            {usersState.usersList.map((user: User) => (
              <div className="col-md-4" key={user.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      E-Mail:{user.email}
                    </h6>
                    <p className="card-text">Phone: {user.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
