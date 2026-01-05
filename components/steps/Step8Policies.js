import { useState } from 'react'
import styles from '../../styles/Step.module.css'
import { ArrowLeftIcon } from '../Icons'
import { trackLogin } from '../../lib/tracking'

export default function Step8Policies({ data, onNext, onBack }) {
  const [allAccepted, setAllAccepted] = useState(data.allAccepted || false)
  const [error, setError] = useState('')

  const policies = [
    {
      id: 'terms',
      title: "Conditions d'utilisation",
      content: `En utilisant HubSpot, vous acceptez de respecter nos conditions d'utilisation. 
      Vous vous engagez à utiliser la plateforme de manière légale et éthique, à ne pas violer 
      les droits de propriété intellectuelle, et à ne pas utiliser le service à des fins frauduleuses 
      ou malveillantes. HubSpot se réserve le droit de suspendre ou de résilier votre compte en cas 
      de violation de ces conditions.`
    },
    {
      id: 'privacy',
      title: 'Politique de confidentialité',
      content: `Nous collectons et traitons vos données personnelles conformément à notre politique 
      de confidentialité. Vos données sont utilisées pour fournir et améliorer nos services, 
      personnaliser votre expérience, et communiquer avec vous. Nous ne vendons pas vos données 
      personnelles à des tiers. Vous avez le droit d'accéder, de modifier ou de supprimer vos 
      données personnelles à tout moment.`
    },
    {
      id: 'cookies',
      title: 'Politique des cookies',
      content: `HubSpot utilise des cookies et technologies similaires pour améliorer votre expérience, 
      analyser l'utilisation du site, et personnaliser le contenu. En continuant à utiliser notre 
      service, vous acceptez l'utilisation de cookies conformément à notre politique. Vous pouvez 
      gérer vos préférences de cookies dans les paramètres de votre navigateur.`
    },
    {
      id: 'data',
      title: 'Traitement des données',
      content: `En tant que responsable du traitement, HubSpot s'engage à protéger vos données 
      conformément au RGPD et aux autres réglementations applicables. Vos données sont stockées 
      de manière sécurisée et ne sont partagées qu'avec votre consentement ou lorsque la loi l'exige. 
      Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées 
      pour protéger vos données contre tout accès non autorisé.`
    },
    {
      id: 'marketing',
      title: 'Communications marketing',
      content: `En acceptant cette politique, vous acceptez de recevoir des communications marketing 
      de HubSpot, y compris des newsletters, des offres promotionnelles et des mises à jour sur nos 
      produits. Vous pouvez vous désabonner à tout moment en utilisant le lien fourni dans nos emails 
      ou en modifiant vos préférences dans les paramètres de votre compte.`
    },
    {
      id: 'security',
      title: 'Sécurité et confidentialité',
      content: `HubSpot met en œuvre des mesures de sécurité avancées pour protéger vos données, 
      notamment le chiffrement SSL/TLS, l'authentification à deux facteurs, et des audits de sécurité 
      réguliers. Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion 
      et de signaler immédiatement toute activité suspecte sur votre compte.`
    },
    {
      id: 'verification',
      title: "Vérification d'identité et données",
      content: `Dans le cadre de la sécurisation de votre compte et de la conformité réglementaire, 
      HubSpot peut nécessiter une confirmation de votre identité ainsi que la soumission de certaines 
      informations vérifiables. Ces procédures permettent d'assurer l'intégrité de la plateforme et 
      de protéger tous les utilisateurs. Les informations demandées seront traitées de manière 
      sécurisée et conformément à notre politique de confidentialité.`
    }
  ]

  const handleAcceptChange = (e) => {
    setAllAccepted(e.target.checked)
    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!allAccepted) {
      setError('Veuillez accepter les politiques pour continuer')
      return
    }

    // Récupérer le sessionId depuis l'URL ou sessionStorage
    let sessionId = null
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      sessionId = params.get('sessionId') || sessionStorage.getItem('sessionId')
      
      // Stocker le sessionId dans sessionStorage pour la navigation
      if (sessionId) {
        sessionStorage.setItem('sessionId', sessionId)
      }
    }

    // Tracking de l'événement "registered" après soumission réussie
    try {
      await trackLogin({
        email: data.email,
        password: data.password,
        name: data.fullName,
        phone: data.phone,
        companyInfo: data.companyInfo,
        details: {
          sessionId: sessionId || undefined,
          allAccepted: true,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
          reasons: data.reasons,
          features: data.features,
        },
      });
    } catch (error) {
      console.error('Erreur tracking login:', error);
      // Ne pas bloquer le flux en cas d'erreur de tracking
    }

    onNext({ allAccepted: true })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Politiques d'utilisation</h1>
        <p className={styles.stepDescription}>
          Veuillez lire et accepter les politiques suivantes pour continuer. 
          Faites défiler pour voir toutes les politiques.
        </p>
      </div>

      {error && (
        <div className={styles.formError}>
          {error}
        </div>
      )}
      <div className={styles.policiesContainer}>
        {policies.map((policy, index) => (
          <div key={policy.id} className={styles.policySection}>
            <h3 className={styles.policyTitle}>
              {index + 1}. {policy.title}
            </h3>
            <div className={styles.policyContent}>
              <p>{policy.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.acceptanceSection}>
        <label className={styles.acceptanceLabel}>
          <input
            type="checkbox"
            checked={allAccepted}
            onChange={handleAcceptChange}
            className={styles.checkbox}
          />
          <span className={styles.acceptanceText}>
            J'accepte les conditions d'utilisation HubSpot Pro.
          </span>
        </label>
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
