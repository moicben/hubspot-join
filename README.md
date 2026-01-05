
# Domain URL with variables 
https://hubspot.worksbase.pro/?c=Ma%20Société&m=contact@masociete.com&i=Finance&size=25&owner=Marie%20Dupont
http://localhost:3000/?c=Ma%20Société&m=contact@masociete.com&i=Finance&size=25&owner=Marie%20Dupont
 

# HubSpot Join - Onboarding Multi-étapes

Projet Next.js avec JavaScript vanilla (modules ES6) pour un processus d'onboarding HubSpot en 3 étapes.

## Caractéristiques

- **Branding HubSpot** : Design corporate avec UX efficace
- **Police** : Lexend Deca (partout)
- **Couleurs** :
  - `#0a0a0a` pour tous les textes
  - `#FF4802` pour les boutons
- **Onboarding en 9 étapes** :
  1. Intro + Détails de l'invitation (informations d'entreprise fictive déjà existantes + bouton rejoindre)
  2. Récap permission sous forme de liste du compte "Free" + mot de passe à saisir pour rejoindre l'entreprise
  3. Why joining Hubspot Pro → choices inputs
  4. Which features you plan to use → choices inputs
  5. Account details : full name + email + phone
  6. Account location : prefilled address (from ip & mini map)
  7. Secure your account → password x2
  8. Accept Hubspot policies → very long page with input radios
  9. Verify your identity : QR Code to scan from phone

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
hubspot-join/
├── components/
│   ├── OnboardingFlow.js          # Composant principal du flux d'onboarding
│   └── steps/
│       ├── Step1Invitation.js     # Étape 1 : Intro + Détails de l'invitation
│       ├── Step2Permissions.js   # Étape 2 : Récap permissions compte Free
│       ├── Step3WhyJoin.js        # Étape 3 : Why joining Hubspot Pro
│       ├── Step4Features.js      # Étape 4 : Which features you plan to use
│       ├── Step5AccountDetails.js # Étape 5 : Account details
│       ├── Step6Location.js      # Étape 6 : Account location
│       ├── Step7SecureAccount.js # Étape 7 : Secure your account
│       ├── Step8Policies.js      # Étape 8 : Accept Hubspot policies
│       └── Step9VerifyIdentity.js # Étape 9 : Verify your identity
├── pages/
│   ├── _app.js                    # Configuration Next.js
│   └── index.js                   # Page d'accueil
├── styles/
│   ├── globals.css                # Styles globaux
│   ├── Home.module.css            # Styles de la page d'accueil
│   ├── OnboardingFlow.module.css # Styles du flux d'onboarding
│   └── Step.module.css            # Styles des étapes
└── package.json
```

## Technologies utilisées

- Next.js 14
- React 18
- CSS Modules
- JavaScript ES6 (modules)
