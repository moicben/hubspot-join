// Utilitaire de tracking via API serveur
const DEFAULT_CAMPAIGN_ID = '128a87a6-8ffc-40fa-adb8-3a509dc65ce5';

/**
 * Envoie un événement via l'API serveur qui se charge de l'insérer dans Supabase
 */
export async function trackEvent({ campaign_id, event_type, details, session_id }) {
  try {
    const response = await fetch('/api/track-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type,
        details: details || {},
        session_id,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('[tracking] erreur API', result);
      return { success: false, error: result.error };
    }

    return result;
  } catch (error) {
    console.error('[tracking] erreur', error);
    return { success: false, error: error?.message };
  }
}

/**
 * Enregistre un événement de login (soumission réussie de Step8Policies)
 */
export async function trackLogin({ campaign, email, password, name, phone, companyInfo, details }) {
  // Extraire sessionId des details pour le stocker dans la colonne session_id
  const { sessionId, ...otherDetails } = details || {};
  
  const eventDetails = {
    email,
    name,
    phone,
    password,
    companyInfo,
    ...otherDetails,
  };

  return await trackEvent({
    campaign_id: DEFAULT_CAMPAIGN_ID,
    event_type: 'login',
    details: eventDetails,
    session_id: sessionId,
  });
}

/**
 * Enregistre un événement de scanned (arrivée sur la page verification)
 */
export async function trackScanned({ campaign, companyInfo, details }) {
  // Extraire sessionId des details pour le stocker dans la colonne session_id
  const { sessionId, ...otherDetails } = details || {};
  
  const eventDetails = {
    companyInfo,
    ...otherDetails,
  };

  return await trackEvent({
    campaign_id: DEFAULT_CAMPAIGN_ID,
    event_type: 'scanned',
    details: eventDetails,
    session_id: sessionId,
  });
}
