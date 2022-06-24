import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authProvider";
import axios from "../api/axios";
import moment from "moment";

const DEVICES_URL = "/devices";

const DevicesList = () => {
  const { auth } = useContext(AuthContext);
  const [devicesList, setDevicesList] = useState([]);

  const getDevicesList = async () => {
    try {
      const response = await axios.get(DEVICES_URL, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      const dataFromResponse = await response.data;

      setDevicesList([...dataFromResponse]);
    } catch (error) {
      console.error(error);
    }
  };

  const rentDevice = async (device_id, req, res) => {
    try {
      const response = await axios.put(`${DEVICES_URL}/rent/${device_id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log(req);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevicesList();
  }, [devicesList]);

  return (
    <section className="devices-container">
      <div className="devices-title">
        <h1>Devices list</h1>
      </div>
      <div className="devices-wrapper">
        <div className="devices-sorting-bar">
          <article className="sorting-wrapper">
            <div className="name-wrapper">
              <button className="btn btn-sort">
                <p>Name &amp; Company</p>
                <i className="fa-solid fa-arrow-up"></i>
              </button>
            </div>
            <div className="name-wrapper">
              <button className="btn btn-sort">Date</button>
            </div>
            <div className="name-wrapper">
              <button className="btn btn-sort">Availability</button>
            </div>
            <div className="rent-wrapper">
              <p>Rent</p>
            </div>
          </article>
        </div>
        <div className="deviceslist-wrapper">
          {devicesList.map((el) => {
            return (
              <article className="single-device" key={el._id}>
                <div className="device-data">
                  <p className="device-name">{el.model}</p>
                </div>
                <div className="device-data">
                  <p className="device-date">
                    {moment(el.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
                <div className="device-data">
                  {el.availability === "Available" ? (
                    <p className="device-available">&#9679; Available</p>
                  ) : (
                    <p className="device-rented">&#9679; Not available</p>
                  )}
                </div>
                <div className="device-btn-wrapper">
                  {el.availability === "Available" ? (
                    <button
                      onClick={() => {
                        rentDevice(el._id);
                      }}
                      className="btn-rent"
                    >
                      <p>Rent</p>
                    </button>
                  ) : (
                    <button className="btn-rented" disabled>
                      <p>Rent</p>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DevicesList;
