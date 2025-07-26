"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/util/db";
import Product from "@/models/product";

export async function addProduct(prevState) {
  try {
    await connectDB();
    const product = {
      title: prevState.title,
      description: prevState.description,
      price: Number(prevState.price),
      category: prevState.category,
      image: prevState.image,
    };
    await new Product(product).save();
  } catch (error) {
    return {
      message: "Error creating product",
    };
  }

  revalidatePath("/");
  // revalidatePath("/dashboard/admin/products");

  redirect("/");
}
