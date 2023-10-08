import React from "react";
import { useSelector } from "react-redux";
import "./welcomeStyle.css";
import CargarNoticia from "../dashboard/formularios/CargarNoticia";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="welcome-container">
        <h1 className="title">Dashboard</h1>
        <h2 className="subtitle">
          Welcome Back <strong>{user && user.name}</strong>
        </h2>
      </div>
      <CargarNoticia />
    </div>
  );
};

export default Welcome;
