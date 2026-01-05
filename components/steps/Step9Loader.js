import { useState, useEffect } from 'react'
import styles from '../../styles/Step.module.css'

export default function Step9Loader({ data, onNext }) {
  const [currentLoaderText, setCurrentLoaderText] = useState(0)
  
  const loaderTexts = [
    'Création du compte',
    'Préparation du tableau de bord',
    'Attribution des permissions',
    'Configuration des paramètres',
    'Finalisation de l\'inscription',
    'Chargement des données'
  ]

  const loaderDuration = 20000 // 20 secondes
  const textChangeInterval = loaderDuration / loaderTexts.length // Change de texte toutes les ~3.3 secondes

  // Gestion du loader
  useEffect(() => {
    // Timer pour changer les textes
    const textInterval = setInterval(() => {
      setCurrentLoaderText((prev) => (prev + 1) % loaderTexts.length)
    }, textChangeInterval)

    // Timer pour passer à l'étape suivante après 20 secondes
    const loaderTimeout = setTimeout(() => {
      onNext({})
    }, loaderDuration)

    return () => {
      clearInterval(textInterval)
      clearTimeout(loaderTimeout)
    }
  }, [textChangeInterval, loaderDuration, loaderTexts.length, onNext])

  return (
    <div className={styles.stepForm}>
      <div className={styles.loaderCard}>
        <div className={styles.loaderSpinner}>
          <div className={styles.loaderCircle}></div>
        </div>
        <div className={styles.loaderTextContainer}>
          <p 
            className={styles.loaderText}
            key={currentLoaderText}
          >
            {loaderTexts[currentLoaderText]}
          </p>
        </div>
      </div>
    </div>
  )
}
