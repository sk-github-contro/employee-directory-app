const { ObjectId } = require('mongodb');
const { getDB } = require('./database');

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const db = getDB();
        const employees = await db.collection('employees').find({}).toArray();
        return employees.map(employee => ({
          ...employee,
          id: employee._id.toString()
        }));
      } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Failed to fetch employees');
      }
    },

    getEmployeeDetails: async (_, { id }) => {
      try {
        const db = getDB();
        const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });
        if (!employee) {
          throw new Error('Employee not found');
        }
        return {
          ...employee,
          id: employee._id.toString()
        };
      } catch (error) {
        console.error('Error fetching employee details:', error);
        throw new Error('Failed to fetch employee details');
      }
    },

    getEmployeesByDepartment: async (_, { department }) => {
      try {
        const db = getDB();
        const employees = await db.collection('employees').find({ department }).toArray();
        return employees.map(employee => ({
          ...employee,
          id: employee._id.toString()
        }));
      } catch (error) {
        console.error('Error fetching employees by department:', error);
        throw new Error('Failed to fetch employees by department');
      }
    },

    getAllDepartments: async () => {
      try {
        const db = getDB();
        const departments = await db.collection('departments').find({}).toArray();
        return departments.map(department => ({
          ...department,
          id: department._id.toString()
        }));
      } catch (error) {
        console.error('Error fetching departments:', error);
        throw new Error('Failed to fetch departments');
      }
    }
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      try {
        const db = getDB();
        
        // Validate input
        if (!name || !position || !department || salary === null || salary === undefined) {
          throw new Error('All fields are required');
        }
        
        if (salary < 0) {
          throw new Error('Salary must be a positive number');
        }

        const employee = {
          name: name.trim(),
          position: position.trim(),
          department: department.trim(),
          salary: parseFloat(salary)
        };

        const result = await db.collection('employees').insertOne(employee);
        
        return {
          ...employee,
          id: result.insertedId.toString()
        };
      } catch (error) {
        console.error('Error adding employee:', error);
        throw new Error('Failed to add employee');
      }
    }
  }
};

module.exports = resolvers;
