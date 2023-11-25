import {
  AugmentedRequest,
  CacheOptions,
  RESTDataSource,
} from "@apollo/datasource-rest";
import fetch from "node-fetch";
import { CartItem, ProductItem, Session } from "../__generated__/types";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";

export class RestAPI extends RESTDataSource {
  private sessionId: string | null;
  baseURL = "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/";

  constructor(options: { sessionId: string; cache: KeyValueCache }) {
    super(options);
    this.sessionId = options.sessionId;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    if (this.sessionId) {
      request.headers["session-id"] = this.sessionId;
    }
  }

  override async parseBody(response: Response) {
    try {
      const rawText = await response.text();
      if (this.isJSONString(rawText)) {
        return JSON.parse(rawText);
      }
      return rawText;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(): Promise<ProductItem[]> {
    const response = await this.get("products");
    return response;
  }

  async searchProduct(query: string): Promise<ProductItem[]> {
    return await this.get(`search?name=${query}`);
  }

  async getCartItems(): Promise<CartItem[]> {
    try {
      const response = await this.get("view-cart");
      return response;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  }

  async addToCart(productId: string): Promise<boolean> {
    try {
      await this.post(`add-to-cart?id=${productId}`);
      return true;
    } catch (error: any) {
      console.error("Error addToCart:", error);
      throw error;
    }
  }

  async subtractFromCart(productId: string): Promise<boolean> {
    try {
      await this.post(`subtract-from-cart?id=${productId}`);
      return true;
    } catch (error) {
      console.error("Error subtractFromCart:", error);
      throw error;
    }
  }

  async createSession(): Promise<Session> {
    const response = await this.get(`createsession`);
    return {
      sessionId: response,
    };
  }

  private isJSONString(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}
