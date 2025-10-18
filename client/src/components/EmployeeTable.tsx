'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT, GET_ALL_DEPARTMENTS } from '@/lib/graphql/queries';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
}

interface Department {
  id: string;
  name: string;
  floor: number;
}

export default function EmployeeTable() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  
  const { data: departmentsData, loading: departmentsLoading } = useQuery(GET_ALL_DEPARTMENTS);
  const { data: allEmployeesData, loading: allEmployeesLoading, refetch: refetchAllEmployees } = useQuery(GET_ALL_EMPLOYEES);
  const { data: filteredEmployeesData, loading: filteredEmployeesLoading, refetch: refetchFilteredEmployees } = useQuery(
    GET_EMPLOYEES_BY_DEPARTMENT,
    {
      variables: { department: selectedDepartment },
      skip: selectedDepartment === 'all'
    }
  );

  const departments: Department[] = departmentsData?.getAllDepartments || [];
  const employees: Employee[] = selectedDepartment === 'all' 
    ? allEmployeesData?.getAllEmployees || []
    : filteredEmployeesData?.getEmployeesByDepartment || [];

  const loading = allEmployeesLoading || filteredEmployeesLoading || departmentsLoading;

  const handleRefresh = async () => {
    if (selectedDepartment === 'all') {
      await refetchAllEmployees();
    } else {
      await refetchFilteredEmployees();
    }
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filter and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Department Filter */}
          <div className="flex flex-col">
            <label htmlFor="department-filter" className="text-sm font-medium text-gray-700 mb-1">
              Filter by Department
            </label>
            <select
              id="department-filter"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Employee Button */}
          <Link
            href="/add-employee"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Employee
          </Link>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatSalary(employee.salary)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/employee/${employee.id}`}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
