import React from "react";
import NavigationBar from "../Nav/NavigationBar";
import AddPlaces from "../Place/AddPlaces";
import AddEvents from "../Event/AddEvents";
import "./Body.css";

const Body = () => {
  return (
    <div className="Body">
      <NavigationBar />
      <div className="">
        <AddPlaces />
        <AddEvents />
      </div>
    </div>
  );
};

export default Body;