import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/Users/AddUser";

import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Booking from "./pages/Booking";
import { Suspense, lazy } from "react";

const UsersEdit = lazy(() => import("./pages/Users/EditUser"));
const BookingEdit = lazy(() => import("./pages/Booking/EditBooking"));

function App() {
  return (
    <main>
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/:id" element={<UsersEdit />} />
            <Route path="/products" element={<Products />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:id" element={<BookingEdit />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/:id" element={<EditProduct />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
