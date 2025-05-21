import { KiteConnect } from "kiteconnect";

const apiKey = "792af92oq8nlg0hk";
const apiSecret = "akh49s4vxsqes0300834m79uj7dp7381";
const requestToken = "06d5eca1oMiXw7V3kAtbZelQnV3G670J";

const kc = new KiteConnect({ api_key: apiKey });
console.log(kc.getLoginURL());

async function init() {
  try {
    await generateSession();
    await getProfile();
    await placeOrder();
  } catch (err) {
    console.error(err);
  }
}

async function generateSession() {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    kc.setAccessToken(response.access_token);
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function getProfile() {
  try {
    const profile = await kc.getProfile();
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}

async function placeOrder() {
  try {
    const profile = await kc.placeOrder("regular", {
        exchange: "NSE",
        tradingsymbol: "HDFCBANK",
        transaction_type: "BUY",
        quantity: 1,
        product: "CNC",
        order_type: "MARKET",
    });
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
// Initialize the API calls
init();