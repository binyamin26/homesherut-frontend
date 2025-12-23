# HomeSherut API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
Bearer Token in Authorization header

## Endpoints

### Auth
- `POST /auth/register` - User registration
- `POST /auth/login` - User login  
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout

### Services
- `GET /services/babysitting` - Get babysitters
- `GET /services/cleaning` - Get cleaners
- `GET /services/gardening` - Get gardeners
- `GET /services/petcare` - Get pet sitters
- `GET /services/tutoring` - Get tutors
- `GET /services/eldercare` - Get caregivers

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `POST /users/upload-avatar` - Upload profile picture

### Reviews
- `GET /reviews/:serviceId` - Get reviews for service
- `POST /reviews` - Create review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

### Subscriptions
- `GET /subscription/status` - Get subscription status
- `POST /subscription/create` - Create subscription
- `POST /subscription/cancel` - Cancel subscription
