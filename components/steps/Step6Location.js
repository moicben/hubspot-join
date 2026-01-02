import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from '../../styles/Step.module.css'
import { ArrowLeftIcon } from '../Icons'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix pour les icônes Leaflet avec Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Import dynamique pour éviter les problèmes SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

const COUNTRIES = [
  'Afghanistan',
  'Afrique du Sud',
  'Albanie',
  'Algérie',
  'Allemagne',
  'Andorre',
  'Angola',
  'Antigua-et-Barbuda',
  'Arabie saoudite',
  'Argentine',
  'Arménie',
  'Australie',
  'Autriche',
  'Azerbaïdjan',
  'Bahamas',
  'Bahreïn',
  'Bangladesh',
  'Barbade',
  'Belgique',
  'Belize',
  'Bhoutan',
  'Biélorussie',
  'Birmanie',
  'Bolivie',
  'Bosnie-Herzégovine',
  'Botswana',
  'Brésil',
  'Brunei',
  'Bulgarie',
  'Burkina Faso',
  'Burundi',
  'Cambodge',
  'Cameroun',
  'Canada',
  'Cap-Vert',
  'Chili',
  'Chine',
  'Chypre',
  'Colombie',
  'Comores',
  'Corée du Nord',
  'Corée du Sud',
  'Costa Rica',
  'Côte d\'Ivoire',
  'Croatie',
  'Cuba',
  'Danemark',
  'Djibouti',
  'Dominique',
  'Égypte',
  'Émirats arabes unis',
  'Équateur',
  'Érythrée',
  'Espagne',
  'Estonie',
  'États-Unis',
  'Éthiopie',
  'Fidji',
  'Finlande',
  'France',
  'Gabon',
  'Gambie',
  'Géorgie',
  'Ghana',
  'Grèce',
  'Grenade',
  'Guatemala',
  'Guinée',
  'Guinée équatoriale',
  'Guinée-Bissau',
  'Guyane',
  'Guyane française',
  'Haïti',
  'Honduras',
  'Hong Kong',
  'Hongrie',
  'Inde',
  'Indonésie',
  'Irak',
  'Iran',
  'Irlande',
  'Islande',
  'Israël',
  'Italie',
  'Jamaïque',
  'Japon',
  'Jordanie',
  'Kazakhstan',
  'Kenya',
  'Kirghizistan',
  'Kiribati',
  'Koweït',
  'Laos',
  'Lesotho',
  'Lettonie',
  'Liban',
  'Libéria',
  'Libye',
  'Liechtenstein',
  'Lituanie',
  'Luxembourg',
  'Macao',
  'Macédoine du Nord',
  'Madagascar',
  'Malaisie',
  'Malawi',
  'Maldives',
  'Mali',
  'Malte',
  'Maroc',
  'Marshall',
  'Maurice',
  'Mauritanie',
  'Mexique',
  'Micronésie',
  'Moldavie',
  'Monaco',
  'Mongolie',
  'Monténégro',
  'Mozambique',
  'Myanmar',
  'Namibie',
  'Nauru',
  'Népal',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norvège',
  'Nouvelle-Calédonie',
  'Nouvelle-Zélande',
  'Oman',
  'Ouganda',
  'Ouzbékistan',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papouasie-Nouvelle-Guinée',
  'Paraguay',
  'Pays-Bas',
  'Pérou',
  'Philippines',
  'Pologne',
  'Polynésie française',
  'Portugal',
  'Qatar',
  'République centrafricaine',
  'République démocratique du Congo',
  'République dominicaine',
  'République du Congo',
  'République tchèque',
  'Roumanie',
  'Royaume-Uni',
  'Russie',
  'Rwanda',
  'Saint-Kitts-et-Nevis',
  'Saint-Marin',
  'Saint-Vincent-et-les-Grenadines',
  'Sainte-Lucie',
  'Salomon',
  'Salvador',
  'Samoa',
  'Sao Tomé-et-Principe',
  'Sénégal',
  'Serbie',
  'Seychelles',
  'Sierra Leone',
  'Singapour',
  'Slovaquie',
  'Slovénie',
  'Somalie',
  'Soudan',
  'Soudan du Sud',
  'Sri Lanka',
  'Suède',
  'Suisse',
  'Suriname',
  'Syrie',
  'Taïwan',
  'Tadjikistan',
  'Tanzanie',
  'Tchad',
  'Thaïlande',
  'Timor oriental',
  'Togo',
  'Tonga',
  'Trinité-et-Tobago',
  'Tunisie',
  'Turkménistan',
  'Turquie',
  'Tuvalu',
  'Ukraine',
  'Uruguay',
  'Vanuatu',
  'Vatican',
  'Venezuela',
  'Vietnam',
  'Yémen',
  'Zambie',
  'Zimbabwe'
].sort((a, b) => a.localeCompare(b, 'fr'))

export default function Step6Location({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    address: data.address || '',
    city: data.city || '',
    postalCode: data.postalCode || '',
    country: data.country || 'France'
  })

  const [coordinates, setCoordinates] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)

  // Récupération de l'IP et géolocalisation
  useEffect(() => {
    const fetchLocationFromIP = async () => {
      try {
        // Étape 1 : Récupérer l'IP de l'utilisateur
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipResponse.json()
        const userIP = ipData.ip

        // Étape 2 : Géolocaliser à partir de l'IP avec ip-api.com pour obtenir coordonnées
        const geoResponse = await fetch(`http://ip-api.com/json/${userIP}?fields=status,message,country,regionName,city,zip,lat,lon,query`)
        const geoData = await geoResponse.json()

        if (geoData.status === 'fail') {
          throw new Error(geoData.message || 'Erreur de géolocalisation')
        }

        // Étape 3 : Utiliser géocodage inverse avec Nominatim pour obtenir l'adresse complète
        let address = ''
        if (geoData.lat && geoData.lon) {
          try {
            const reverseGeoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${geoData.lat}&lon=${geoData.lon}&addressdetails=1&accept-language=fr`)
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
          }
        }

        // Mapper les données de l'API vers notre format
        const newFormData = {
          address: address || '',
          city: geoData.city || '',
          postalCode: geoData.zip || '',
          country: geoData.country || 'France'
        }
        setFormData(newFormData)
        
        // Stocker les coordonnées pour la carte
        if (geoData.lat && geoData.lon) {
          setCoordinates([geoData.lat, geoData.lon])
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la géolocalisation:', error)
        // En cas d'erreur, utiliser des valeurs par défaut
        setFormData({
          address: '',
          city: '',
          postalCode: '',
          country: 'France'
        })
        setLoading(false)
      }
    }

    fetchLocationFromIP()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise'
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise'
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onNext(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Localisation du compte</h1>
        <p className={styles.stepDescription}>
          Votre adresse a été détectée automatiquement depuis votre connexion. 
          Vous pouvez la modifier si nécessaire.
        </p>
      </div>

      {loading ? (
        <div className={styles.loadingMessage}>
          <p>Détection de votre localisation...</p>
        </div>
      ) : (
        <>
          <div className={styles.mapContainer}>
            {coordinates ? (
              <MapContainer
                center={coordinates}
                zoom={13}
                style={{ height: '300px', width: '100%', borderRadius: '8px', zIndex: 0 }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coordinates}>
                  <Popup>
                    {formData.address && `${formData.address}, `}
                    {formData.city} {formData.postalCode}
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapMarker}>📍</div>
                <p className={styles.mapText}>Carte interactive</p>
                <p className={styles.mapSubtext}>
                  {formData.address}, {formData.city} {formData.postalCode}
                </p>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Adresse *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
              placeholder="123 Rue de la République"
            />
            {errors.address && (
              <span className={styles.errorMessage}>{errors.address}</span>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.label}>
                Ville *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                placeholder="Paris"
              />
              {errors.city && (
                <span className={styles.errorMessage}>{errors.city}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="postalCode" className={styles.label}>
                Code postal *
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={`${styles.input} ${errors.postalCode ? styles.inputError : ''}`}
                placeholder="75001"
              />
              {errors.postalCode && (
                <span className={styles.errorMessage}>{errors.postalCode}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country" className={styles.label}>
              Pays *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={styles.select}
            >
              {COUNTRIES.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.buttonSecondary}>
          <ArrowLeftIcon className={styles.buttonIcon} />
          Retour
        </button>
        <button 
          type="submit" 
          className={styles.buttonPrimary}
          disabled={loading}
        >
          Continuer
        </button>
      </div>
    </form>
  )
}
