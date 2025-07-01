import React, { useState, useEffect } from 'react';
import { 
  projectApi, 
  clientApi, 
  contactApi, 
  subscriptionApi
} from '../services/apiService';
import type { 
  Project, 
  Client, 
  ContactForm, 
  Subscription,
  CreateProjectData,
  CreateClientData
} from '../services/apiService';

type TabType = 'projects' | 'clients' | 'contacts' | 'subscriptions';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    image: null as File | null
  });
  const [clientForm, setClientForm] = useState({
    name: '',
    description: '',
    designation: '',
    image: null as File | null
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'projects':
          const projectsResponse = await projectApi.getAll();
          if (projectsResponse.success) {
            setProjects(projectsResponse.data);
          }
          break;
        case 'clients':
          const clientsResponse = await clientApi.getAll();
          if (clientsResponse.success) {
            setClients(clientsResponse.data);
          }
          break;
        case 'contacts':
          const contactsResponse = await contactApi.getAll(1, 50);
          if (contactsResponse.success) {
            setContacts(contactsResponse.data);
          }
          break;
        case 'subscriptions':
          const subscriptionsResponse = await subscriptionApi.getAll(1, 50);
          if (subscriptionsResponse.success) {
            setSubscriptions(subscriptionsResponse.data);
          }
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.description || !projectForm.image) {
      alert('Please fill all fields and select an image');
      return;
    }

    try {
      const response = await projectApi.create(projectForm as CreateProjectData);
      if (response.success) {
        setProjects([response.data, ...projects]);
        setProjectForm({ name: '', description: '', image: null });
        setShowAddForm(false);
        alert('Project added successfully!');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project');
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.description || !clientForm.designation || !clientForm.image) {
      alert('Please fill all fields and select an image');
      return;
    }

    try {
      const response = await clientApi.create(clientForm as CreateClientData);
      if (response.success) {
        setClients([response.data, ...clients]);
        setClientForm({ name: '', description: '', designation: '', image: null });
        setShowAddForm(false);
        alert('Client added successfully!');
      }
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await projectApi.delete(id);
      if (response.success) {
        setProjects(projects.filter(p => p._id !== id));
        alert('Project deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const response = await clientApi.delete(id);
      if (response.success) {
        setClients(clients.filter(c => c._id !== id));
        alert('Client deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Error deleting client');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await contactApi.delete(id);
      if (response.success) {
        setContacts(contacts.filter(c => c._id !== id));
        alert('Contact deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting contact');
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;

    try {
      const response = await subscriptionApi.delete(id);
      if (response.success) {
        setSubscriptions(subscriptions.filter(s => s._id !== id));
        alert('Subscription deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      alert('Error deleting subscription');
    }
  };

  const resetForms = () => {
    setProjectForm({ name: '', description: '', image: null });
    setClientForm({ name: '', description: '', designation: '', image: null });
    setShowAddForm(false);
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'projects':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-400">Project Management</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Add New Project
              </button>
            </div>

            {showAddForm && (
              <div className="bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Name</label>
                    <input
                      type="text"
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-400"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files?.[0] || null })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition-colors"
                    >
                      Add Project
                    </button>
                    <button
                      type="button"
                      onClick={resetForms}
                      className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`http://localhost:5000/${project.image}`}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'clients':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-400">Client Management</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                Add New Client
              </button>
            </div>

            {showAddForm && (
              <div className="bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Add New Client</h3>
                <form onSubmit={handleAddClient} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name</label>
                    <input
                      type="text"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Designation</label>
                    <input
                      type="text"
                      value={clientForm.designation}
                      onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description/Testimonial</label>
                    <textarea
                      value={clientForm.description}
                      onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-green-400"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setClientForm({ ...clientForm, image: e.target.files?.[0] || null })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-green-400"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition-colors"
                    >
                      Add Client
                    </button>
                    <button
                      type="button"
                      onClick={resetForms}
                      className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div key={client._id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`http://localhost:5000/${client.image}`}
                    alt={client.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{client.name}</h3>
                    <p className="text-green-400 text-sm mb-2">{client.designation}</p>
                    <p className="text-gray-300 text-sm mb-4">{client.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteClient(client._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div>
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Contact Form Submissions</h2>
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Mobile
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {contact.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {contact.mobileNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {contact.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteContact(contact._id!)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'subscriptions':
        return (
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Email Subscriptions</h2>
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date Subscribed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {subscription.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            subscription.isActive !== false ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {subscription.isActive !== false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {subscription.createdAt ? new Date(subscription.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteSubscription(subscription._id!)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-700">
          {[
            { key: 'projects', label: 'Projects', color: 'blue' },
            { key: 'clients', label: 'Clients', color: 'green' },
            { key: 'contacts', label: 'Contacts', color: 'purple' },
            { key: 'subscriptions', label: 'Subscriptions', color: 'yellow' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as TabType);
                resetForms();
              }}
              className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? `bg-${tab.color}-600 text-white border-b-2 border-${tab.color}-400`
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
