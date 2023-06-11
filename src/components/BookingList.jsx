import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatDate, formatPrice } from "../utils";
import Table from "./Table";

const columns = [
  {
    title: "Name",
    dataIndex: "user",
    key: "user",
    render: (user) => user.name,
  },
  {
    title: "Jam",
    dataIndex: "hours",
    key: "hours",
  },
  {
    title: "Tanggal",
    dataIndex: "date",
    key: "date",
    render: formatDate,
  },
  {
    title: "Harga",
    dataIndex: "price",
    key: "price",
    render: (price) => (price === 0 ? "Gratis" : formatPrice(price)),
  },
  {
    title: "Tempat",
    dataIndex: "role",
    key: "role",
    render: (role) => (role === "out" ? "Di luar KUA" : "Di KUA"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) =>
      status.toLowerCase() === "pending" ? "Menunggu Persetujuan" : "Diterima",
  },
];

const BookingList = () => {
  const [booking, setBooking] = useState([]);
  const { userInfo, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getBooking();
  }, []);

  const getBooking = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
    };
    const response = await axios.get("http://localhost:5000/booking", config);
    setBooking(response.data);
  };

  console.log(booking);

  return (
    <div>
      <h1 className="title">Booking</h1>
      <h2 className="subtitle">Data Booking Pernikahan</h2>
      <Table
        columns={columns}
        data={booking}
        strDelete="booking"
        func={getBooking}
      />
    </div>
  );
};

export default BookingList;
