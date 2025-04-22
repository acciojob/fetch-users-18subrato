import React, { useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response.data.data || []);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <button className="btn" onClick={fetchUsers}>Get User List</button>

      {loading && <p>Loading...</p>}

      {!loading && hasFetched && users.length === 0 && (
        <p className="no-data">No data found</p>
      )}
        {users.length == 0  && <p>No data found</p>}
      {!loading && users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td><img src={user.avatar} alt="avatar" width="50" /></td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
