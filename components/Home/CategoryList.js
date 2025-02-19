import Data from "@/Shared/Data";
import Image from "next/image";
import { useState } from "react";

const CategoryList = ({ onCategoryChange }) => {
  const [categoryList, setCategoryList] = useState(Data.CategoryListData);
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <div className="space-y-2">
      <h2 className="font-bold text-white">Select Food Type</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categoryList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center gap-1 ${
              selectedCategory == index
                ? "grayscale-0 border border-blue-400"
                : null
            } bg-gray-100 p-2 rounded-lg grayscale hover:grayscale-0 cursor-pointer w-full`}
            onClick={() => {
              setSelectedCategory(index);
              onCategoryChange(item.value);
            }}
          >
            <Image
              src={item?.icon}
              alt={item?.name}
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xs text-center">{item?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
