import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import VerificationFlow from '../components/VerificationFlow'
import { trackScanned } from '../lib/tracking'
import styles from '../styles/Home.module.css'

export default function Verification() {
  const router = useRouter()
  const hasTracked = useRef(false)

  useEffect(() => {
    // Ajouter la classe pour override les styles globaux
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('verificationPage')
      document.body.classList.add('verificationPage')
    }

    return () => {
      // Nettoyer la classe au démontage
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('verificationPage')
        document.body.classList.remove('verificationPage')
      }
    }
  }, [])

  useEffect(() => {
    if (router.isReady && !hasTracked.current) {
      const { c, m, i, size, owner } = router.query
      
      // Vérifier si tous les paramètres requis sont présents
      const allParamsPresent = c && m && i && size && owner
      
      if (!allParamsPresent) {
        // Rediriger vers la page d'erreur si des paramètres manquent
        router.replace('/not-found')
        return
      }

      // Marquer comme tracké pour éviter les appels multiples
      hasTracked.current = true

      // Récupérer le sessionId depuis l'URL ou sessionStorage
      let sessionId = null
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        sessionId = params.get('sessionId') || sessionStorage.getItem('sessionId')
        
        // Stocker le sessionId dans sessionStorage pour la navigation
        if (sessionId) {
          sessionStorage.setItem('sessionId', sessionId)
        }
      }

      // Tracking de l'événement "scanned" à l'arrivée sur la page
      const companyInfo = {
        name: c,
        m: m,
        i: i,
        size: size,
        owner: owner
      }

      trackScanned({
        companyInfo,
        details: {
          sessionId: sessionId || undefined,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
        },
      }).catch((error) => {
        console.error('Erreur tracking scanned:', error);
        // Ne pas bloquer le flux en cas d'erreur de tracking
      });
    }
  }, [router.isReady, router.query])

  // Ne rien afficher si les paramètres ne sont pas encore vérifiés ou s'ils sont invalides
  if (!router.isReady) {
    return null
  }

  const { c, m, i, size, owner } = router.query
  const allParamsPresent = c && m && i && size && owner

  if (!allParamsPresent) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image 
          src="/hubspot-logo.svg" 
          alt="HubSpot" 
          width={200}
          height={53}
          className={styles.logo}
        />
      </div>
      <VerificationFlow />
    </div>
  )
}
