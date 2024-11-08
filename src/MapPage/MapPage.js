import React from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";

import Marker from "./Marker";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import Messenger from "../Messenger/Messenger";
import VideoRooms from "../VideoRooms/VideoRooms";

//import 'dotenv/config';
import "./MapPage.css";

const MapPage = () => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);

  const defaultMapProps = {
    center: {
      lat: myLocation.lat,
      lng: myLocation.lng,
    },
    zoom: 11,
  };

  const googleMapsKey = process.env.REACT_APP_GOOGLEMAPSKEY;

  console.log(`googleMapsKey=${googleMapsKey}`);


  return (
    <div className="map_page_container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleMapsKey}` }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      >
        {onlineUsers.map((onlineUser) => {
          return (
            <Marker
              lat={onlineUser.coords.lat}
              lng={onlineUser.coords.lng}
              key={onlineUser.socketId}
              myself={onlineUser.myself}
              socketId={onlineUser.socketId}
              username={onlineUser.username}
              coords={onlineUser.coords}
            />
          );
        })}
      </GoogleMapReact>
      <Messenger />
      {
        cardChosenOption && (
          <UserInfoCard
            socketId={cardChosenOption.socketId}
            username={cardChosenOption.username}
            userLocation={cardChosenOption.coords}
          />
        )
      }
      <VideoRooms />
    </div >
  );
};

export default MapPage;
