import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authProvider";
import axios from "../api/axios";
import moment from "moment";

const DEVICES_URL = "/devices/display-rented";

const RentedList = () => {
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

  const returnDevice = async () => {};

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
            <div className="namereturn-wrapper">
              <button className="btn btn-sort">
                <p>Name &amp; Company</p>
                <i className="fa-solid fa-arrow-up"></i>
              </button>
            </div>
            <div className="returndate-wrapper">
              <button className="btn btn-sort">Date</button>
            </div>
            <div className="return-wrapper">
              <p>Return</p>
            </div>
          </article>
        </div>
        <div className="deviceslist-wrapper">
          {devicesList.map((el) => {
            return (
              <article className="single-device" key={el._id}>
                <div className="rented-data">
                  <p className="device-name">{el.model}</p>
                </div>
                <div className="rented-date">
                  <p className="device-date">
                    {moment(el.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
                <div className="device-btn-wrapper">
                  <button className="btn btn-return">Return</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RentedList;
