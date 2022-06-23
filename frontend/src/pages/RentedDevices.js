import React from "react";
import Menu from "../components/Menu";
import RentedList from "../components/RentedList";

const RentedDevices = () => {
  return (
    <section className="renteddevices-container">
      <Menu />
      <RentedList />
    </section>
  );
};

export default RentedDevices;
