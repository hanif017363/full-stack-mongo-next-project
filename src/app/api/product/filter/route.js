import { NextResponse } from "next/server";
import connectDb from "@/util/db";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
  await connectDb();
  const searchParams = queryString.parseUrl(req.url).query;
  const { page, minPrice, maxPrice, category } = searchParams || {};

  const pageSize = 3;

  const filter = {};

  if (category) [(filter.category = category)];

  if (minPrice && maxPrice) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }

  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    const filteredProducts = await Product.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const totalFilteredProducts = await Product.find(filter);
    return NextResponse.json(
      {
        products: filteredProducts,
        currentPage,
        totalPages: Math.ceil(totalFilteredProducts.length / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
