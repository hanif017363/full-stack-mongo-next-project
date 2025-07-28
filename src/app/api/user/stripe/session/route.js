import { NextResponse } from "next/server";
import connectDB from "@/util/db";
import Product from "@/models/product";
import { getToken } from "next-auth/jwt";
import Stripe from "stripe";

// ✅ Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export async function POST(req) {
  await connectDB();

  try {
    const { cartItems } = await req.json();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const user = token?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lineItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item._id);
        const unitAmount = product.price * 100;

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              images: [product.image?.secure_url || ""],
            },
            unit_amount: unitAmount,
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/cancel`,
      client_reference_id: user._id,
      payment_method_types: ["card"],
      payment_intent_data: {
        metadata: {
          cartItems: JSON.stringify(cartItems),
          userId: user._id,
        },
      },
      shipping_address_collection: {
        allowed_countries: ["US", "BD"],
      },
      customer_email: user.email,
    });

    console.log("Stripe Checkout Session:", session.id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err.message);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
