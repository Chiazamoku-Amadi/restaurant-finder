import Data from "@/Shared/Data";
import { useState } from "react";

const SelectRating = ({ onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState([]);

  const onSelectRating = (isChecked, value) => {
    if (isChecked) {
      setSelectedRating([...selectedRating, value]);
    } else {
      setSelectedRating(selectedRating.filter((n) => n !== value));
    }

    onRatingChange(selectedRating);
  };

  return (
    <div>
      <h2 className="font-bold text-white">Select Rating</h2>
      <div>
        {Data.ratingList.map((item, index) => (
          <div key={index} className="flex justify-between">
            <label>{item?.icon}</label>
            <input
              type="checkbox"
              onChange={(e) => onSelectRating(e.target.checked, item?.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRating;
