// API serveur pour tracker les événements vers Supabase
import { supabase } from '../../lib/supabase';

const CAMPAIGN_ID = '128a87a6-8ffc-40fa-adb8-3a509dc65ce5';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabase) {
    return res.status(500).json({ 
      success: false, 
      error: 'Supabase non configuré' 
    });
  }

  try {
    const { event_type, details, session_id } = req.body;

    if (!event_type) {
      return res.status(400).json({ error: 'event_type is required' });
    }

    // Récupérer l'IP depuis les headers
    const ip = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               req.connection.remoteAddress ||
               null;

    // Nettoyer les details pour retirer sessionId s'il est présent (pour éviter duplication)
    const cleanedDetails = { ...details };
    if (cleanedDetails.sessionId) {
      delete cleanedDetails.sessionId;
    }

    const eventData = {
      event_type,
      campaign_id: CAMPAIGN_ID,
      ip,
      details: cleanedDetails,
      session_id: session_id || null,
    };

    console.log('📤 Insertion événement:', event_type);

    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select();

    if (error) {
      console.error('❌ Erreur Supabase:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }

    console.log('✅ Événement créé:', data[0].id);

    return res.status(200).json({ 
      success: true, 
      data: data[0] 
    });

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
