import ProductCard from "./components/ProductCard";
import Pagination from "@/app/components/Pagination";

const getProducts = async (searchParams) => {
  // Await searchParams to resolve the promise
  const resolvedSearchParams = await searchParams;
  const searchQuery = new URLSearchParams({
    page: resolvedSearchParams?.page || 1,
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product?${searchQuery}`,
    {
      method: "GET",
      next: { revalidate: 1 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return {
    products: data?.products,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
  };
};

export default async function Home({ searchParams }) {
  const data = await getProducts(searchParams);

  return (
    <main className="min-h-screen bg-gray-50">
      <div>
        {/* Banner Section */}
        <div className="page-banner bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="page-banner__details max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="page-banner__details__title text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-red-500">
                Our E-commerce Website
              </h1>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="section py-12">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section__head mb-8">
              <div className="product__details__title">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                  Filtered Products
                </h2>
              </div>
            </div>
            <div className="section__content">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Pagination
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          pathname={"/"}
        />
      </div>
    </main>
  );
}
