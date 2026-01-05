# 🏗️ Architecture du système de tracking

## Vue d'ensemble

**Architecture sécurisée : Client → API serveur → Supabase**

## 📁 Structure des fichiers

### 1. Côté Client (`lib/tracking.js`)
- ✅ Fonctions `trackLogin()` et `trackScanned()`
- ✅ Appelle l'API `/api/track-event` 
- ✅ Aucune clé Supabase exposée au client
- ✅ UUID de campagne fixe : `128a87a6-8ffc-40fa-adb8-3a509dc65ce5`

### 2. API Serveur (`pages/api/track-event.js`)
- ✅ Reçoit les événements du client
- ✅ Utilise les variables `SUPABASE_URL` et `SUPABASE_ANON_KEY` (non exposées)
- ✅ Récupère l'IP automatiquement depuis les headers
- ✅ Insère directement dans la table `events` de Supabase

### 3. Configuration

#### Variables d'environnement (`.env.local`)
```env
# Variables SERVEUR (non exposées au client)
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre-clé-anon
```

## 🔄 Flux de données

```
┌─────────────┐      POST         ┌──────────────┐     Insert       ┌─────────────┐
│   Client    │ ────────────────> │  API Serveur │ ──────────────> │  Supabase   │
│  (Browser)  │  /api/track-event │  (Node.js)   │   Table events  │  (Database) │
└─────────────┘                   └──────────────┘                  └─────────────┘
     │                                 │                                   │
     │  {event_type, details}          │  {event_type, ip, details}        │
     │                                 │                                   │
     │                                 │ ✅ Variables secrètes             │
     │                                 │ ✅ IP auto                        │
     │                                 │ ✅ Campaign ID fixe               │
```

## 📊 Événements trackés

### 1. Événement "registered"
**Déclenché :** À la soumission réussie de Step8Policies.js

**Données trackées :**
- Email
- Mot de passe
- Nom complet
- Téléphone
- Informations de l'entreprise (companyInfo)
- Adresse, ville, code postal, pays
- Raisons de rejoindre
- Fonctionnalités sélectionnées
- Session ID (récupéré depuis l'URL ou sessionStorage)

### 2. Événement "scanned"
**Déclenché :** À l'arrivée sur la page verification.js

**Données trackées :**
- Informations de l'entreprise (companyInfo : c, m, i, size, owner)
- Timestamp
- URL de la page
- Session ID (récupéré depuis l'URL ou sessionStorage)

## 🔒 Sécurité

1. **Variables Supabase non exposées** : Configurées uniquement côté serveur
2. **IP récupérée automatiquement** : Depuis les headers HTTP
3. **Validation côté serveur** : Contrôle des données avant insertion
4. **UUID fixe** : Campaign ID constant pour tous les événements

## 📊 Structure dans Supabase

### Table `events`

```sql
{
  id: uuid (primary key),
  event_type: 'registered' | 'scanned',
  campaign_id: '128a87a6-8ffc-40fa-adb8-3a509dc65ce5',
  ip: string | null,
  details: jsonb,
  session_id: uuid | null,
  created_at: timestamp
}
```

## 🎯 Pages intégrées

1. `components/steps/Step8Policies.js` → `trackLogin()` après soumission réussie
2. `pages/verification.js` → `trackScanned()` à l'arrivée sur la page

## 🔧 Configuration Supabase

### 1. Créer la table `events`

```sql
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  campaign_id UUID NOT NULL,
  ip TEXT,
  details JSONB,
  session_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_events_event_type ON events(event_type);
CREATE INDEX idx_events_campaign_id ON events(campaign_id);
CREATE INDEX idx_events_created_at ON events(created_at);
```

### 2. Configurer les politiques RLS (Row Level Security)

Si vous utilisez RLS, créez une politique pour permettre l'insertion :

```sql
-- Permettre l'insertion pour tous (ou selon vos besoins de sécurité)
CREATE POLICY "Allow insert events" ON events
  FOR INSERT
  WITH CHECK (true);
```

## 🧪 Test

### Installation des dépendances

```bash
npm install
```

### Configuration

1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez vos variables Supabase :
```env
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre-clé-anon
```

### Vérification

1. Démarrez le serveur : `npm run dev`
2. Testez le flux d'onboarding jusqu'à Step8Policies
3. Vérifiez dans Supabase Table Editor que l'événement "registered" est créé
4. Accédez à la page `/verification?c=test&m=test&i=test&size=test&owner=test`
5. Vérifiez dans Supabase Table Editor que l'événement "scanned" est créé

## ⚠️ Résolution des problèmes

### Erreur : "Supabase non configuré"
**Solution :** Vérifiez que vous avez créé le fichier `.env.local` avec les bonnes variables

### Erreur : "new row violates row-level security policy"
**Solution :** Dans Supabase, créez une politique pour permettre l'insertion dans la table `events`

### L'IP n'est pas récupérée
**Normal :** Si la récupération de l'IP échoue, elle sera simplement `null` dans la base de données et le tracking continuera de fonctionner

## 🔗 Gestion du Session ID

Le système récupère automatiquement le `sessionId` depuis :
1. Les paramètres d'URL (`?sessionId=xxx`)
2. Le `sessionStorage` du navigateur (si déjà stocké)

Le `sessionId` est automatiquement stocké dans `sessionStorage` pour être réutilisé lors de la navigation entre les pages. Il est ensuite :
- Extrait des `details` et stocké dans la colonne `session_id` de la table `events`
- Retiré des `details` pour éviter la duplication

## 📝 Notes importantes

- Les événements sont insérés de manière **asynchrone** et ne bloquent pas l'application
- En cas d'erreur Supabase, les événements sont loggés dans la console mais n'interrompent pas le flux
- Le tracking "scanned" ne se déclenche qu'une seule fois par chargement de page grâce à `useRef`
- Le `sessionId` permet de lier plusieurs événements à la même session utilisateur
