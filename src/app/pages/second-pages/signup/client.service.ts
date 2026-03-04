export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type?: string;
}

const MOCK_CLIENTS: Client[] = [
  { id: "1", name: "John Smith", email: "john@example.com", phone: "(555) 123-4567", type: "Buyer" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", phone: "(555) 234-5678", type: "Seller" },
  { id: "3", name: "Michael Brown", email: "michael@example.com", phone: "(555) 345-6789", type: "Investor" },
  { id: "4", name: "Emily Davis", email: "emily@example.com", phone: "(555) 456-7890", type: "Buyer" },
  { id: "5", name: "David Wilson", email: "david@example.com", phone: "(555) 567-8901", type: "Seller" },
];

export async function listClients(): Promise<Client[]> {
  try {
    const res = await fetch("https://augielopez.app.n8n.cloud/webhook-test/clients", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`Failed to fetch clients: ${res.status}`);
    
    const data = await res.json();
    return Array.isArray(data) ? data : MOCK_CLIENTS;
  } catch (err) {
    console.warn("Client fetch failed, using mock data:", err);
    return MOCK_CLIENTS;
  }
}
