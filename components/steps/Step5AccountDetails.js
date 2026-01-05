import { useState } from 'react'
import styles from '../../styles/Step.module.css'
import { ArrowLeftIcon } from '../Icons'

export default function Step5AccountDetails({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    phone: data.phone || '',
    aboutMe: data.aboutMe || ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Veuillez entrer un numéro de téléphone valide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onNext(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Détails du compte</h1>
        <p className={styles.stepDescription}>
          Remplissez vos informations personnelles pour créer votre compte HubSpot.
        </p>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            Prénom *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
            placeholder="Prénom"
          />
          {errors.firstName && (
            <span className={styles.errorMessage}>{errors.firstName}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Nom *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
            placeholder="Nom"
          />
          {errors.lastName && (
            <span className={styles.errorMessage}>{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder="votre.email@exemple.com"
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          Téléphone *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          placeholder="+33 6 12 34 56 78"
        />
        {errors.phone && (
          <span className={styles.errorMessage}>{errors.phone}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="aboutMe" className={styles.label}>
          À propos de moi
        </label>
        <textarea
          id="aboutMe"
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Parlez-nous un peu de vous (optionnel)..."
          rows="4"
        />
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
