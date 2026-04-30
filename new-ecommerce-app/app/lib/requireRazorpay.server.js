import { redirect } from "react-router";
import { getShop } from "../models/shop.server";

export async function requireRazorpay(session) {
  if (!session?.shop) {
    throw new Error("Session shop missing");
  }

  const shop = await getShop(session.shop);

  if (!shop?.razorpayConnected) {
    console.log(shop, "Authenticate123");

    throw redirect(`/app/login?shop=${session.shop}`);
  }

  return shop;
}
