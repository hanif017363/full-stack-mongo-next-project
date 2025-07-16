"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages, pathname }) => {
  const params = useSearchParams();
  const router = useRouter();

  const createQueryString = (name, value) => {
    let newParams = new URLSearchParams(params.toString());
    newParams.set(name, value);
    return newParams.toString();
  };

  return (
    <div className="flex justify-center">
      <nav>
        <ul className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <li key={page}>
                <button
                  onClick={() => {
                    router.push(
                      `${pathname}?${createQueryString("page", page)}`
                    );
                  }}
                  className="px-3 py-1 border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 font-medium rounded-md transition-colors"
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
