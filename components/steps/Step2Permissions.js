import { useState } from 'react'
import styles from '../../styles/Step.module.css'
import { ArrowLeftIcon } from '../Icons'
import { 
  ContactsIcon, 
  EmailIcon, 
  DashboardIcon, 
  IntegrationsIcon, 
  SupportIcon,
  EyeIcon,
  EyeOffIcon
} from '../Icons'

export default function Step2Permissions({ data, onNext, onBack }) {
  const [password, setPassword] = useState(data.joinPassword || '')
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  // Permissions du compte Free
  const freeAccountPermissions = [
    {
      title: 'Gestion des contacts',
      description: 'Ajouter, modifier et supprimer jusqu\'à 1 000 contacts',
      icon: ContactsIcon
    },
    {
      title: 'Email marketing',
      description: 'Envoyer jusqu\'à 2 000 emails par mois',
      icon: EmailIcon
    },
    {
      title: 'Tableaux de bord',
      description: 'Accéder aux rapports et analyses de base',
      icon: DashboardIcon
    },
    {
      title: 'Intégrations',
      description: 'Connecter jusqu\'à 5 intégrations tierces',
      icon: IntegrationsIcon
    },
    {
      title: 'Support communautaire',
      description: 'Accès au forum et à la base de connaissances',
      icon: SupportIcon
    }
  ]

  const handleChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (errors.password) {
      setErrors({})
    }
  }

  const validate = () => {
    if (!password.trim()) {
      setErrors({ password: 'Le mot de passe est requis pour rejoindre l\'entreprise' })
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onNext({ joinPassword: password })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Permissions du compte</h1>
        <p className={styles.stepDescription}>
          Voici les permissions dont vous disposerez avec votre accès <strong>HubSpot Pro</strong>
        </p>
      </div>

      <div className={styles.permissionsList}>
        {freeAccountPermissions.map((permission, index) => {
          const IconComponent = permission.icon
          return (
            <div key={index} className={styles.permissionItem}>
              <div className={styles.permissionIcon}>
                <IconComponent className={styles.permissionIconSvg} />
              </div>
              <div className={styles.permissionContent}>
                <h3 className={styles.permissionTitle}>{permission.title}</h3>
                <p className={styles.permissionDescription}>{permission.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="joinPassword" className={styles.label}>
          Code d'invitation *
        </label>
        <div className={styles.passwordInputWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="joinPassword"
            name="joinPassword"
            value={password}
            onChange={handleChange}
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            placeholder="Entrez votre code invité"
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
        <p className={styles.helpText}>
          Ce code vous a été communiqué dans l'email d'invitation.
        </p>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.buttonPrimary}>
          Confirmer
        </button>
      </div>
    </form>
  )
}
