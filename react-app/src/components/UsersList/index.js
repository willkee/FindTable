import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../store/users';

function UsersList() {
  const users = useSelector(state => Object.values(state.users))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allUsers())
  }, [dispatch]);

  const userComponents = users.map((user) => {
    return (
      <tr key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.id}</NavLink>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.business_owner ? "Yes" : "No"}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1>User List: </h1>
      <table>
          <thead>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Business Owner</th>
          </thead>
        <tbody>
          {userComponents}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
