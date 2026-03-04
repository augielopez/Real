import { supabase } from '../client';

export interface ClientData {
  id: string;
  client_id: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  client_type?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export async function getClientData(clientId: string): Promise<ClientData | null> {
  try {
    const { data, error } = await supabase
      .from('vw_client_data')
      .select('*')
      .eq('client_id', clientId)
      .single();

    if (error) {
      console.error('Error fetching client data:', error);
      return null;
    }

    return data as ClientData;
  } catch (err) {
    console.error('Exception fetching client data:', err);
    return null;
  }
}

export async function getAllClientData(): Promise<ClientData[]> {
  try {
    const { data, error } = await supabase
      .from('vw_client_data')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all client data:', error);
      return [];
    }

    return (data as ClientData[]) || [];
  } catch (err) {
    console.error('Exception fetching all client data:', err);
    return [];
  }
}

export async function createClientData(clientData: Partial<ClientData>): Promise<ClientData | null> {
  try {
    const { data, error } = await supabase
      .from('client_data')
      .insert([clientData])
      .select()
      .single();

    if (error) {
      console.error('Error creating client data:', error);
      return null;
    }

    return data as ClientData;
  } catch (err) {
    console.error('Exception creating client data:', err);
    return null;
  }
}

export async function updateClientData(
  clientId: string,
  updates: Partial<ClientData>
): Promise<ClientData | null> {
  try {
    const { data, error } = await supabase
      .from('client_data')
      .update(updates)
      .eq('client_id', clientId)
      .select()
      .single();

    if (error) {
      console.error('Error updating client data:', error);
      return null;
    }

    return data as ClientData;
  } catch (err) {
    console.error('Exception updating client data:', err);
    return null;
  }
}

export async function deleteClientData(clientId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('client_data')
      .delete()
      .eq('client_id', clientId);

    if (error) {
      console.error('Error deleting client data:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Exception deleting client data:', err);
    return false;
  }
}
