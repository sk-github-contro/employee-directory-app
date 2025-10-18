# 🚀 Render Deployment Guide - Step by Step

## 📋 Prerequisites
- GitHub repository: `sk-github-contro/employee-directory-app`
- MongoDB Atlas cluster (already configured)
- Render account (free tier)

## 🔧 Step-by-Step Render Deployment

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `sk-github-contro/employee-directory-app`

### Step 3: Configure the Service
**Basic Settings:**
- **Name**: `employee-directory-api`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm ci`
- **Start Command**: `npm start`

### Step 4: Environment Variables
Add these environment variables in Render dashboard:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://sohamUlwe305:Soham305Ulwe@clusterulwe.49hjd.mongodb.net/employee-directory?retryWrites=true&w=majority&appName=clusterUlwe
PORT=10000
```

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Note your service URL (e.g., `https://employee-directory-api.onrender.com`)

## 🧪 Testing Your Deployment

### Health Check
Visit: `https://your-service-name.onrender.com/health`
Expected response:
```json
{"status":"OK","timestamp":"2025-10-18T15:18:01.023Z"}
```

### GraphQL Endpoint
Visit: `https://your-service-name.onrender.com/graphql`
You should see the GraphQL Playground interface.

### Test Query
```graphql
query {
  getAllEmployees {
    id
    name
    position
    department
    salary
  }
}
```

## 🚨 Troubleshooting

### Common Issues:

#### 1. "Cannot find module '@apollo/server'"
**Solution:**
- Ensure `package-lock.json` is committed to repository
- Use `npm ci` instead of `npm install` in build command
- Check that all dependencies are in `dependencies` (not `devDependencies`)

#### 2. Build Timeout
**Solution:**
- Render free tier has 15-minute build timeout
- Optimize build by removing unnecessary files
- Consider upgrading to paid plan for faster builds

#### 3. Database Connection Issues
**Solution:**
- Verify MongoDB Atlas network access (0.0.0.0/0)
- Check connection string format
- Ensure database user has proper permissions

#### 4. CORS Errors
**Solution:**
- Update CORS configuration in server code
- Add your frontend domain to allowed origins

## 📊 Monitoring

### Render Dashboard
- **Logs**: View real-time logs in Render dashboard
- **Metrics**: Monitor CPU, memory, and response times
- **Deployments**: Track deployment history

### Health Monitoring
- **Health Endpoint**: `/health` for basic health checks
- **GraphQL Endpoint**: `/graphql` for API availability

## 🔄 Redeployment

### Automatic Deployments
- Render automatically deploys on `git push` to main branch
- Each deployment gets a unique URL for testing

### Manual Deployments
1. Go to Render dashboard
2. Click on your service
3. Click **"Manual Deploy"**
4. Select branch and click **"Deploy"**

## 💰 Cost Information

### Free Tier Limits
- **750 hours/month** (enough for 24/7 uptime)
- **512MB RAM**
- **0.1 CPU**
- **Sleeps after 15 minutes** of inactivity

### Paid Plans
- **Starter**: $7/month - No sleep, more resources
- **Standard**: $25/month - Better performance
- **Pro**: $85/month - Production-ready

## 🎯 Next Steps

After successful deployment:

1. **Test all endpoints** thoroughly
2. **Note your service URL** for frontend configuration
3. **Update CORS settings** when frontend is deployed
4. **Monitor logs** for any issues
5. **Set up custom domain** (optional)

## 📞 Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Community**: [community.render.com](https://community.render.com)
- **Status Page**: [status.render.com](https://status.render.com)

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Web service created with correct settings
- [ ] Environment variables added
- [ ] Build command: `npm ci`
- [ ] Start command: `npm start`
- [ ] Root directory: `server`
- [ ] Deployment successful
- [ ] Health check passes
- [ ] GraphQL endpoint accessible
- [ ] Database connection working
- [ ] Service URL noted for frontend

**Your backend is now live and ready for the frontend deployment! 🚀**
