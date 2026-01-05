import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { c, m, i, size, owner } = router.query
      
      // Vérifier si tous les paramètres requis sont présents
      const allParamsPresent = c && m && i && size && owner
      
      if (allParamsPresent) {
        // Rediriger vers onboarding avec tous les paramètres
        router.replace({
          pathname: '/onboarding',
          query: router.query
        })
      } else {
        // Rediriger vers la page d'erreur
        router.replace('/not-found')
      }
    }
  }, [router.isReady, router.query])

  // Afficher un loader pendant la vérification
  return null
}
