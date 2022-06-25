import React from "react";

const NewDeviceMenu = () => {
  return (
    <section className="new-device-container">
      <div className="form-wrapper">
        <form className="new-device-form">
          <fieldset>
            <label htmlFor="">
              <p>Model</p>
            </label>
            <input type="text" />
            <label htmlFor="">
              <p>Manufacturer</p>
            </label>
            <input type="text" />
            <label htmlFor="">
              <p>Platform (OS)</p>
            </label>
            <input type="text" />
            <label htmlFor="">
              <p>Build number</p>
            </label>
            <input type="number" />
            <label htmlFor="">
              <p>Serial number</p>
            </label>
            <input type="text" />
            <label htmlFor="">
              <p>Version</p>
            </label>
            <input type="number" />
            <button className="btn btn-submit-device">Add new device</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default NewDeviceMenu;
