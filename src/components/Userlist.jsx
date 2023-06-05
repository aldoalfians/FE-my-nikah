import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const { userInfo, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
    };
    const response = await axios.get("http://localhost:5000/users", config);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
    };
    await axios.delete(`http://localhost:5000/users/${userId}`, config);
    getUsers();
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <Link to="/users/add" className="button is-primary mb-2">
        Tambah User
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
