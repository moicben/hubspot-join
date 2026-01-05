import { useState, useEffect } from 'react'
import Step1Invitation from './steps/Step1Invitation'
import Step2Permissions from './steps/Step2Permissions'
import Step3WhyJoin from './steps/Step3WhyJoin'
import Step4Features from './steps/Step4Features'
import Step5AccountDetails from './steps/Step5AccountDetails'
import Step6Location from './steps/Step6Location'
import Step7SecureAccount from './steps/Step7SecureAccount'
import Step8Policies from './steps/Step8Policies'
import Step9VerifyIdentity from './steps/Step9VerifyIdentity'
import styles from '../styles/OnboardingFlow.module.css'

export default function OnboardingFlow({ onStepChange }) {
  const [currentStep, setCurrentStep] = useState(9) // TEMPORAIRE: Phase 9 en premier pour tests
  const [formData, setFormData] = useState({
    // Step 1: Invitation
    invitationAccepted: false,
    companyInfo: null,
    // Step 2: Permissions
    joinPassword: '',
    // Step 3: Why join
    reasons: [],
    customReason: '',
    // Step 4: Features
    features: [],
    // Step 5: Account details
    fullName: '',
    email: '',
    phone: '',
    // Step 6: Location
    address: '',
    city: '',
    postalCode: '',
    country: '',
    // Step 7: Secure account
    password: '',
    confirmPassword: '',
    // Step 8: Policies
    allAccepted: false,
    // Step 9: Verify identity
    verified: false
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
    // TEMPORAIRE: Après l'étape 9, passer à l'étape 1
    if (currentStep === 9) {
      const newStep = 1
      setCurrentStep(newStep)
      if (onStepChange) {
        onStepChange(newStep)
      }
    } else if (currentStep < 9) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      if (onStepChange) {
        onStepChange(newStep)
      }
    }
  }

  const handleBack = () => {
    // TEMPORAIRE: Depuis l'étape 1, revenir à l'étape 9
    if (currentStep === 1) {
      const newStep = 9
      setCurrentStep(newStep)
      if (onStepChange) {
        onStepChange(newStep)
      }
    } else if (currentStep > 1) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      if (onStepChange) {
        onStepChange(newStep)
      }
    }
  }

  const handleSubmit = (stepData) => {
    const finalData = { ...formData, ...stepData }
    console.log('Final form data:', finalData)
    // Ici vous pouvez ajouter la logique de soumission
    alert('Inscription terminée avec succès!')
  }

  return (
    <div className={styles.onboardingContainer}>
      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <Step1Invitation 
            data={formData} 
            onNext={handleNext} 
          />
        )}
        {currentStep === 2 && (
          <Step2Permissions 
            data={formData} 
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <Step3WhyJoin 
            data={formData} 
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <Step4Features 
            data={formData} 
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <Step5AccountDetails 
            data={formData} 
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 6 && (
          <Step6Location 
            data={formData} 
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 7 && (
          <Step7SecureAccount 
            data={formData} 
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 8 && (
          <Step8Policies 
            data={formData} 
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 9 && (
          <Step9VerifyIdentity 
            data={formData} 
            onSubmit={handleSubmit}
            onNext={handleNext} // TEMPORAIRE: Permet la navigation vers l'étape suivante
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
