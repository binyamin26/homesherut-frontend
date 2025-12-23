# HomeSherut Ì∑ÆÌ∑±

Plateforme unifi√©e de services √† domicile en Isra√´l : babysitting, m√©nage, jardinage, garde d'animaux, soutien scolaire, aide aux personnes √¢g√©es.

## Ì∫Ä D√©marrage Rapide

1. Cloner le projet
2. `cd HomeSherut`
3. `docker-compose up -d` (Base de donn√©es)
4. `cd backend && npm install && npm run dev`
5. `cd frontend && npm install && npm run dev`

## Ì≥± Services Disponibles

- Ì±∂ **Babysitting** - Garde d'enfants
- Ì∑π **M√©nage** - Services de nettoyage
- Ìº± **Jardinage** - Entretien espaces verts
- Ì∞ï **Garde d'animaux** - Pet-sitting
- Ì≥ö **Soutien scolaire** - Cours particuliers
- Ì±µ **Aide personnes √¢g√©es** - Assistance senior

## Ìª†Ô∏è Technologies

- **Frontend**: React 19 + Vite + React Router 7
- **Backend**: Node.js + Express + MySQL
- **Paiements**: Bit Pay + Tranzila
- **G√©olocalisation**: OpenStreetMap + donn√©es locales

## Ì≥Å Structure

```
HomeSherut/
‚îú‚îÄ‚îÄ backend/          # API Node.js
‚îú‚îÄ‚îÄ frontend/         # Application React
‚îú‚îÄ‚îÄ docs/            # Documentation
‚îî‚îÄ‚îÄ docker-compose.yml
```

## Ì¥ß Configuration

1. Copier `.env.example` vers `.env`
2. Modifier les variables d'environnement
3. Lancer `docker-compose up -d`
4. Ex√©cuter les migrations: `npm run migrate`

## Ì≥ö Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Services Configuration](docs/SERVICES.md)
- [Migration Guide](docs/MIGRATION.md)
