import { KiteConnect } from "kiteconnect";

const apiKey = "792af92oq8nlg0hk";
const apiSecret = "akh49s4vxsqes0300834m79uj7dp7381";
const setAccessToken ="XZP8cv8JZz4JZqCbKNTDoThsPJh0c0ej";

const kc = new KiteConnect({ api_key: apiKey });
console.log(kc.getLoginURL());
kc.setAccessToken(setAccessToken);




export async function placeOrder(tradingsymbol: string, quantity: number, type : "BUY"|"SELL") {
  try {
    const profile = await kc.placeOrder("regular", {
        exchange: "NSE",
        tradingsymbol,
        transaction_type: type,
        quantity,
        product: "CNC",
        order_type: "MARKET",
    });
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}

export async function getPositions() {

    const holdings = await kc.getPositions();
    let allHoldings = "";
    holdings.net.map((holding) => {
      allHoldings += `Symbol: ${holding.tradingsymbol}, Quantity: ${holding.quantity}, Average Price: ${holding.average_price}\n`;
    });

return allHoldings;
}

// Initialize the API calls