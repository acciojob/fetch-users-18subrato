// src/UserList.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './UserList.css'; // optional styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.get('https://reqres.in/api/users');
      const data = response.data.data;
      if (data.length > 0) {
        setUsers(data);
      } else {
        setUsers([]);
        setErrorMsg('No users found.');
      }
    } catch (error) {
      setErrorMsg('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <button className="btn" onClick={fetchUsers}>Get User List</button>

      {loading && <p>Loading...</p>}
      {errorMsg && <p>{errorMsg}</p>}

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
