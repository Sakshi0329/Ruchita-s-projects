import { getShop } from "../models/shop.server";
import { redirect } from "react-router";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = await getShop(session.shop);

  if (!shop?.razorpayConnected) {
    throw redirect("/app/login");
  }

  return { shop };
};
