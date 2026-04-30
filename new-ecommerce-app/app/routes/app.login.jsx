import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import styles from "../styles/RazorpayOnboarding.css?url";
import razorpayLogo from "../assets/razorpay-white-logo.png";
import paymentGatewayLogo from "../assets/payment-gateway.png";
import { redirect, useFetcher } from "react-router";
import { authenticate } from "../shopify.server";
import { useEffect } from "react";

export const links = () => [{ rel: "stylesheet", href: styles }];

const baseUrl = process.env.SHOPIFY_APP_URL;

const getCallback = (shop) => `${baseUrl}/app/onboarding/callback?shop=${shop}`;

const getRazorpayLoginUrl = (shop) =>
  `https://dashboard.razorpay.com/signin?redirect_to=${encodeURIComponent(
    getCallback(shop),
  )}`;

const getRazorpayRegisterUrl = (shop) =>
  `https://dashboard.razorpay.com/signup?redirect_to=${encodeURIComponent(
    getCallback(shop),
  )}`;

const getRazorpayOAuthUrl = (shop) => {
  return `https://auth.razorpay.com/token?client_id=${
    process.env.PG_API_KEY
  }&response_type=code&redirect_uri=${encodeURIComponent(
    `${process.env.SHOPIFY_APP_URL}/app/razorpay/callback?shop=${shop}`,
  )}`;
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();

  const flow = formData.get("flow");

  const shop = session.shop;

  const redirectUrl =
    flow === "login" ? getRazorpayLoginUrl(shop) : getRazorpayRegisterUrl(shop);

  return redirect(redirectUrl);
};

// export const action = async ({ request }) => {
//   const { session } = await authenticate.admin(request);

//   const oauthUrl = `https://auth.razorpay.com/token?client_id=${
//     process.env.PG_API_KEY
//   }&response_type=code&redirect_uri=${encodeURIComponent(
//     `${process.env.SHOPIFY_APP_URL}/app/razorpay/callback?shop=${session.shop}`,
//   )}`;

//   return redirect(oauthUrl);
// };

export const handle = {
  appBridge: {
    layout: "full-width",
  },
};

export default function Login() {
  const fetcher = useFetcher();

  return (
    <>
      <TitleBar title="Razorpay" />

      <div className="rzp-page">
        <div className="rzp-card">
          {/* LEFT */}
          <div className="rzp-content">
            <img className="rzp-logo" src={razorpayLogo} />

            <h1>
              Supercharge your Shopify <br />
              Store with Razorpay
            </h1>

            <p>
              With completely online onboarding, easiest integration, feature
              filled checkout and best in class performance, go live with
              Razorpay in minutes and experience the future of payments.
            </p>

            <div className="rzp-btn-group">
              <button
                className="primary rzp-btn"
                onClick={() =>
                  fetcher.submit({ flow: "login" }, { method: "POST" })
                }
              >
                I am an existing user
              </button>
              <button
                className="secondary rzp-btn"
                onClick={() =>
                  fetcher.submit({ flow: "register" }, { method: "POST" })
                }
              >
                I am new to Razorpay
              </button>
            </div>

            <s-link href="/app" className="rzp-back">
              Back to Shopify
            </s-link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rzp-image">
            <img src={paymentGatewayLogo} />
          </div>
        </div>
      </div>
    </>
  );
}
