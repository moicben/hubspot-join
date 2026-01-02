import styles from '../styles/ProgressBar.module.css'

export default function ProgressBar({ currentStep, totalSteps = 9 }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
