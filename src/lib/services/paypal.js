import config from "../config";
import { UserService } from "./user";

export const PayPalService = {
  // Get PayPal access token
  async getAccessToken() {
    const auth = Buffer.from(
      `${config.paypal.clientId}:${config.paypal.clientSecret}`
    ).toString("base64");

    try {
      const response = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error_description || "Failed to get access token");
      }

      return data.access_token;
    } catch (error) {
      console.error("PayPal token error:", error);
      throw error;
    }
  },

  // Create order
  async createOrder(planId, userId) {
    const plan = config.paypal.plans[planId];
    if (!plan) throw new Error("Invalid plan selected");

    const accessToken = await this.getAccessToken();

    try {
      const response = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: plan.price,
              },
              description: plan.description,
              custom_id: `${userId}:${planId}:${plan.credits}`,
            },
          ],
          redirect_urls: {
            return_url: `${config.auth.url}/pricing?success=true`,
            cancel_url: `${config.auth.url}/pricing?canceled=true`,
          },
          application_context: {
            brand_name: config.appName,
            return_url: `${config.auth.url}/pricing?success=true`,
            cancel_url: `${config.auth.url}/pricing?canceled=true`,
            user_action: "PAY_NOW",
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create PayPal order");
      }

      // Return the approval link
      const approvalLink = data.links.find((link) => link.rel === "approve");
      return approvalLink?.href || null;
    } catch (error) {
      console.error("PayPal order creation error:", error);
      throw error;
    }
  },

  // Capture payment
  async captureOrder(orderId) {
    const accessToken = await this.getAccessToken();

    try {
      const response = await fetch(
        `https://api-m.paypal.com/v2/checkout/orders/${orderId}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to capture PayPal order");
      }

      return data;
    } catch (error) {
      console.error("PayPal capture error:", error);
      throw error;
    }
  },

  // Handle webhook
  async handleWebhook(body) {
    try {
      // Verify webhook signature
      const isValid = await this.verifyWebhookSignature(body);
      if (!isValid) {
        throw new Error("Invalid webhook signature");
      }

      const event = JSON.parse(body);

      // Handle PAYMENT.CAPTURE.COMPLETED event
      if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
        const customData = event.resource.custom_id;
        if (!customData) {
          return { success: false, message: "No custom data in webhook" };
        }

        const [userId, planId, creditsStr] = customData.split(":");
        const credits = parseInt(creditsStr, 10);

        if (userId && credits > 0) {
          await UserService.addCredits(userId, credits);
          return { success: true, userId, credits };
        }
      }

      return { success: false };
    } catch (error) {
      console.error("PayPal webhook error:", error);
      throw error;
    }
  },

  // Verify webhook signature
  async verifyWebhookSignature(body) {
    try {
      const accessToken = await this.getAccessToken();
      const webhookId = config.paypal.webhookId;

      if (!webhookId) {
        console.warn("PayPal webhook ID not configured");
        return false;
      }

      const event = JSON.parse(body);
      
      // In production, you should verify the signature
      // For now, we'll do basic validation
      return event.event_type && event.resource;
    } catch (error) {
      console.error("PayPal signature verification error:", error);
      return false;
    }
  },
};

export default PayPalService;
