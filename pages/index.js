import { useState } from 'react'
import OnboardingFlow from '../components/OnboardingFlow'
import ProgressBar from '../components/ProgressBar'
import ManageCookies from '../components/ManageCookies'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img 
          src="/hubspot-logo.svg" 
          alt="HubSpot" 
          className={styles.logo}
        />
      </div>
      <ProgressBar currentStep={currentStep} />
      <OnboardingFlow onStepChange={setCurrentStep} />
      <ManageCookies />
    </div>
  )
}
