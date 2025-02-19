import { useState } from "react";

const RangeSelect = ({ onRadiusChange }) => {
  const [radius, setRadius] = useState(2500);

  return (
    <div>
      <h2 className="font-bold text-white">Select Radius (In Meter)</h2>
      <input
        type="range"
        className="bg-gray-200 rounded-lg appearance-none cursor-pointer h-2 w-full"
        min="500"
        max="5000"
        step="500"
        onChange={(e) => {
          setRadius(e.target.value);
          onRadiusChange(e.target.value);
        }}
        defaultValue={radius}
      />
      <label className="text-gray-800 text-sm">{radius} in Meters</label>
    </div>
  );
};

export default RangeSelect;
