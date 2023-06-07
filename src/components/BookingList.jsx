import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

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

  const deleteBooking = async (bookId) => {
    await axios.delete(`http://localhost:5000/booking/${bookId}`);
    getBooking();
  };

  return (
    <div>
      <h1 className="title">Booking</h1>
      <h2 className="subtitle">Data Booking Pernikahan</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Jam</th>
            <th>Tanggal</th>
            <th>Harga</th>
            <th>Tempat</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {booking?.map((book, index) => (
            <tr key={book.uuid}>
              <td>{index + 1}</td>
              <td>{book.user.name}</td>
              <td>{book.hours}</td>
              <td>{book.date.substr(0, 10)}</td>
              <td>{book.price === 0 ? "Gratis" : book.price}</td>
              <td>{book.role === "in" ? "Di dalam KUA" : "Di luar KUA"}</td>
              <td>{book.status}</td>
              <td>
                <Link
                  to={`/booking/edit/${book.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBooking(book.uuid)}
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

export default BookingList;
