import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import styles from '../../styles/Step.module.css'

export default function Step10VerifyIdentity({ data }) {
  const [verificationUrl, setVerificationUrl] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)
  
  // Génération de l'URL de vérification avec les mêmes paramètres que l'URL source
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Récupérer les paramètres de l'URL actuelle
      const urlParams = new URLSearchParams(window.location.search)
      
      // Construire l'URL de vérification avec les mêmes paramètres
      const baseUrl = window.location.origin
      const verificationParams = new URLSearchParams()
      
      // Conserver tous les paramètres de l'URL source
      urlParams.forEach((value, key) => {
        verificationParams.append(key, value)
      })
      
      const verificationUrlString = `${baseUrl}/verification?${verificationParams.toString()}`
      setVerificationUrl(verificationUrlString)
    }
  }, [])

  // Animation de rotation du loader toutes les 8 secondes
  useEffect(() => {
    // Fonction pour activer la rotation pendant quelques secondes
    const startSpinning = () => {
      // Nettoyer le timeout précédent s'il existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      setIsSpinning(true)
      
      timeoutRef.current = setTimeout(() => {
        setIsSpinning(false)
        timeoutRef.current = null
      }, 4600) // Tourner pendant 4.6 secondes
    }

    // Démarrer la rotation immédiatement au chargement
    startSpinning()

    // Puis répéter toutes les 8 secondes
    intervalRef.current = setInterval(() => {
      startSpinning()
    }, 6000) // Répéter toutes les 6 secondes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Aidez-nous à vérifier votre identité</h1>
        <p className={styles.stepDescription}>
          Finalisez votre inscription en vérifiant votre compte depuis votre téléphone ou via l'application HubSpot.
        </p>
      </div>

      <div className={styles.verificationContainer}>
        <div className={styles.qrCodeSection}>
          <h3 className={styles.qrCodeTitle}>QR Code à scanner</h3>
          <div className={styles.qrCodeWrapper}>
            {verificationUrl ? (
              <div className={styles.qrCodeImage}>
                <QRCodeSVG 
                  value={verificationUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
            ) : (
              <div className={styles.qrCodePlaceholder}>
                <p>Génération du QR code...</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.invitationCard}>
          <div className={styles.invitationMessage}>
            <p>
              Une fois votre identité vérifiée, votre serez redirigé vers votre espace personnel, ne fermez pas cette page pour ne pas perdre vos informations.
            </p>
          </div>
        </div>

        {/* Loader de rafraîchissement */}
        <div className={styles.statusLoaderContainer}>
          <div className={`${styles.statusLoader} ${isSpinning ? styles.statusLoaderSpinning : ''}`}></div>
          <p className={styles.statusLoaderText}>Rafraichissement du status</p>
        </div>

        <div className={styles.verificationNotice}>
          <p>
            La vérification de votre identité est obligatoire pour garantir la sécurité et la conformité de votre compte. 
            Cette procédure est requise conformément aux réglementations en vigueur Hubspot Pro et WorksBase.
          </p>
        </div>
      </div>
    </div>
  )
}
