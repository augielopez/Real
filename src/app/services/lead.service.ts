import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

type LeadInsert = {
  full_name?: string;
  email?: string;
  phone?: string;
  intent?: string;
  consent?: boolean;
  status?: string;
  call_ready?: boolean;
  source?: string;
  step?: string;
  timeframe?: string;
  area?: string;
  price_band?: string;
  updated_at?: string;
  date_created?: string;
};

@Injectable({ providedIn: "root" })
export class LeadService {
  private defaultWebhook = "https://augielopez.app.n8n.cloud/webhook/website-get-started-form";

  constructor(private http: HttpClient) {}

  private getWebhookUrl(): string {
    try {
      // @ts-ignore
      const runtime = (window as any).__env__;
      if (runtime && runtime.N8N_LEAD_WEBHOOK) return runtime.N8N_LEAD_WEBHOOK;
    } catch {}
    return this.defaultWebhook;
  }

  private getAuthHeader(): Record<string, string> {
    try {
      // @ts-ignore
      const runtime = (window as any).__env__;
      if (runtime && runtime.N8N_LEAD_TOKEN) return { "X-Webhook-Token": runtime.N8N_LEAD_TOKEN };
    } catch {}
    return {};
  }

  async insertLead(payload: LeadInsert) {
    const url = this.getWebhookUrl();
    const headers = new HttpHeaders({ "Content-Type": "application/json", ...this.getAuthHeader() });
    try {
      const res: any = await this.http.post(url, payload, { headers }).toPromise();
      if (Array.isArray(res) && res.length && res[0]?.json) return res[0].json;
      return res;
    } catch (err) {
      const stub = { id: `local-${Date.now()}`, ...payload, date_created: new Date().toISOString() };
      try {
        const list = JSON.parse(localStorage.getItem("leads_stub") || "[]");
        list.push(stub);
        localStorage.setItem("leads_stub", JSON.stringify(list));
      } catch {}
      return stub;
    }
  }

  async updateLead(id: string, patch: Partial<LeadInsert>) {
    const url = this.getWebhookUrl();
    const headers = new HttpHeaders({ "Content-Type": "application/json", ...this.getAuthHeader() });
    const body = { action: "update", id, patch };
    try {
      const res: any = await this.http.post(url, body, { headers }).toPromise();
      if (Array.isArray(res) && res.length && res[0]?.json) return res[0].json;
      return res;
    } catch (err) {
      try {
        const list = JSON.parse(localStorage.getItem("leads_stub") || "[]");
        const idx = list.findIndex((l: any) => l.id === id);
        if (idx >= 0) {
          list[idx] = { ...list[idx], ...patch, updated_at: new Date().toISOString() };
          localStorage.setItem("leads_stub", JSON.stringify(list));
          return list[idx];
        }
      } catch {}
      return null;
    }
  }
}

