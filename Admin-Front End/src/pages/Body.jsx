import React from "react";
import NavigationBar from "./NavigationBar";
import AddPlaces from "./AddPlaces";
import AddEvents from "./AddEvents";
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