# React + Spring Boot Authentication App

A full-stack authentication application with JWT-based security, using PostgreSQL (free).

## Architecture

```
react-spring-app/
├── frontend/           # React (Vite) application
│   ├── src/
│   │   ├── components/ # Reusable components (Navbar, ProtectedRoute)
│   │   ├── pages/      # Page components
│   │   ├── context/    # Auth context provider
│   │   └── services/   # API services
│   └── package.json
│
├── backend/            # Spring Boot application
│   ├── src/main/java/com/app/
│   │   ├── config/     # Security config, exception handler
│   │   ├── controller/ # REST controllers
│   │   ├── dto/        # Request/Response DTOs
│   │   ├── model/      # User entity
│   │   ├── repository/ # JPA repositories
│   │   ├── security/   # JWT filter, utils
│   │   └── service/    # Business logic
│   └── pom.xml
│
└── README.md
```

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- npm or yarn

## Local Development

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run with H2 database (development profile):
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

3. Access H2 Console (dev only): `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:authdb`
   - Username: `sa`
   - Password: (empty)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

### Test the Application

1. Open `http://localhost:5173` in your browser
2. Click "Sign Up" to create a new account
3. After signup, you'll be redirected to the dashboard
4. Try logging out and signing in again

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/signin` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/auth/health` | Health check | No |

### Request/Response Examples

**Signup:**
```json
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Signin:**
```json
POST /api/auth/signin
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "type": "Bearer",
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## Deployment

### Free PostgreSQL Options

| Provider | Free Tier | Limits |
|----------|-----------|--------|
| [Neon](https://neon.tech) | Free forever | 512MB storage, 1 project |
| [Supabase](https://supabase.com) | Free tier | 500MB, 2 projects |
| [Railway](https://railway.app) | $5 free credit | Usage-based |
| [Render](https://render.com) | Free tier | 256MB, expires after 90 days |
| AWS RDS | 12-month free tier | 750 hrs/month db.t3.micro |

### 1. Database Setup (Example: Neon)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (looks like):
   ```
   postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```

### 2. Backend Deployment Options

#### Option A: Railway (Recommended - Free)

1. Push code to GitHub
2. Sign up at [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add environment variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=jdbc:postgresql://your-neon-host/dbname?sslmode=require
   DATABASE_USERNAME=your-username
   DATABASE_PASSWORD=your-password
   JWT_SECRET=your-base64-secret
   CORS_ORIGINS=https://your-frontend-url
   ```
5. Railway auto-deploys on push

#### Option B: Render (Free)

1. Push code to GitHub
2. Sign up at [render.com](https://render.com)
3. Create new Web Service
4. Set build command: `cd backend && mvn clean package -DskipTests`
5. Set start command: `java -jar backend/target/auth-backend-1.0.0.jar`
6. Add environment variables (same as above)

#### Option C: AWS EC2

1. Launch EC2 instance (t3.micro free tier eligible):
   - AMI: Amazon Linux 2023 or Ubuntu 22.04
   - Security group: Allow ports 22 (SSH), 8080 (API)

2. Install Java 17:
   ```bash
   # Amazon Linux
   sudo yum install java-17-amazon-corretto -y

   # Ubuntu
   sudo apt update && sudo apt install openjdk-17-jdk -y
   ```

3. Build the JAR locally:
   ```bash
   cd backend
   mvn clean package -DskipTests
   ```

4. Transfer JAR to EC2:
   ```bash
   scp -i your-key.pem target/auth-backend-1.0.0.jar ec2-user@<ec2-ip>:~/
   ```

5. Create environment file on EC2:
   ```bash
   sudo nano /etc/systemd/system/authapp.env
   ```
   ```
   SPRING_PROFILES_ACTIVE=prod
   JWT_SECRET=your-base64-encoded-secret-key
   DATABASE_URL=jdbc:postgresql://your-host:5432/dbname
   DATABASE_USERNAME=your-username
   DATABASE_PASSWORD=your-password
   CORS_ORIGINS=https://your-frontend-url
   ```

6. Create systemd service:
   ```bash
   sudo nano /etc/systemd/system/authapp.service
   ```
   ```ini
   [Unit]
   Description=Auth Backend Service
   After=network.target

   [Service]
   Type=simple
   User=ec2-user
   EnvironmentFile=/etc/systemd/system/authapp.env
   ExecStart=/usr/bin/java -jar /home/ec2-user/auth-backend-1.0.0.jar
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

7. Start the service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable authapp
   sudo systemctl start authapp
   ```

### 3. Frontend Deployment Options

#### Option A: Vercel (Recommended - Free)

1. Push code to GitHub
2. Sign up at [vercel.com](https://vercel.com)
3. Import the frontend folder
4. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```
5. Deploy

#### Option B: Netlify (Free)

1. Build locally: `cd frontend && npm run build`
2. Sign up at [netlify.com](https://netlify.com)
3. Drag & drop the `dist` folder
4. Add environment variable and redeploy

#### Option C: AWS S3 + CloudFront

1. Update API URL:
   ```bash
   cd frontend
   echo "VITE_API_URL=https://your-backend-url/api" > .env.production
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Create S3 bucket and upload:
   ```bash
   aws s3 mb s3://your-auth-app-frontend
   aws s3 sync dist/ s3://your-auth-app-frontend --delete
   ```

4. Enable static website hosting
5. Create CloudFront distribution pointing to S3

## Environment Variables

### Backend

| Variable | Description | Example |
|----------|-------------|---------|
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | `prod` |
| `JWT_SECRET` | Base64-encoded secret key | `base64-secret` |
| `DATABASE_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://host:5432/db` |
| `DATABASE_USERNAME` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | `password` |
| `CORS_ORIGINS` | Allowed origins | `https://example.com` |

### Frontend

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.example.com/api` |

## Generating JWT Secret

Generate a secure Base64-encoded secret:

```bash
openssl rand -base64 64
```

## Troubleshooting

### Backend won't start
- Check Java version: `java -version` (must be 17+)
- Check environment variables are set
- Check database connectivity

### CORS errors
- Verify `CORS_ORIGINS` includes your frontend URL (no trailing slash)
- Ensure backend is using HTTPS if frontend is HTTPS

### JWT errors
- Ensure `JWT_SECRET` is at least 256 bits when decoded
- Check token expiration

### Database connection issues
- Verify connection string format
- Check credentials
- For Neon/Supabase, ensure `?sslmode=require` in URL

## Cost Estimate (Free Tier Stack)

| Service | Cost |
|---------|------|
| Neon PostgreSQL | Free |
| Railway/Render (Backend) | Free |
| Vercel/Netlify (Frontend) | Free |
| **Total** | **$0** |

## License

MIT
