import Image from 'next/image'
import styles from '../styles/Home.module.css'
import stepStyles from '../styles/Step.module.css'
import notFoundStyles from '../styles/NotFound.module.css'

export default function NotFound() {
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
      
      <div className={notFoundStyles.contentWrapper}>
        <div className={stepStyles.stepForm}>
          <div className={stepStyles.stepHeader}>
            <h1 className={stepStyles.stepTitle}>Erreur d'invitation</h1>
            <p className={stepStyles.stepDescription}>
              L'invitation que vous avez reçue n'est pas valide ou a expiré.
            </p>
          </div>

          <div className={stepStyles.invitationCard}>
            <div className={stepStyles.invitationMessage}>
              <p style={{ color: '#ff4444', fontWeight: 500 }}>
                Erreur : Invitation invalide
              </p>
              <p style={{ marginTop: '1rem', marginBottom: 0 }}>
                Veuillez vérifier le lien d'invitation que vous avez reçu ou contacter 
                l'administrateur de votre entreprise pour obtenir une nouvelle invitation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
