import { useContext, useEffect } from "react";
import AuthContext from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import DevicesList from "../components/DevicesList";

const Dashboard = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.email) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <section className="dashboard-container">
      <Menu />
      <DevicesList />
    </section>
  );
};

export default Dashboard;
