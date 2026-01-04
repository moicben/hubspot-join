import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../styles/Step.module.css'
import { ArrowLeftIcon, CheckIcon } from '../Icons'

export default function Step9VerifyIdentity({ data, onSubmit, onBack }) {
  const [qrCode, setQrCode] = useState(null)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const companyInfo = data?.companyInfo || { name: 'HubSpot' }
  // Génération d'un QR code (en production, vous utiliseriez une vraie API)
  useEffect(() => {
    // Simulation d'un QR code - en production, vous généreriez un vrai QR code
    // avec une bibliothèque comme qrcode.js ou une API backend
    const generateQRCode = () => {
      // Pour cette démo, on simule juste un placeholder
      // En production, vous généreriez un QR code avec une URL unique
      setQrCode('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5RUiBDT0RFPC90ZXh0Pjwvc3ZnPg==')
    }
    
    generateQRCode()
  }, [])

  const handleVerificationCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setVerificationCode(value)
    
    // Clear error when user types
    if (error) {
      setError('')
    }
    
    // Simulation : si le code fait 6 chiffres, on considère qu'il est vérifié
    if (value.length === 6) {
      setIsVerified(true)
    } else {
      setIsVerified(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isVerified) {
      setError('Veuillez scanner le QR code et entrer le code de vérification')
      return
    }

    onSubmit({ verified: true, verificationCode })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Vérifiez votre identité</h1>
        <p className={styles.stepDescription}>
          Scannez le QR code via votre téléphone ou application HubSpot pour finaliser votre inscription.
        </p>
      </div>

      <div className={styles.verificationContainer}>
        <div className={styles.qrCodeSection}>
          <div className={styles.qrCodeWrapper}>
            {qrCode ? (
              <Image 
                src={qrCode} 
                alt="QR Code de vérification" 
                width={200}
                height={200}
                unoptimized
                className={styles.qrCodeImage}
              />
            ) : (
              <div className={styles.qrCodePlaceholder}>
                <p>Génération du QR code...</p>
              </div>
            )}
          </div>
          <p className={styles.instructions}>
            Suivez les instructions et saisissez votre code de vérification.
          </p>
        </div>

        <div className={styles.verificationCodeSection}>
          <div className={styles.formGroup}>
            <label htmlFor="verificationCode" className={styles.label}>
              Code de vérification (6 chiffres) *
            </label>
            {error && (
              <div className={styles.formError}>
                {error}
              </div>
            )}
            <div className={styles.verificationInputWrapper}>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                className={`${styles.input} ${styles.verificationInput} ${isVerified ? styles.inputSuccess : ''} ${error ? styles.inputError : ''}`}
                placeholder="000000"
                maxLength="6"
              />
              {isVerified && (
                <div className={styles.successIndicator}>
                  <CheckIcon className={styles.successIcon} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.buttonSecondary}>
          <ArrowLeftIcon className={styles.buttonIcon} />
          Retour
        </button>
        <button 
          type="submit" 
          className={styles.buttonPrimary}
          disabled={!isVerified}
        >
          {"Accéder à l'espace "}{companyInfo?.name || 'HubSpot'}
        </button>
      </div>
    </form>
  )
}
