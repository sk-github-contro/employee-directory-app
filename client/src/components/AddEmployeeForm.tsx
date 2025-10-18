'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EMPLOYEE, GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT, GET_ALL_DEPARTMENTS } from '@/lib/graphql/queries';
import { useRouter } from 'next/navigation';

interface Department {
  id: string;
  name: string;
  floor: number;
}

interface FormData {
  name: string;
  position: string;
  department: string;
  salary: string;
}

interface FormErrors {
  name?: string;
  position?: string;
  department?: string;
  salary?: string;
}

export default function AddEmployeeForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    position: '',
    department: '',
    salary: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: departmentsData, loading: departmentsLoading } = useQuery(GET_ALL_DEPARTMENTS);
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT],
    awaitRefetchQueries: true,
    onCompleted: () => {
      router.push('/');
    },
    onError: (error) => {
      console.error('Error adding employee:', error);
      setErrors({ salary: 'Failed to add employee. Please try again.' });
    }
  });

  const departments: Department[] = departmentsData?.getAllDepartments || [];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    } else if (formData.position.trim().length < 2) {
      newErrors.position = 'Position must be at least 2 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else {
      const salary = parseFloat(formData.salary);
      if (isNaN(salary) || salary < 0) {
        newErrors.salary = 'Salary must be a valid positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await addEmployee({
        variables: {
          name: formData.name.trim(),
          position: formData.position.trim(),
          department: formData.department,
          salary: parseFloat(formData.salary)
        }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      setErrors({ salary: 'Failed to add employee. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (departmentsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Employee</h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill in the details below to add a new employee to the directory.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Name Field */}
            <div className="sm:col-span-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Position Field */}
            <div className="sm:col-span-6">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="position"
                  id="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md ${
                    errors.position ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter job position"
                />
                {errors.position && (
                  <p className="mt-2 text-sm text-red-600">{errors.position}</p>
                )}
              </div>
            </div>

            {/* Department Field */}
            <div className="sm:col-span-6">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department *
              </label>
              <div className="mt-1">
                <select
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md ${
                    errors.department ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name} (Floor {dept.floor})
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="mt-2 text-sm text-red-600">{errors.department}</p>
                )}
              </div>
            </div>

            {/* Salary Field */}
            <div className="sm:col-span-6">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border rounded-md ${
                    errors.salary ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
              {errors.salary && (
                <p className="mt-2 text-sm text-red-600">{errors.salary}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              'Add Employee'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
