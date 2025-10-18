const { getDB } = require('./database');

const seedData = async () => {
  try {
    const db = getDB();
    
    // Clear existing data
    await db.collection('employees').deleteMany({});
    await db.collection('departments').deleteMany({});
    
    // Insert departments
    const departments = [
      { name: 'Engineering', floor: 2 },
      { name: 'Marketing', floor: 1 },
      { name: 'Human Resources', floor: 3 }
    ];
    
    const departmentResult = await db.collection('departments').insertMany(departments);
    const departmentIds = Object.values(departmentResult.insertedIds);
    
    // Insert employees
    const employees = [
      {
        name: 'John Smith',
        position: 'Senior Software Engineer',
        department: 'Engineering',
        salary: 95000
      },
      {
        name: 'Sarah Johnson',
        position: 'Marketing Manager',
        department: 'Marketing',
        salary: 75000
      },
      {
        name: 'Mike Chen',
        position: 'Frontend Developer',
        department: 'Engineering',
        salary: 80000
      },
      {
        name: 'Emily Davis',
        position: 'HR Specialist',
        department: 'Human Resources',
        salary: 65000
      },
      {
        name: 'David Wilson',
        position: 'Marketing Coordinator',
        department: 'Marketing',
        salary: 55000
      },
      {
        name: 'Lisa Brown',
        position: 'Backend Developer',
        department: 'Engineering',
        salary: 85000
      }
    ];
    
    await db.collection('employees').insertMany(employees);
    
    console.log('Database seeded successfully!');
    console.log(`Inserted ${departments.length} departments and ${employees.length} employees`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = seedData;
