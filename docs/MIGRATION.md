# Migration Guide - From Separate Projects to HomeSherut

## Overview
This guide explains how to migrate from separate babysitting and cleaning projects to the unified HomeSherut platform.

## Data Migration

### 1. Database Migration
```sql
-- Migrate babysitting users
INSERT INTO homesherut_users (name, email, password_hash, user_type, service_category)
SELECT name, email, password_hash, user_type, 'babysitting' 
FROM babysitting_users;

-- Migrate cleaning profiles  
INSERT INTO homesherut_service_providers (user_id, service_category, profile_data)
SELECT id, 'cleaning', JSON_OBJECT('experience', experience, 'description', description)
FROM cleaning_profiles;
```

### 2. File Migration
```bash
# Copy uploads
cp -r babysitting-project/uploads/* HomeSherut/backend/uploads/profiles/
cp -r cleaning-project/uploads/* HomeSherut/backend/uploads/profiles/
```

### 3. Configuration Migration
- Update database connection strings
- Merge environment variables
- Update API endpoints in frontend

## Code Migration

### From Babysitting Project
- ✅ Keep: Authentication system
- ✅ Keep: Payment integration  
- ✅ Keep: Review system
- ��� Adapt: Routes to new structure

### From Cleaning Project  
- ✅ Keep: Advanced forms (AddProfilePage)
- ✅ Keep: Better UI components (Header/Footer)
- ✅ Keep: Verification system
- ❌ Remove: Basic API layer

## Testing Migration
1. Run data migration scripts
2. Test user authentication
3. Verify file uploads work
4. Check payment integration
5. Test service-specific features

## Rollback Plan
Keep backups of original projects until migration is verified complete.
