import { Injectable } from '@angular/core';
import {
  getClientData,
  getAllClientData,
  createClientData,
  updateClientData,
  deleteClientData,
  ClientData,
} from '@/supabase/api/client-data.api';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  async getClientData(clientId: string): Promise<ClientData | null> {
    return await getClientData(clientId);
  }

  async getAllClientData(): Promise<ClientData[]> {
    return await getAllClientData();
  }

  async createClientData(clientData: Partial<ClientData>): Promise<ClientData | null> {
    return await createClientData(clientData);
  }

  async updateClientData(
    clientId: string,
    updates: Partial<ClientData>
  ): Promise<ClientData | null> {
    return await updateClientData(clientId, updates);
  }

  async deleteClientData(clientId: string): Promise<boolean> {
    return await deleteClientData(clientId);
  }
}
