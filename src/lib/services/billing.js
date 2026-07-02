import config from "../config";
import PayPalService from "./paypal";

export const BillingService = {
  async createCheckoutSession(userId, planId) {
    try {
      // Use PayPal for checkout
      const orderUrl = await PayPalService.createOrder(planId, userId);
      return orderUrl;
    } catch (error) {
      console.error("Billing checkout error:", error);
      throw error;
    }
  },

  async capturePayment(orderId) {
    try {
      const result = await PayPalService.captureOrder(orderId);
      return result;
    } catch (error) {
      console.error("Payment capture error:", error);
      throw error;
    }
  },

  async handleWebhook(body, signature) {
    try {
      // Use PayPal webhook handler
      return await PayPalService.handleWebhook(body);
    } catch (error) {
      console.error("Webhook handling error:", error);
      throw error;
    }
  }
};

export const createCheckoutSession = BillingService.createCheckoutSession.bind(BillingService);
export const handleWebhook = BillingService.handleWebhook.bind(BillingService);
export default BillingService;

