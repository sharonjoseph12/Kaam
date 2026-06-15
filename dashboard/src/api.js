import { supabase } from './supabaseClient';

class ApiClient {
  async getContractorSites(contractorId) {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('contractor_id', contractorId);
    if (error) throw error;
    return data;
  }

  async getContractor(contractorId) {
    const { data, error } = await supabase
      .from('contractors')
      .select('*')
      .eq('id', contractorId)
      .single();
    if (error) throw error;
    return data;
  }

  async listAnomalies(filters = {}) {
    let query = supabase.from('disputes').select('*'); // Assuming disputes are anomalies for now
    if (filters.contractor_id) {
      // Actually we'd need to join, but keeping it simple or mapping
    }
    if (filters.resolved !== undefined) {
      query = query.eq('status', filters.resolved ? 'RESOLVED' : 'OPEN');
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async resolveAnomaly(alertId) {
    const { data, error } = await supabase
      .from('disputes')
      .update({ status: 'RESOLVED', resolved_at: new Date().toISOString() })
      .eq('id', alertId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

export const api = new ApiClient();
