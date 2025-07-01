import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Admin Panel
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              User Management
            </h2>
            <p className="text-gray-300">
              Manage users, roles, and permissions in your application.
            </p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              System Settings
            </h2>
            <p className="text-gray-300">
              Configure application settings and system preferences.
            </p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
              Analytics
            </h2>
            <p className="text-gray-300">
              View detailed analytics and performance metrics.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Admin Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Add User
            </button>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
              Export Data
            </button>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
              System Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
