"use client";

import BusinessList from "@/components/Home/BusinessList";
import CategoryList from "@/components/Home/CategoryList";
import GoogleMapView from "@/components/Home/GoogleMapView";
import RangeSelect from "@/components/Home/RangeSelect";
import SelectRating from "@/components/Home/SelectRating";
import SkeletonLoading from "@/components/Home/SkeletonLoading";
import { UserLocationContext } from "@/context/UserLocationContext";
import GlobalApi from "@/Shared/GlobalApi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(2500);
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg, setBusinessListOrg] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession(); // Uses the useSession hook to get the current session data
  const router = useRouter(); // Uses the useRouter hook to get the router object
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  useEffect(() => {
    // If user is not logged in, redirect them to the signin page
    if (!session?.user) {
      router.replace("/signin");
    }
  }, [session]);

  useEffect(() => {
    // Call getGooglePlace API whenever category or radius changes
    getGooglePlace();
  }, [category, radius]);

  const getGooglePlace = () => {
    if (!category) {
      setBusinessList([]); // Clear business list
      setLoading(false);
      return; // Stop execution if no category is selected
    }

    setLoading(true);

    GlobalApi.getGooglePlace(
      category,
      radius,
      userLocation.lat,
      userLocation.lng
    ).then((res) => {
      setBusinessList(res.data.product.results);
      setBusinessListOrg(res.data.product.results);
      setLoading(false);
    });
  };

  const onRatingChange = (rating) => {
    if (rating.length == 0) {
      setBusinessList(businessListOrg);
    }

    const result = businessList.filter((item) => {
      for (let index = 0; index < rating; index++) {
        if (item.rating >= rating[index]) {
          return true;
        }

        return false;
      }
    });
  };

  return (
    <>
      {session?.user ? (
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-4 md:space-y-0 md:h-[90vh]">
          <div className="flex flex-col justify-between space-y-4 bg-[#1e72bc] bg-opacity-80 p-4">
            <div className="space-y-5">
              <CategoryList onCategoryChange={(value) => setCategory(value)} />
              <RangeSelect onRadiusChange={(value) => setRadius(value)} />
              <SelectRating onRatingChange={(value) => onRatingChange(value)} />
            </div>

            <p
              className="flex gap-1 font-bold text-white cursor-pointer"
              onClick={() => signOut()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M12.232 3.25H9.768c-.813 0-1.469 0-2 .043c-.546.045-1.026.14-1.47.366a3.75 3.75 0 0 0-1.64 1.639c-.226.444-.32.924-.365 1.47c-.043.531-.043 1.187-.043 2v6.464c0 .813 0 1.469.043 2c.045.546.14 1.026.366 1.47a3.75 3.75 0 0 0 1.639 1.64c.444.226.924.32 1.47.365c.531.043 1.187.043 2 .043h2.464c.813 0 1.469 0 2-.043c.546-.045 1.026-.14 1.47-.366a3.75 3.75 0 0 0 1.64-1.639c.226-.444.32-.924.365-1.47c.043-.531.043-1.187.043-2V15a.75.75 0 0 0-1.5 0v.2c0 .852 0 1.447-.038 1.91c-.038.453-.107.714-.207.912c-.216.423-.56.767-.983.983c-.198.1-.459.17-.913.207c-.462.037-1.056.038-1.909.038H9.8c-.852 0-1.447 0-1.91-.038c-.453-.038-.714-.107-.911-.207a2.25 2.25 0 0 1-.984-.983c-.1-.198-.17-.459-.207-.913c-.037-.462-.038-1.057-.038-1.909V8.8c0-.852 0-1.447.038-1.91c.037-.453.107-.714.207-.911a2.25 2.25 0 0 1 .984-.984c.197-.1.458-.17.912-.207c.462-.037 1.057-.038 1.909-.038h2.4c.853 0 1.447 0 1.91.038c.453.037.714.107.912.207c.423.216.767.56.983.984c.1.197.17.458.207.912c.037.462.038 1.057.038 1.909V9a.75.75 0 0 0 1.5 0v-.232c0-.813 0-1.469-.043-2c-.045-.546-.14-1.026-.366-1.47a3.75 3.75 0 0 0-1.639-1.64c-.444-.226-.924-.32-1.47-.365c-.531-.043-1.187-.043-2-.043"
                />
                <path
                  fill="#ffffff"
                  d="M12.47 8.47a.75.75 0 1 1 1.06 1.06l-1.72 1.72H20a.75.75 0 0 1 0 1.5h-8.19l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06z"
                />
              </svg>
              Sign Out
            </p>
          </div>

          <div className="flex flex-col justify-between pb-4 col-span-3 h-full">
            <div className="md:h-[60vh]">
              <GoogleMapView businessList={businessList} />
            </div>

            <div className="relative md:absolute md:bottom-4 self-center overflow-hidden w-[90%] md:w-[72%] md:h-[23vh]">
              {loading ? (
                <div className="flex gap-6">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <SkeletonLoading key={item} />
                  ))}
                </div>
              ) : businessList.length > 0 ? (
                <BusinessList businessList={businessList} />
              ) : (
                <p className="text-center text-[#1e72bc]">
                  Select a Food Type to display restaurants here!
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>Redirecting to signin...</p>
        </div>
      )}
    </>
  );
}
