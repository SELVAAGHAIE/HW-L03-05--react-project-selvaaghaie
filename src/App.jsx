import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import BookOverview from "./components/BookOverview";
import BookInfo from "./components/BookInfo";
import AddBook from "./components/AddBook";
import Header from "./components/Header";
import EditBook from "./components/EditBook";

const AuthGuard = ({ children }) => {
  const authToken = localStorage.getItem("token");
  return authToken ? children : <Navigate to="/login" />;
};

const MainApp = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />

        <Route
          path="/"
          element={
            <AuthGuard>
              <BookOverview />
            </AuthGuard>
          }
        />
        <Route
          path="/books/:id"
          element={
            <AuthGuard>
              <BookInfo />
            </AuthGuard>
          }
        />
        <Route
          path="/create"
          element={
            <AuthGuard>
              <AddBook />
            </AuthGuard>
          }
        />
        <Route
          path="/update/:id"
          element={
            <AuthGuard>
              <EditBook />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default MainApp;
