export const googleMapsLoaderConfig = {
  id: "google-map-script",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  mapIds: ["58e3249b15ac0250"],
  libraries: ["places"], // Include all libraries you might use
};
