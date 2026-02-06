export interface PropertyPhoto {
  id: string;
  width: number;
  height: number;
  url: string;
  filename?: string;
  thumbnails?: {
    small?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
}

export interface Property {
  id: string;
  createdTime: string;
  "Property Name": string;
  Address?: string;
  City?: string;
  State?: string;
  "ZIP Code"?: string;
  Photos?: PropertyPhoto[];
  Bedrooms?: number;
  Bathrooms?: number;
  "Square Footage"?: number;
  "Lot Size"?: number;
  "Year Built"?: number;
  "Property Type"?: string;
  "Most Recent List Price"?: number;
  [key: string]: any;
}

const WEBHOOK_URL =
  "https://augielopez.app.n8n.cloud/webhook/cd8a2bd8-a4a4-4bde-9a0e-b4719b599cd3";

export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.status}`);
  }

  const data = await res.json();

  // Common payload shapes: raw array, { records: [...] }, { data: [...] }
  if (Array.isArray(data)) return data as Property[];
  if (Array.isArray(data?.records)) return data.records as Property[];
  if (Array.isArray(data?.data)) return data.data as Property[];

  // Fallback: return empty array
  return [];
}

