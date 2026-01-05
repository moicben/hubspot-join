import { useState, useEffect } from 'react'
import styles from '../styles/OnboardingFlow.module.css'
import StepVerification from './steps/StepVerification'

export default function VerificationFlow({ onStepChange }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyInfo: null,
    bankTransferCompleted: false,
    verificationCode: ''
  })

  // Récupération des données de l'entreprise depuis les paramètres d'URL
  useEffect(() => {
    // Récupération des paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search)
    
    // Construction de l'objet companyInfo à partir des paramètres d'URL
    const companyInfo = {
      name: urlParams.get('c'),
      m: urlParams.get('m'),
      i: urlParams.get('i'),
      size: urlParams.get('size'),
      owner: urlParams.get('owner')
    }
    
    setFormData(prev => ({ ...prev, companyInfo }))
  }, [])

  const handleNext = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }))
    if (currentStep < 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      if (onStepChange) {
        onStepChange(newStep)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      if (onStepChange) {
        onStepChange(newStep)
      }
    }
  }

  const handleSubmit = (stepData) => {
    const finalData = { ...formData, ...stepData }
    console.log('Vérification terminée:', finalData)
    alert('Vérification terminée avec succès!')
  }

  return (
    <div className={styles.onboardingContainer}>
      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <StepVerification 
            data={formData} 
            onSubmit={handleSubmit}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
