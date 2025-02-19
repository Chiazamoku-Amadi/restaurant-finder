const { createContext } = require("react");

export const UserLocationContext = createContext({
  userLocation: { lat: 0, lng: 0 }, // Default values
  setUserLocation: () => {}, // Placeholder function to avoid errors
});
