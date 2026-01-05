import { useState } from 'react'
import styles from '../../styles/Step.module.css'
import { ArrowLeftIcon } from '../Icons'

export default function Step3WhyJoin({ data, onNext, onBack }) {
  const [selectedReasons, setSelectedReasons] = useState(data.reasons || [])
  const [customReason, setCustomReason] = useState('')
  const [error, setError] = useState('')

  const reasons = [
    { id: 'analytics', label: 'Centraliser les communications avec mon équipe' },
    { id: 'automation', label: 'Automatiser mes processus marketing et ventes' },
    { id: 'crm', label: 'Gérer efficacement mes contacts et clients' },
    { id: 'integration', label: 'Gérer efficacement mes opportunités' },
    { id: 'scalability', label: 'Améliorer ma gestion au quotidien' },
    { id: 'support', label: "Bénéficier d'un support expert" }
  ]

  const handleReasonToggle = (reasonId) => {
    setSelectedReasons(prev => {
      if (prev.includes(reasonId)) {
        return prev.filter(id => id !== reasonId)
      } else {
        return [...prev, reasonId]
      }
    })
    // Clear error when user makes a selection
    if (error) {
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedReasons.length === 0 && !customReason.trim()) {
      setError('Veuillez sélectionner au moins une raison ou en ajouter une personnalisée')
      return
    }

    const reasonsData = {
      reasons: selectedReasons,
      customReason: customReason.trim()
    }
    
    onNext(reasonsData)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Pourquoi rejoindre HubSpot Pro ?</h1>
        <p className={styles.stepDescription}>
          Aidez-nous à comprendre vos objectifs. Vous pouvez sélectionner plusieurs options.
        </p>
      </div>

      <div className={styles.formGroup}>
        {error && (
          <div className={styles.formError}>
            {error}
          </div>
        )}
        <div className={styles.checkboxGroup}>
          {reasons.map(reason => (
            <label key={reason.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedReasons.includes(reason.id)}
                onChange={() => handleReasonToggle(reason.id)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>{reason.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="customReason" className={styles.label}>
          Autre raison (optionnel)
        </label>
        <textarea
          id="customReason"
          name="customReason"
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          className={styles.textarea}
          placeholder="Décrivez votre raison personnalisée..."
          rows="4"
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.buttonSecondary}>
          <ArrowLeftIcon className={styles.buttonSecondaryIcon} />
          Retour
        </button>
        <button type="submit" className={styles.buttonPrimary}>
          Continuer
        </button>
      </div>
    </form>
  )
}
