import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import DeviceListAdmin from "../components/DeviceListAdmin";
import NewDeviceMenu from "../components/NewDeviceMenu";

const AdminPanel = () => {
  const [displayNewDeviceMenu, setDisplayNewDeviceMenu] = useState(false);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.email) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <section className="admin-panel-container">
      <Menu />
      {displayNewDeviceMenu ? (
        <NewDeviceMenu closeDeviceMenu={setDisplayNewDeviceMenu} />
      ) : (
        <DeviceListAdmin displayDeviceMenu={setDisplayNewDeviceMenu} />
      )}
    </section>
  );
};

export default AdminPanel;
