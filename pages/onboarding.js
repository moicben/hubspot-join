import { useState } from 'react'
import Image from 'next/image'
import OnboardingFlow from '../components/OnboardingFlow'
import ProgressBar from '../components/ProgressBar'
import ManageCookies from '../components/ManageCookies'
import styles from '../styles/Home.module.css'

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1)

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
