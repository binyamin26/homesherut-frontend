# HomeSherut Services Configuration

## Available Services

### 1. Babysitting (בייביסיטר)
- **Premium System**: ✅ 
- **Payments**: ✅ Bit Pay + Tranzila
- **Reviews**: ✅ Secure reviews
- **Promotions**: ✅ Sitter promotions

### 2. Cleaning (ניקיון)
- **Premium System**: ❌ 
- **Payments**: ❌ 
- **Reviews**: ❌
- **Verification**: ✅ 5-step process

### 3. Gardening (גינון)
- **Status**: ��� In Development
- **Features**: TBD

### 4. Pet Care (שמירה על חיות מחמד)  
- **Status**: ��� In Development
- **Features**: TBD

### 5. Tutoring (שיעורים פרטיים)
- **Status**: ��� In Development
- **Features**: TBD

### 6. Elder Care (עזרה לקשישים)
- **Status**: ��� In Development
- **Features**: TBD

## Service Configuration

Each service can be configured in `data/servicesConfig.js`:

```javascript
export const SERVICES = {
  BABYSITTING: {
    id: 'babysitting',
    name: 'בייביסיטר',
    icon: '���',
    hasPremium: true,
    hasPayments: true,
    hasReviews: true
  },
  // ... autres services
}
```
