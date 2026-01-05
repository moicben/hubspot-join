export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Étape 1 : Récupérer l'IP de l'utilisateur
    const ipResponse = await fetch('https://api.ipify.org?format=json')
    const ipData = await ipResponse.json()
    const userIP = ipData.ip

    // Étape 2 : Géolocaliser à partir de l'IP avec ip-api.com
    const geoResponse = await fetch(`http://ip-api.com/json/${userIP}?fields=status,message,country,regionName,city,zip,lat,lon,query`)
    const geoData = await geoResponse.json()

    if (geoData.status === 'fail') {
      return res.status(400).json({ 
        error: geoData.message || 'Erreur de géolocalisation',
        ip: userIP 
      })
    }

    // Étape 3 : Utiliser géocodage inverse avec Nominatim pour obtenir l'adresse complète
    let address = ''
    if (geoData.lat && geoData.lon) {
      try {
        const reverseGeoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${geoData.lat}&lon=${geoData.lon}&addressdetails=1&accept-language=fr`,
          {
            headers: {
              'User-Agent': 'HubSpot Join App'
            }
          }
        )
        
        // Vérifier que la réponse est bien du JSON avant de parser
        const contentType = reverseGeoResponse.headers.get('content-type')
        if (!reverseGeoResponse.ok || !contentType?.includes('application/json')) {
          throw new Error(`Nominatim API error: ${reverseGeoResponse.status}`)
        }
        
        const reverseGeoData = await reverseGeoResponse.json()
        
        if (reverseGeoData.address) {
          const addr = reverseGeoData.address
          // Construire l'adresse : numéro + rue
          if (addr.house_number && addr.road) {
            address = `${addr.house_number} ${addr.road}`
          } else if (addr.road) {
            address = addr.road
          } else if (addr.street) {
            address = addr.street
          }
        }
      } catch (reverseError) {
        // Continue sans adresse si le géocodage inverse échoue
        console.error('Erreur géocodage inverse:', reverseError.message || reverseError)
      }
    }

    // Retourner les données formatées
    return res.status(200).json({
      success: true,
      ip: userIP,
      address: address || '',
      city: geoData.city || '',
      postalCode: geoData.zip || '',
      country: geoData.country || 'France',
      coordinates: geoData.lat && geoData.lon ? {
        lat: geoData.lat,
        lon: geoData.lon
      } : null
    })
  } catch (error) {
    console.error('Erreur lors de la géolocalisation:', error)
    return res.status(500).json({ 
      error: 'Erreur lors de la géolocalisation',
      message: error.message 
    })
  }
}
