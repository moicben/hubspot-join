import { useState } from 'react'
import styles from '../../styles/Step.module.css'
import { ArrowLeftIcon, CheckIcon } from '../Icons'

export default function StepVerification({ data, onSubmit, onNext, onBack }) {
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')
  const companyInfo = data?.companyInfo || { name: 'HubSpot' }

  // Générer un code de référence unique pour le virement (exemple simple)
  const generateReferenceCode = () => {
    return `HSP-${Date.now().toString().slice(-8)}`
  }

  const referenceCode = generateReferenceCode()

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
      setError('Veuillez effectuer le virement et entrer le code de vérification')
      return
    }

    if (onNext) {
      onNext({ bankTransferCompleted: true, verificationCode })
    } else {
      onSubmit({ bankTransferCompleted: true, verificationCode })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Vérification par virement bancaire</h1>
        <p className={styles.stepDescription}>
          Effectuez un virement bancaire éphémère sur notre compte séquestre pour vérifier votre identité.
        </p>
      </div>

      <div className={styles.verificationContainer}>
        <div className={styles.bankTransferSection}>
          <div className={styles.bankInfoCard}>
            <h3 className={styles.bankInfoTitle}>Informations de virement</h3>
            <div className={styles.bankDetails}>
              <div className={styles.bankDetailRow}>
                <span className={styles.bankDetailLabel}>IBAN :</span>
                <span className={styles.bankDetailValue}>FR76 1234 5678 9012 3456 7890 123</span>
              </div>
              <div className={styles.bankDetailRow}>
                <span className={styles.bankDetailLabel}>BIC :</span>
                <span className={styles.bankDetailValue}>ABCDFRPP</span>
              </div>
              <div className={styles.bankDetailRow}>
                <span className={styles.bankDetailLabel}>Titulaire :</span>
                <span className={styles.bankDetailValue}>HubSpot - Compte Séquestre</span>
              </div>
              <div className={styles.bankDetailRow}>
                <span className={styles.bankDetailLabel}>Montant :</span>
                <span className={styles.bankDetailValue}>1,00 €</span>
              </div>
              <div className={styles.bankDetailRow}>
                <span className={styles.bankDetailLabel}>Référence :</span>
                <span className={styles.bankDetailValue}>{referenceCode}</span>
              </div>
            </div>
            <div className={styles.bankInstructions}>
              <p className={styles.instructionsText}>
                <strong>Instructions :</strong>
              </p>
              <ul className={styles.instructionsList}>
                <li>Effectuez un virement de 1,00 € vers le compte ci-dessus</li>
                <li>Utilisez la référence <strong>{referenceCode}</strong> dans le libellé du virement</li>
                <li>Le virement sera automatiquement vérifié dans les 24 heures</li>
                <li>Une fois le virement confirmé, vous recevrez un code de vérification par email</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.verificationCodeSection}>
          <div className={styles.formGroup}>
            <label htmlFor="verificationCode" className={styles.label}>
              Code de vérification (6 chiffres) *
            </label>
            <p className={styles.helpText}>
              Entrez le code de vérification reçu par email après confirmation du virement.
            </p>
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
          Valider la vérification
        </button>
      </div>
    </form>
  )
}
