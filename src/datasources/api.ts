import { RESTDataSource } from "@apollo/datasource-rest";
import fetch from "node-fetch";
import { CartItem, ProductItem, Session } from "../types";
import { HTTPCache } from "@apollo/datasource-rest/dist/HTTPCache";

export class RestAPI extends RESTDataSource {
  baseURL = "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/";

  constructor() {
    super();
  }

  async getProducts(): Promise<ProductItem[]> {
    return await this.get("products");
  }

  async searchProduct(
    query: string,
    sessionId: string
  ): Promise<ProductItem[]> {
    return await this.get(`search?name=${query}`, {
      headers: {
        "Session-ID": sessionId,
      },
    });
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    try {
      const response = await fetch(`${this.baseURL}view-cart`, {
        headers: {
          "Session-ID": sessionId,
        },
      });

      return await response.json();
    } catch {
      // handling cart is empty text response
      return [];
    }
  }

  async addToCart(productId: string, sessionId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseURL}add-to-cart?id=${productId}`,
        {
          headers: {
            "Session-ID": sessionId,
          },
        }
      );
      const result = await response.text();
      return true;
    } catch (e) {
      return false;
    }
  }

  async createSession(): Promise<Session> {
    const response = await fetch(`${this.baseURL}createsession`);
    const result = await response.text();

    return {
      sessionId: result,
    };
  }
}
