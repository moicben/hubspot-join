import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import OnboardingFlow from '../components/OnboardingFlow'
import ProgressBar from '../components/ProgressBar'
import ManageCookies from '../components/ManageCookies'
import styles from '../styles/Home.module.css'

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    if (router.isReady) {
      const { c, m, i, size, owner } = router.query
      
      // Vérifier si tous les paramètres requis sont présents
      const allParamsPresent = c && m && i && size && owner
      
      if (!allParamsPresent) {
        // Rediriger vers la page d'erreur si des paramètres manquent
        router.replace('/not-found')
      }
    }
  }, [router.isReady, router.query])

  // Ne rien afficher si les paramètres ne sont pas encore vérifiés ou s'ils sont invalides
  if (!router.isReady) {
    return null
  }

  const { c, m, i, size, owner } = router.query
  const allParamsPresent = c && m && i && size && owner

  if (!allParamsPresent) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image 
          src="/hubspot-logo.svg" 
          alt="HubSpot" 
          width={150}
          height={40}
          className={styles.logo}
        />
      </div>
      <ProgressBar currentStep={currentStep} />
      <OnboardingFlow onStepChange={setCurrentStep} />
      <ManageCookies />
    </div>
  )
}
