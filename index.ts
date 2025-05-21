import { placeOrder, getPositions } from "./trade";

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

server.tool("buy-stock",  "Buy the stock on zerodha exchange for the user It eexecutes a real order to buy the stock for the user",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
   placeOrder(stock, qty, "BUY");
   return {
        content: [{ type: "text", text: `Order placed for ${qty} shares of ${stock}` }]
   }
  }
);

server.tool("sell-stock",  "Sells the stock on zerodha exchange for the user It eexecutes a real order to sell the stock for the user", 
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
   placeOrder(stock, qty, "SELL");
   return {
        content: [{ type: "text", text: `Order sold for ${qty} shares of ${stock}` }]
   }
  }
);

server.tool("show-portfolio",  "Shows my positions on zerodha exchange for the user.", 
  { },
  async () => {
   const holdings = await getPositions();
   return {
        content: [{ type: "text", text: holdings }]
   }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);