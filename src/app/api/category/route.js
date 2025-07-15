import { NextResponse } from "next/server";

import Category from "@/models/category";
import connectDB from "@/util/db";

export async function GET(req) {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      {
        err: error.message,
      },
      { status: 500 }
    );
  }
}
