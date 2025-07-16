"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { priceRanges } from "@/util/filterdata";
import Link from "next/link";

export default function ProductFilter() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = "/shop";

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/category`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Helper: Create query string
  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(name) && Array.isArray(value)) {
      name.forEach((key, i) => {
        params.set(key, value[i]);
      });
    } else {
      params.set(name, value);
    }

    // Reset to page 1 on any filter change
    params.set("page", 1);

    return params.toString();
  };

  // Helper: Remove filter(s)
  const removeFilters = (keys) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(keys)) {
      keys.forEach((key) => params.delete(key));
    } else {
      params.delete(keys);
    }

    params.set("page", 1);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Reusable styles
  const baseBtn =
    "px-4 py-1 text-sm rounded-full font-medium transition border";
  const activeBtn = `${baseBtn} bg-blue-600 text-white border-blue-600`;
  const inactiveBtn = `${baseBtn} bg-gray-100 text-gray-700 border-gray-300`;

  return (
    <div className="space-y-6 pr-2">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Filter Products</h2>
        <Link href="/shop" className="text-red-600 text-sm hover:underline">
          ✖ Clear All Filters
        </Link>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-md font-semibold text-blue-600 mb-2">💰 Price</h3>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => {
            const isActive =
              searchParams.get("minPrice") === String(range.min) &&
              searchParams.get("maxPrice") === String(range.max);

            return (
              <div key={range.label} className="flex items-center gap-1">
                <button
                  className={isActive ? activeBtn : inactiveBtn}
                  onClick={() =>
                    router.push(
                      `${pathname}?${createQueryString(
                        ["minPrice", "maxPrice"],
                        [range.min, range.max]
                      )}`
                    )
                  }
                >
                  {range.label}
                </button>
                {isActive && (
                  <button
                    onClick={() => removeFilters(["minPrice", "maxPrice"])}
                    className="text-red-500 font-bold text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-md font-semibold text-blue-600 mb-2">🗂 Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = searchParams.get("category") === c._id;

            return (
              <div key={c._id} className="flex items-center gap-1">
                <button
                  className={isActive ? activeBtn : inactiveBtn}
                  onClick={() =>
                    router.push(
                      `${pathname}?${createQueryString("category", c._id)}`
                    )
                  }
                >
                  {c.title}
                </button>
                {isActive && (
                  <button
                    onClick={() => removeFilters("category")}
                    className="text-red-500 font-bold text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
