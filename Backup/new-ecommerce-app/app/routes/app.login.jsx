import { TitleBar } from "@shopify/app-bridge-react";
import styles from "../styles/RazorpayOnboarding.css?url";
import razorpayLogo from "../assets/razorpay-white-logo.png";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function Login() {
  return (
    <s-page>
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
              <button className="rzp-btn primary">I am an existing user</button>

              <button className="rzp-btn secondary">
                I am new to Razorpay
              </button>
            </div>

            <span className="rzp-back">Back to Shopify</span>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rzp-image">
            <img src="https://cdn.razorpay.com/static/assets/shopify-onboarding.png" />
          </div>
        </div>
      </div>
    </s-page>
  );
}
