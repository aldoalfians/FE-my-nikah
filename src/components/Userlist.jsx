import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "./Table";
import { Constant } from "../utils/constant";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const { userToken } = useSelector((state) => state.auth);

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
    const response = await axios.get(`${Constant.BASE_URL}/users`, config);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
    };
    await axios.delete(`${Constant.BASE_URL}/users/${userId}`, config);
    getUsers();
  };

  console.log(users);

  return (
    <div>
      <h1 className="title">Users</h1>
      <Table columns={columns} data={users} strDelete="users" func={getUsers} />
    </div>
  );
};

export default Userlist;
