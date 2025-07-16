export const dynamic = "force-dynamic";

import Pagination from "@/app/components/Pagination";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

async function getProductsForShop(upd) {
  const searchQuery = new URLSearchParams({
    page: upd?.page || 1,
    minPrice: upd?.minPrice || "",
    maxPrice: upd?.maxPrice || "",
    category: upd?.category || "",
  }).toString();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/filter?${searchQuery}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return { products: [], currentPage: 1, totalPages: 1 };
  }
}

export default async function Shop({ searchParams }) {
  const { page, minPrice, maxPrice, category } = await searchParams;
  const upd = { page, minPrice, maxPrice, category };

  const { products, currentPage, totalPages } = await getProductsForShop(upd);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4 max-h-[90vh] overflow-y-auto">
            <ProductFilter />
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            <h4 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Shop Latest Products
            </h4>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <h4 className="text-center text-gray-500">No products found</h4>
            )}

            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pathname="/shop"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
