import React from "react";
import NavigationBar from "../NavBar/NavigationBar";
import AddPlaces from "../Place/AddPlaces";
import AddEvents from "../Event/AddEvents";
import Places from "../AddedPlaces/Places";
import "./Body.css";

const Body = () => {
  return (
    <div className="Body">
      <NavigationBar />
      <div className="">
        <AddPlaces />
        <AddEvents />
        <Places />
      </div>
    </div>
  );
};

export default Body;