import { useContext, useEffect } from "react";
import AuthContext from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import RentedList from "../components/RentedList";

const RentedDevices = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.email) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <section className="renteddevices-container">
      <Menu />
      <RentedList />
    </section>
  );
};

export default RentedDevices;
