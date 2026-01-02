import { useState, useEffect } from 'react'
import styles from '../../styles/Step.module.css'

export default function Step1Invitation({ data, onNext }) {
  const [companyInfo, setCompanyInfo] = useState(data?.companyInfo || {
    name: '',
    email: '',
    industry: '',
    size: '',
    adminName: '',
    adminEmail: '',
    invitedBy: '',
    invitedDate: ''
  })
  const [loading, setLoading] = useState(!data?.companyInfo)

  useEffect(() => {
    // Si les données ne sont pas déjà disponibles via props, on les récupère depuis l'API
    if (!data?.companyInfo) {
      fetch('/api/transaction-data')
        .then(res => res.json())
        .then(apiData => {
          setCompanyInfo(apiData.companyInfo)
          setLoading(false)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error)
          setLoading(false)
        })
    }
  }, [data?.companyInfo])

  const handleJoin = () => {
    onNext({ invitationAccepted: true, companyInfo })
  }

  if (loading) {
    return (
      <div className={styles.stepForm}>
        <div className={styles.stepHeader}>
          <h1 className={styles.stepTitle}>Invitation HubSpot Pro</h1>
          <p className={styles.stepDescription}>Chargement des informations...</p>
        </div>
      </div>
    )
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
            <p className={styles.companyDetails}>{companyInfo.industry} • {companyInfo.size}</p>
          </div>
        </div>

        <div className={styles.invitationDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Email de l'entreprise :</span>
            <span className={styles.detailValue}>{companyInfo.email}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Administrateur :</span>
            <span className={styles.detailValue}>{companyInfo.adminName}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Invité par :</span>
            <span className={styles.detailValue}>{companyInfo.invitedBy}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Date d'invitation :</span>
            <span className={styles.detailValue}>{companyInfo.invitedDate}</span>
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
