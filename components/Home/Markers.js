import { MarkerF, OverlayView } from "@react-google-maps/api";
import BusinessItem from "./BusinessItem";
import { useContext } from "react";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";

const Markers = ({ business }) => {
  const { selectedBusiness, setSelectedBusiness } = useContext(
    SelectedBusinessContext
  );

  return (
    <div>
      <MarkerF
        position={business.geometry.location}
        onClick={() => setSelectedBusiness(business)}
        icon={{
          url: "/restaurant-location.png",
          scaledSize: {
            width: 10,
            height: 10,
          },
        }}
      >
        {selectedBusiness.reference == business.reference ? (
          <OverlayView
            position={business.geometry.location}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="ml-[-90px] mt-[-215px]">
              <BusinessItem business={business} showDirection={true} />
            </div>
          </OverlayView>
        ) : null}
      </MarkerF>
    </div>
  );
};

export default Markers;
