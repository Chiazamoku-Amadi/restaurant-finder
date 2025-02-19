"use client";

import { Amaranth } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import HeaderNavBar from "@/components/HeaderNavBar";
import { useEffect, useState } from "react";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";

const amaranth = Amaranth({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [userLocation, setUserLocation] = useState({});
  const [selectedBusiness, setSelectedBusiness] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <html lang="en">
      <body className={amaranth.className}>
        {/* Exposing the session context, <SessionProvider />, at the top level of the application */}
        {/* This will enable us to be able to use "useSession". Instances of "useSession" will then have access to the session data and status */}
        {/* The <SessionProvider /> also takes care of keeping the session updated and synced between browser tabs and windows */}
        <Provider>
          <SelectedBusinessContext.Provider
            value={{ selectedBusiness, setSelectedBusiness }}
          >
            <UserLocationContext.Provider
              value={{ userLocation, setUserLocation }}
            >
              <div className="md:overflow-hidden h-full md:h-screen">
                <HeaderNavBar />
                {children}
              </div>
            </UserLocationContext.Provider>
          </SelectedBusinessContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
