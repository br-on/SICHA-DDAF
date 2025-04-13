// /api/chamados/[n_demanda].js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async function handler(req, res) {
  const { n_demanda } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { data, error } = await supabase
    .from('chamados')
    .select('*')
    .eq('n_demanda', n_demanda);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}
