import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

type ChatRequest = {
  message: string;
  sessionId?: string;
  history?: Array<{ role: string; content: string }>;
};

/**
 * ChatService
 *
 * Sends chat messages to an n8n webhook endpoint.
 *
 * Configuration:
 * - Provide the webhook URL at runtime via `window.__env__.N8N_CHAT_WEBHOOK`
 *   or fall back to the test URL below.
 * - Optionally provide `window.__env__.N8N_CHAT_TOKEN` to include as `X-Chat-Token` header.
 *
 * Do NOT hardcode production secrets in source code. Prefer runtime injection.
 */
@Injectable({ providedIn: "root" })
export class ChatService {
  // production webhook (can be overridden at runtime via window.__env__.N8N_CHAT_WEBHOOK)
  private defaultWebhook = "https://augielopez.app.n8n.cloud/webhook/website-chat";

  constructor(private http: HttpClient) {}

  private getWebhookUrl(): string {
    try {
      // @ts-ignore
      const runtime = (window as any).__env__;
      if (runtime && runtime.N8N_CHAT_WEBHOOK) return runtime.N8N_CHAT_WEBHOOK;
    } catch {}
    return this.defaultWebhook;
  }

  private getAuthToken(): string | null {
    try {
      // @ts-ignore
      const runtime = (window as any).__env__;
      if (runtime && runtime.N8N_CHAT_TOKEN) return runtime.N8N_CHAT_TOKEN;
    } catch {}
    return null;
  }

  async sendMessage(payload: ChatRequest) {
    const url = this.getWebhookUrl();
    const headersObj: Record<string, string> = { "Content-Type": "application/json" };
    const token = this.getAuthToken();
    if (token) headersObj["X-Chat-Token"] = token;
    const headers = new HttpHeaders(headersObj);

    try {
      // n8n expects the incoming prompt under the field `chatInput`.
      const body = {
        chatInput: payload.message,
        sessionId: payload.sessionId,
        history: payload.history,
      };
      const res: any = await this.http.post(url, body, { headers }).toPromise();
      // Return full response object (n8n may return reply under different shapes).
      // Normalize array-wrapped n8n responses
      if (Array.isArray(res) && res.length && res[0]?.json) {
        return res[0].json;
      }
      return res;
    } catch (err) {
      // fallback mock response
      return Promise.resolve(
        "I’m having trouble reaching the server right now — please call (559) 555-1212 for immediate help."
      );
    }
  }
}

