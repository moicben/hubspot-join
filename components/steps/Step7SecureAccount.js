import { useState } from 'react'
import styles from '../../styles/Step.module.css'
import { EyeIcon, EyeOffIcon, ArrowLeftIcon } from '../Icons'

export default function Step7SecureAccount({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    password: data.password || '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    const correctPassword = 'P1N4L3'

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password !== correctPassword) {
      newErrors.password = 'Le mot de passe est incorrect'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onNext({ password: formData.password })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Sécurisez votre compte</h1>
        <p className={styles.stepDescription}>
          Créez un mot de passe fort pour protéger votre compte HubSpot. 
          Vous devrez utiliser ce mot de passe pour vous connecter.
        </p>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Mot de passe *
        </label>
        <div className={styles.passwordInputWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            placeholder="Créez un mot de passe sécurisé"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
          >
            {showPassword ? (
              <EyeOffIcon className={styles.passwordToggleIcon} />
            ) : (
              <EyeIcon className={styles.passwordToggleIcon} />
            )}
          </button>
        </div>
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirmer le mot de passe *
        </label>
        <div className={styles.passwordInputWrapper}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
            placeholder="Confirmez votre mot de passe"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={styles.passwordToggle}
          >
            {showConfirmPassword ? (
              <EyeOffIcon className={styles.passwordToggleIcon} />
            ) : (
              <EyeIcon className={styles.passwordToggleIcon} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className={styles.errorMessage}>{errors.confirmPassword}</span>
        )}
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
