# 🚀 Deployment Guide

This guide will help you deploy the Employee Directory Application to production.

## 📋 Prerequisites

- GitHub account
- Render account (free tier)
- Vercel account (free tier)
- MongoDB Atlas cluster

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Fork/Clone the repository** to your GitHub account
2. **Update MongoDB URI** in your environment variables

### Step 2: Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `employee-directory-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`

5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-directory
   PORT=10000
   ```

6. **Click "Create Web Service"**

### Step 3: Get Backend URL

After deployment, you'll get a URL like:
```
https://employee-directory-api.onrender.com
```

Your GraphQL endpoint will be:
```
https://employee-directory-api.onrender.com/graphql
```

## 🎨 Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_GRAPHQL_URL=https://employee-directory-api.onrender.com/graphql
   ```

6. **Click "Deploy"**

### Step 2: Get Frontend URL

After deployment, you'll get a URL like:
```
https://employee-directory-app.vercel.app
```

## 🔗 Update CORS Settings

After both deployments, update the backend CORS settings:

1. **Go to Render Dashboard**
2. **Find your backend service**
3. **Update Environment Variables:**
   ```
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

## 🧪 Testing Deployment

1. **Visit your Vercel frontend URL**
2. **Test the following features:**
   - ✅ View employee list
   - ✅ Filter by department
   - ✅ Add new employee
   - ✅ View employee details
   - ✅ Responsive design

## 📊 Monitoring

### Render (Backend)
- **Logs**: Available in Render dashboard
- **Health Check**: `https://your-backend.onrender.com/health`

### Vercel (Frontend)
- **Analytics**: Available in Vercel dashboard
- **Performance**: Built-in monitoring

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Update CORS origins in backend
   - Check environment variables

2. **Database Connection**
   - Verify MongoDB Atlas connection string
   - Check network access settings

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

## 💰 Cost

- **Render**: Free tier (750 hours/month)
- **Vercel**: Free tier (unlimited for personal projects)
- **MongoDB Atlas**: Free tier (512MB storage)

## 🎯 Production URLs

After successful deployment:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-api.onrender.com/graphql`
- **Health Check**: `https://your-api.onrender.com/health`

## 📝 Notes

- Free tiers have limitations (sleep after inactivity)
- Consider upgrading for production use
- Monitor usage and performance
- Set up proper error tracking

---

**Ready to deploy? Follow the steps above and your Employee Directory will be live! 🚀**
