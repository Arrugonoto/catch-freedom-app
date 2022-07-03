import { useState, useContext, useRef } from "react";
import AuthContext from "../context/authProvider";
import axios from "../api/axios";

const CREATE_URL = "/devices";

const NewDeviceMenu = ({ closeDeviceMenu }) => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    model: "",
    manufacturer: "",
    platform: "",
    build_number: undefined,
    serial_number: "",
    version: undefined,
  });

  const {
    model,
    manufacturer,
    platform,
    build_number,
    serial_number,
    version,
  } = formData;

  const confirmationModal = useRef(null);

  const clearFields = () => {
    setFormData({
      model: "",
      manufacturer: "",
      platform: "",
      build_number: null,
      serial_number: "",
      version: null,
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const displayConfirmation = () => {
    confirmationModal.current.classList.add("display");
    setTimeout(() => {
      confirmationModal.current.classList.add("show");
    }, 100);

    setTimeout(() => {
      confirmationModal.current.classList.remove("show");
    }, 5100);

    setTimeout(() => {
      confirmationModal.current.classList.remove("display");
    }, 5500);
  };

  const addNewDevice = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        CREATE_URL,
        JSON.stringify({
          model,
          manufacturer,
          platform,
          build_number,
          serial_number,
          version,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      clearFields();
      displayConfirmation();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="new-device-container">
      <div className="form-wrapper">
        <h2>Add new device to assortment</h2>
        <form onSubmit={addNewDevice} className="new-device-form">
          <fieldset>
            <label htmlFor="model">
              <p>Model</p>
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={model}
              placeholder="Samsung Galaxy S8 Plus"
              onChange={onChange}
              required
            />
            <label htmlFor="manufacturer">
              <p>Manufacturer</p>
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={manufacturer}
              placeholder="Dell"
              onChange={onChange}
              required
            />
            <label htmlFor="platform">
              <p>Platform (OS)</p>
            </label>
            <input
              type="text"
              id="platform"
              name="platform"
              value={platform}
              placeholder="webOS"
              onChange={onChange}
            />
            <label htmlFor="build_number">
              <p>Build number</p>
            </label>
            <input
              type="number"
              id="build_number"
              name="build_number"
              value={build_number}
              placeholder="102"
              onChange={onChange}
            />
            <label htmlFor="serial_number">
              <p>Serial number</p>
            </label>
            <input
              type="text"
              id="serial_number"
              name="serial_number"
              value={serial_number}
              placeholder="pEekWH7zGxVITv6NTa5KHjLSwr5Ie4"
              onChange={onChange}
              required
            />
            <label htmlFor="version">
              <p>Version</p>
            </label>
            <input
              type="number"
              id="version"
              name="version"
              value={version}
              placeholder="843"
              onChange={onChange}
              required
            />
            <button type="submit" className="btn btn-submit-device">
              Add new device
            </button>
          </fieldset>
        </form>
      </div>
      <div className="btn-close-wrapper">
        <button
          onClick={() => {
            closeDeviceMenu(false);
          }}
          className="btn btn-close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div ref={confirmationModal} className="modal-container">
        <article className="modal-wrapper">
          <h2>Device added to assortment</h2>
        </article>
      </div>
    </section>
  );
};

export default NewDeviceMenu;
