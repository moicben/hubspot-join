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
  const [currentStep, setCurrentStep] = useState(1)
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

  // Récupération des données de l'entreprise au chargement
  useEffect(() => {
    fetch('/api/transaction-data')
      .then(res => res.json())
      .then(data => {
        setFormData(prev => ({ ...prev, companyInfo: data.companyInfo }))
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error)
      })
  }, [])

  const handleNext = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }))
    if (currentStep < 9) {
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
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
