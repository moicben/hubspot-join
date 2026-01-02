import { useState } from 'react'
import styles from '../styles/ManageCookies.module.css'

export default function ManageCookies() {
  const [isOpen, setIsOpen] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  })

  const handleToggle = (cookieType) => {
    if (cookieType === 'essential') {
      // Les cookies essentiels ne peuvent pas être désactivés
      return
    }
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }))
  }

  const handleSave = () => {
    console.log('Cookie preferences saved:', cookiePreferences)
    setIsOpen(false)
  }

  return (
    <>
      <button 
        className={styles.cookieButton}
        onClick={() => setIsOpen(true)}
      >
        Manage Cookies
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupHeader}>
              <h2 className={styles.popupTitle}>Gestion des cookies</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.popupContent}>
              <p className={styles.popupDescription}>
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Vous pouvez personnaliser vos préférences ci-dessous.
              </p>

              <div className={styles.cookieOptions}>
                <div className={styles.cookieOption}>
                  <div className={styles.cookieOptionHeader}>
                    <h3 className={styles.cookieOptionTitle}>Cookies essentiels</h3>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={cookiePreferences.essential}
                        disabled
                        className={styles.toggleInput}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <p className={styles.cookieOptionDescription}>
                    Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
                  </p>
                </div>

                <div className={styles.cookieOption}>
                  <div className={styles.cookieOptionHeader}>
                    <h3 className={styles.cookieOptionTitle}>Cookies analytiques</h3>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={cookiePreferences.analytics}
                        onChange={() => handleToggle('analytics')}
                        className={styles.toggleInput}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <p className={styles.cookieOptionDescription}>
                    Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site.
                  </p>
                </div>

                <div className={styles.cookieOption}>
                  <div className={styles.cookieOptionHeader}>
                    <h3 className={styles.cookieOptionTitle}>Cookies marketing</h3>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={cookiePreferences.marketing}
                        onChange={() => handleToggle('marketing')}
                        className={styles.toggleInput}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <p className={styles.cookieOptionDescription}>
                    Ces cookies sont utilisés pour vous proposer des publicités personnalisées.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.popupFooter}>
              <button 
                className={styles.saveButton}
                onClick={handleSave}
              >
                Enregistrer les préférences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
