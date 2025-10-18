# Employee Directory Application

A full-stack Employee Directory application built with Node.js, GraphQL, MongoDB, and Next.js.

## Features

- **Backend**: Apollo Server 4 with GraphQL API
- **Database**: MongoDB with Node.js driver
- **Frontend**: Next.js 14 with App Router and Apollo Client
- **Styling**: Tailwind CSS for responsive design
- **Employee Management**: View, filter, and add employees
- **Department Management**: Filter employees by department

## Tech Stack

### Backend
- Node.js
- Apollo Server 4
- GraphQL
- MongoDB (Node.js driver)
- CORS

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Apollo Client
- Tailwind CSS
- React

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-directory-app
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/employee-directory
   PORT=5000
   ```

6. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB locally:
   ```bash
   mongod
   ```

## Running the Application

### Development Mode

From the root directory, run:
```bash
npm run dev
```

This will start both the GraphQL server (port 5000) and the Next.js client (port 3000) concurrently.

### Individual Services

**Start only the GraphQL server:**
```bash
npm run server
```

**Start only the Next.js client:**
```bash
npm run client
```

## API Endpoints

### GraphQL Playground
- **URL**: http://localhost:5000/graphql
- **Description**: Interactive GraphQL playground for testing queries and mutations

### GraphQL Schema

#### Types
```graphql
type Employee {
  id: ID!
  name: String!
  position: String!
  department: String!
  salary: Float!
}

type Department {
  id: ID!
  name: String!
  floor: Int!
}
```

#### Queries
- `getAllEmployees`: Returns all employees with name and position
- `getEmployeeDetails(id: ID!)`: Returns complete employee details
- `getEmployeesByDepartment(department: String!)`: Returns employees filtered by department
- `getAllDepartments`: Returns all departments

#### Mutations
- `addEmployee(name: String!, position: String!, department: String!, salary: Float!)`: Adds a new employee

## Frontend Pages

### Home Page (`/`)
- Employee table with name, position, department, and salary
- Department filter dropdown
- "Add New Employee" button
- Responsive design

### Employee Detail Page (`/employee/[id]`)
- Complete employee information
- Back button to home page
- Error handling for invalid IDs

### Add Employee Page (`/add-employee`)
- Form with validation for adding new employees
- Department selection dropdown
- Salary input with currency formatting
- Client-side validation

## Database Schema

### Collections

**employees**
```javascript
{
  _id: ObjectId,
  name: String,
  position: String,
  department: String,
  salary: Number
}
```

**departments**
```javascript
{
  _id: ObjectId,
  name: String,
  floor: Number
}
```

### Seed Data

The application automatically seeds the database with:
- 3 departments: Engineering, Marketing, Human Resources
- 6 sample employees across different departments

## Features Implemented

### Backend
- ✅ Apollo Server 4 setup
- ✅ MongoDB connection with Node.js driver
- ✅ GraphQL schema definition
- ✅ Complete CRUD operations
- ✅ Error handling
- ✅ Data seeding

### Frontend
- ✅ Next.js App Router
- ✅ Apollo Client setup
- ✅ Employee listing with filtering
- ✅ Employee detail pages
- ✅ Add employee form with validation
- ✅ Responsive Tailwind CSS design
- ✅ Loading states
- ✅ Error handling

### UI/UX
- ✅ Mobile-responsive design
- ✅ Interactive department filter
- ✅ Form validation
- ✅ Loading indicators
- ✅ Error messages
- ✅ Consistent styling

## Project Structure

```
employee-directory-app/
├── server/                 # GraphQL backend
│   ├── index.js           # Server entry point
│   ├── schema.js          # GraphQL schema
│   ├── resolvers.js       # GraphQL resolvers
│   ├── database.js        # MongoDB connection
│   ├── seed.js           # Database seeding
│   └── config.js         # Configuration
├── client/                # Next.js frontend
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   └── lib/         # Utilities and GraphQL
└── package.json          # Root package.json
```

## Development Notes

- The application uses Apollo Server 4 with standalone server
- MongoDB connection is established on server startup
- Database is automatically seeded with sample data
- Frontend uses Apollo Client with proper cache configuration
- All forms include client-side validation
- Error handling is implemented for both frontend and backend
- The design is fully responsive using Tailwind CSS

## Troubleshooting

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file
   - Verify MongoDB is accessible on the specified port

2. **GraphQL Server Issues**
   - Check if port 5000 is available
   - Verify all server dependencies are installed
   - Check server logs for detailed error messages

3. **Frontend Issues**
   - Ensure the GraphQL server is running
   - Check browser console for errors
   - Verify all client dependencies are installed

## License

This project is for educational purposes.
