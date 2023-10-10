import { useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import Welcome from "../../components/welcome/Welcome.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../Auth/authSlice.js";
import AddNews from "../../components/formularios/Notices/AddNotices/addNotices.jsx";

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
      <AddNews />
    </Layout>
  );
};

export default Dashboard;
