# HomeSherut Deployment Guide

## Production Setup

### 1. Server Requirements
- Node.js 18+
- MySQL 8.0+
- Minimum 2GB RAM
- SSL Certificate

### 2. Environment Variables
```bash
NODE_ENV=production
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_production_jwt_secret
```

### 3. Build Process
```bash
# Backend
cd backend
npm install --production
npm run migrate

# Frontend  
cd frontend
npm install
npm run build
```

### 4. Nginx Configuration
```nginx
server {
    listen 80;
    server_name homesherut.co.il;
    
    location / {
        root /var/www/homesherut/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 5. SSL Setup with Let's Encrypt
```bash
sudo certbot --nginx -d homesherut.co.il
```

### 6. Process Management (PM2)
```bash
npm install -g pm2
pm2 start backend/server.js --name homesherut-api
pm2 startup
pm2 save
```
