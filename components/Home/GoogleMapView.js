import { googleMapsLoaderConfig } from "@/app/utils/googleMapsLoader";
import { UserLocationContext } from "@/context/UserLocationContext";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import Markers from "./Markers";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";

const GoogleMapView = ({ businessList }) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { selectedBusiness, setSelectedBusiness } = useContext(
    SelectedBusinessContext
  );
  const [map, setMap] = useState();

  const containerStyle = {
    width: "100%",
    height: "62vh",
  };

  useEffect(() => {
    if (map && selectedBusiness) {
      map.panTo(selectedBusiness.geometry.location);
    }
  }, [selectedBusiness]);

  const { isLoaded } = useJsApiLoader(googleMapsLoaderConfig);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          selectedBusiness.name
            ? selectedBusiness.geometry.location
            : userLocation
        }
        options={{ mapId: googleMapsLoaderConfig.mapIds[0] }}
        zoom={13}
        onLoad={(map) => setMap(map)}
      >
        <MarkerF
          position={userLocation}
          icon={{
            url: "/user-location.png",
            scaledSize: {
              width: 50,
              height: 50,
            },
          }}
        />

        {businessList.map((item, index) => (
          <Markers business={item} key={index} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default GoogleMapView;
