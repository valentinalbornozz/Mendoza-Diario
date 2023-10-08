import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Welcome from "../../components/welcome/welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../Auth/authSlice.js";
import CargarNoticia from "../../components/dashboard/formularios/CargarNoticia";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <Welcome />
      <CargarNoticia />
    </Layout>
  );
};

export default Dashboard;
