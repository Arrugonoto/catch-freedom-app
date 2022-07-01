import { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../context/authProvider";
import axios from "../api/axios";
import moment from "moment";
import { AdminLoader } from "./Loaders";

const DEVICES_URL = "/devices";

const DeviceListAdmin = ({ displayDeviceMenu }) => {
  const { auth } = useContext(AuthContext);
  const [devicesList, setDevicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDevicesList = async () => {
    try {
      const response = await axios.get(DEVICES_URL, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      const dataFromResponse = await response.data;

      setDevicesList([...dataFromResponse]);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  const sendToRepair = async (device_id) => {
    try {
      const response = await axios.put(
        `${DEVICES_URL}/repair/${device_id}`,
        "",
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDeviceFromList = async (device_id) => {
    try {
      const response = await axios.delete(`${DEVICES_URL}/${device_id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createNewDevice = async () => {
    displayDeviceMenu(true);
  };

  useEffect(() => {
    getDevicesList();
  }, [devicesList]);

  return (
    <section className="devices-admin-container">
      <div className="header-wrapper">
        <h1>Manage</h1>
        <button
          onClick={() => {
            createNewDevice();
          }}
          className="btn btn-new-device"
        >
          <p>New device</p> <i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
      <div className="devices-list-container">
        <div className="devices-menu-container">
          <div className="menu-title-wrapper">
            <p>Name &amp; Company</p>
          </div>
          <div className="menu-title-wrapper">
            <p>Date</p>
          </div>
          <div className="menu-title-wrapper">
            <p>Availability</p>
          </div>
          <div className="menu-status-wrapper">
            <p>Status</p>
          </div>
          <div className="menu-action-wrapper">
            <p>Perform action</p>
          </div>
        </div>
        <div className="list-wrapper">
          {loading ? (
            <AdminLoader />
          ) : (
            devicesList.map((el) => {
              return (
                <article className="single-device-manage" key={el._id}>
                  <div className="device-wrapper">
                    <p>{el.model}</p>
                  </div>
                  <div className="device-wrapper">
                    <p>{moment(el.createdAt).format("DD-MM-YYYY")}</p>
                  </div>
                  <div className="device-wrapper">
                    {el.availability === "Available" ? (
                      <p className="available">&#9679; Available</p>
                    ) : (
                      <p className="not-available">&#9679; Not available</p>
                    )}
                  </div>
                  <div className="device-status-wrapper">
                    <p
                      className={`${
                        el.status === "OK" ? "status-working" : "status-repair"
                      }`}
                    >
                      {el.status}
                    </p>
                  </div>
                  <div className="device-btns-wrapper">
                    {el.availability === "Available" ? (
                      <button
                        onClick={() => {
                          sendToRepair(el._id);
                        }}
                        className="btn btn-repair"
                      >
                        <p>Send to repair</p>
                        <i className="fa-solid fa-screwdriver"></i>
                      </button>
                    ) : (
                      <button className="btn-disabled" disabled>
                        <p>Send to repair</p>
                        <i className="fa-solid fa-screwdriver"></i>
                      </button>
                    )}
                    {el.availability === "Available" ? (
                      <button
                        onClick={() => {
                          deleteDeviceFromList(el._id);
                        }}
                        className="btn btn-delete"
                      >
                        <p>Delete</p>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    ) : (
                      <button className="btn btn-disabled">
                        <p>Delete</p>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default DeviceListAdmin;
