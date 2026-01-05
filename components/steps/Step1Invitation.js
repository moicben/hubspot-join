import { useState, useEffect } from 'react'
import styles from '../../styles/Step.module.css'

export default function Step1Invitation({ data, onNext }) {
  const [companyInfo, setCompanyInfo] = useState(data?.companyInfo || {
    name: 'TechCorp Solutions',
    m: 'contact@techcorp-solutions.com',
    i: 'Technologie',
    size: '50',
    owner: 'Jean Martin',
  })

  useEffect(() => {
    // Mise à jour des données si elles sont disponibles via props
    if (data?.companyInfo) {
      setCompanyInfo(data.companyInfo)
    }
  }, [data?.companyInfo])

  const handleJoin = () => {
    onNext({ invitationAccepted: true, companyInfo })
  }

  return (
    <div className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Invitation HubSpot Pro</h1>
        <p className={styles.stepDescription}>
          Vous avez été invité à rejoindre l'équipe HubSpot <br /> {companyInfo.name}
        </p>
      </div>

      <div className={styles.invitationCard}>
        <div className={styles.invitationHeader}>
          <div className={styles.companyLogo}>
            <div className={styles.logoPlaceholder}>
              {companyInfo.name ? companyInfo.name.charAt(0) : ''}
            </div>
          </div>
          <div className={styles.companyInfo}>
            <h2 className={styles.companyName}>{companyInfo.name}</h2>
            <p className={styles.companyDetails}>{companyInfo.i} • {companyInfo.size} membres</p>
          </div>
        </div>

        <div className={styles.invitationDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Email de l'entreprise :</span>
            <span className={styles.detailValue}>{companyInfo.m}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Taille de l'équipe :</span>
            <span className={styles.detailValue}>{companyInfo.size || '0'} membres</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Invité par :</span>
            <span className={styles.detailValue}>{companyInfo.owner}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Date d'invitation :</span>
            <span className={styles.detailValue}>{new Date().toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        <div className={styles.invitationMessage}>
          <p>
            En rejoignant ce compte HubSpot, vous aurez accès aux outils de marketing, 
            de vente et de service client de l'entreprise. Vous pourrez collaborer avec 
            votre équipe et gérer les contacts, les campagnes et les rapports.
          </p>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          type="button" 
          onClick={handleJoin} 
          className={styles.buttonPrimary}
        >
          Rejoindre l'équipe
        </button>
      </div>
    </div>
  )
}
