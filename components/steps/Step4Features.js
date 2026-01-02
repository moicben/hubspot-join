import { useState } from 'react'
import styles from '../../styles/Step.module.css'
import { ArrowLeftIcon } from '../Icons'

export default function Step4Features({ data, onNext, onBack }) {
  const [selectedFeatures, setSelectedFeatures] = useState(data.features || [])
  const [error, setError] = useState('')

  const features = [
    { id: 'crm', label: 'CRM et gestion des contacts', description: 'Gérer vos contacts et opportunités' },
    { id: 'marketing', label: 'Marketing automation', description: 'Automatiser vos campagnes marketing' },
    { id: 'sales', label: 'Gestion des ventes', description: 'Suivre vos pipelines et transactions' },
    { id: 'service', label: 'Service client', description: 'Gérer les tickets et le support' },
    { id: 'cms', label: 'CMS Hub', description: 'Créer et gérer votre site web' },
    { id: 'reporting', label: 'Rapports et analyses', description: 'Analyser vos performances' },
    { id: 'integrations', label: 'Intégrations', description: 'Connecter vos outils existants' },
    { id: 'email', label: 'Email marketing', description: 'Créer et envoyer des emails' },
    { id: 'social', label: 'Médias sociaux', description: 'Gérer vos réseaux sociaux' },
    { id: 'landing', label: 'Pages de destination', description: 'Créer des landing pages' }
  ]

  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId)
      } else {
        return [...prev, featureId]
      }
    })
    // Clear error when user makes a selection
    if (error) {
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedFeatures.length === 0) {
      setError('Veuillez sélectionner au moins une fonctionnalité')
      return
    }

    onNext({ features: selectedFeatures })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Quelles fonctionnalités prévoyez-vous d'utiliser ?</h1>
        <p className={styles.stepDescription}>
          Sélectionnez les fonctionnalités HubSpot que vous souhaitez utiliser. 
          Cela nous aide à personnaliser votre expérience.
        </p>
      </div>

      {error && (
        <div className={styles.formError}>
          {error}
        </div>
      )}
      <div className={styles.featuresGrid}>
        {features.map(feature => (
          <label 
            key={feature.id} 
            className={`${styles.featureCard} ${selectedFeatures.includes(feature.id) ? styles.featureCardSelected : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature.id)}
              onChange={() => handleFeatureToggle(feature.id)}
              className={styles.checkbox}
            />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>{feature.label}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          </label>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.buttonSecondary}>
          <ArrowLeftIcon className={styles.buttonIcon} />
          Retour
        </button>
        <button type="submit" className={styles.buttonPrimary}>
          Continuer
        </button>
      </div>
    </form>
  )
}
