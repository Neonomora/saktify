"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

const categories = ["ALL", "TRKJ", "BD", "MKSP"];
const subCategories = ["ALL", "A1", "B1", "C1"];

export default function Filter() {
  const [classCat, setClassCat] = useState("ALL");
  const [subClassCat, setSubClassCat] = useState("ALL");
  const router = useRouter();
  const searchParams = useSearchParams();

    useEffect(() => {
    const classFilter = searchParams.get("classFilter");
    const subClassFilter = searchParams.get("subClassFilter");
    if (classFilter) setClassCat(classFilter);
    if (subClassFilter) setSubClassCat(subClassFilter);
  }, [searchParams]);

  const handleFilter = (newClassCat, newSubClassCat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newClassCat && newClassCat !== "ALL") params.set("classFilter", newClassCat);
    else params.delete("classFilter");
    if (newSubClassCat && newSubClassCat !== "ALL") params.set("subClassFilter", newSubClassCat);
    else params.delete("subClassFilter");

    router.push(`/class?${params.toString()}`);
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`mx-2 w-18 py-2 rounded-xl shadow-sm ${cat === classCat ? "border border-gray-300" : "bg-white"}`}
            onClick={() => {
              setClassCat(cat);
              handleFilter(cat, subClassCat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mb-6 mx-auto">
        {subCategories.map((scat) => (
          <button
            key={scat}
            className={`mx-2 w-18 py-2 rounded-xl shadow-sm ${scat === subClassCat ? "border border-gray-300" : "bg-white"}`}
            onClick={() => {
              setSubClassCat(scat);
              handleFilter(classCat, scat);
            }}
          >
            {scat}
          </button>
        ))}
      </div>
    </div>
  );
}
