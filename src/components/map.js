import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationInfoBox from "./LocationInfoBox";

const LocationMarker = ({ onClick }) => (
  <div 
    onClick={onClick} 
    style={{ fontSize: "24px", cursor: "pointer" }}
  >
    🔥
  </div>
);

const Map = ({ eventData }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const markers = eventData.map((ev, index) => {
    if (ev.categories[0].id === "wildfires") {
      return (
        <LocationMarker
          key={index}
          lat={ev.geometry[0].coordinates[1]} // latitude
          lng={ev.geometry[0].coordinates[0]} // longitude
          onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
        />
      );
    }
    return null;
  });

  return (
    <div className="map" style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAU-1Ue3zuEWIKrQ3AxlODysUOMwO8Zd8E" }}
        defaultCenter={{ lat: 18.5346, lng: 73.8786 }}
        defaultZoom={6}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

export default Map;
