import { redirect } from "react-router";
import { authenticate } from "../shopify.server";
import { upsertShop } from "../models/shop.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);

  const shop = session.shop;

  // ⚠️ You will get these from Razorpay in real OAuth flow
  const razorpayAccountId = url.searchParams.get("account_id");

  await upsertShop(shop, {
    razorpayConnected: true,
    razorpayAccountId,
  });

  return redirect("/app");
};
