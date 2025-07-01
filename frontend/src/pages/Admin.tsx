import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { 
  Home, 
  Plus, 
  Trash2, 
  Users, 
  FolderOpen, 
  Mail, 
  MessageSquare,
  ArrowLeft,
  Calendar,
  CheckCircle,
  XCircle,
  Crop
} from 'lucide-react';
import ImageCropper from '../components/ImageCropper';

type TabType = 'projects' | 'clients' | 'contacts' | 'subscriptions';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Image cropping states
  const [showProjectCropper, setShowProjectCropper] = useState(false);
  const [showClientCropper, setShowClientCropper] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

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
      alert('Please fill all fields and crop an image (450x350px)');
      return;
    }

    try {
      const response = await projectApi.create(projectForm as CreateProjectData);
      if (response.success) {
        setProjects([response.data, ...projects]);
        setProjectForm({ name: '', description: '', image: null });
        setPreviewImage('');
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
      alert('Please fill all fields and crop an image (450x350px)');
      return;
    }

    try {
      const response = await clientApi.create(clientForm as CreateClientData);
      if (response.success) {
        setClients([response.data, ...clients]);
        setClientForm({ name: '', description: '', designation: '', image: null });
        setPreviewImage('');
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
    setShowProjectCropper(false);
    setShowClientCropper(false);
    setPreviewImage('');
  };

  // Handle project image cropping
  const handleProjectImageCrop = (croppedImageFile: File) => {
    setProjectForm({ ...projectForm, image: croppedImageFile });
    setPreviewImage(URL.createObjectURL(croppedImageFile));
    setShowProjectCropper(false);
  };

  // Handle client image cropping
  const handleClientImageCrop = (croppedImageFile: File) => {
    setClientForm({ ...clientForm, image: croppedImageFile });
    setPreviewImage(URL.createObjectURL(croppedImageFile));
    setShowClientCropper(false);
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-500 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading data...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Project Management</h2>
                <p className="text-gray-600">Manage your real estate projects and showcase your work</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Project
              </button>
            </div>

            {showAddForm && (
              <div className="bg-white/80 backdrop-blur-lg border border-yellow-200 rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Plus className="h-6 w-6 mr-3 text-yellow-600" />
                  Add New Project
                </h3>
                <form onSubmit={handleAddProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Project Name</label>
                      <input
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="w-full p-4 bg-white border border-yellow-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter project name..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Project Image</label>
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setShowProjectCropper(true)}
                          className="w-full p-4 bg-white border border-yellow-300 rounded-xl text-gray-800 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Crop className="h-5 w-5" />
                          {projectForm.image ? 'Change Image (Cropped)' : 'Select & Crop Image'}
                        </button>
                        {projectForm.image && (
                          <div className="relative">
                            <img
                              src={previewImage || URL.createObjectURL(projectForm.image)}
                              alt="Project preview"
                              className="w-full h-32 object-cover rounded-lg border border-yellow-300"
                            />
                            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                              450×350px
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Project Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full p-4 bg-white border border-yellow-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                      rows={4}
                      placeholder="Describe your project..."
                      required
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Add Project
                    </button>
                    <button
                      type="button"
                      onClick={resetForms}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project._id} className="bg-white/80 backdrop-blur-lg border border-yellow-200 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image.startsWith('http') ? project.image : `http://localhost:5000/${project.image}`}
                      alt={project.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-200">{project.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-yellow-200">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Client Management</h2>
                <p className="text-gray-600">Manage client testimonials and showcase customer satisfaction</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Client
              </button>
            </div>

            {showAddForm && (
              <div className="bg-white/80 backdrop-blur-lg border border-yellow-200 rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-orange-600" />
                  Add New Client
                </h3>
                <form onSubmit={handleAddClient} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Client Name</label>
                      <input
                        type="text"
                        value={clientForm.name}
                        onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                        className="w-full p-4 bg-white border border-yellow-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter client name..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Designation</label>
                      <input
                        type="text"
                        value={clientForm.designation}
                        onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                        className="w-full p-4 bg-white border border-yellow-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., CEO, Designer, Developer..."
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Client Image</label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setShowClientCropper(true)}
                        className="w-full p-4 bg-white border border-yellow-300 rounded-xl text-gray-800 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Crop className="h-5 w-5" />
                        {clientForm.image ? 'Change Image (Cropped)' : 'Select & Crop Image'}
                      </button>
                      {clientForm.image && (
                        <div className="relative">
                          <img
                            src={previewImage || URL.createObjectURL(clientForm.image)}
                            alt="Client preview"
                            className="w-full h-32 object-cover rounded-lg border border-yellow-300"
                          />
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                            450×350px
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Client Testimonial</label>
                    <textarea
                      value={clientForm.description}
                      onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                      className="w-full p-4 bg-white border border-yellow-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                      rows={4}
                      placeholder="Enter client testimonial or feedback..."
                      required
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Add Client
                    </button>
                    <button
                      type="button"
                      onClick={resetForms}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {clients.map((client) => (
                <div key={client._id} className="bg-white/80 backdrop-blur-lg border border-yellow-200 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={client.image.startsWith('http') ? client.image : `http://localhost:5000/${client.image}`}
                      alt={client.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b566?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-200">{client.name}</h3>
                    <p className="text-orange-600 text-sm font-semibold mb-3">{client.designation}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">"{client.description}"</p>
                    <div className="flex justify-between items-center pt-4 border-t border-yellow-200">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(client.createdAt).toLocaleDateString()}
                      </div>
                      <button
                        onClick={() => handleDeleteClient(client._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
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
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Form Submissions</h2>
              <p className="text-gray-600">Review and manage customer inquiries and contact requests</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-yellow-200 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-yellow-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Full Name
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Mobile
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-yellow-200">
                    {contacts.map((contact, index) => (
                      <tr key={contact._id} className={`hover:bg-yellow-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/30' : 'bg-yellow-50/30'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-800 font-semibold">{contact.fullName}</div>
                          {contact.message && (
                            <div className="text-gray-600 text-sm mt-1 truncate max-w-xs" title={contact.message}>
                              {contact.message}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {contact.mobileNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {contact.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteContact(contact._id!)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
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
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Email Subscriptions</h2>
              <p className="text-gray-600">Manage newsletter subscribers and email marketing lists</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-yellow-200 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-yellow-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Address
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Date Subscribed
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-yellow-200">
                    {subscriptions.map((subscription, index) => (
                      <tr key={subscription._id} className={`hover:bg-yellow-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/30' : 'bg-yellow-50/30'}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">
                          {subscription.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            subscription.isActive !== false 
                              ? 'bg-green-100 text-green-700 border border-green-300' 
                              : 'bg-red-100 text-red-700 border border-red-300'
                          }`}>
                            {subscription.isActive !== false ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Active
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 mr-2" />
                                Inactive
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {subscription.createdAt ? new Date(subscription.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteSubscription(subscription._id!)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-yellow-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-yellow-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Site
              </Link>
              <div className="h-6 w-px bg-yellow-300"></div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Home className="h-8 w-8 text-yellow-600 mr-3" />
                Admin Dashboard
              </h1>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Admin Panel
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-lg border border-yellow-200 rounded-xl p-6 hover:bg-white/90 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Projects</p>
                <p className="text-2xl font-bold text-yellow-600">{projects.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-yellow-200 rounded-xl p-6 hover:bg-white/90 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Happy Clients</p>
                <p className="text-2xl font-bold text-orange-600">{clients.length}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-yellow-200 rounded-xl p-6 hover:bg-white/90 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Contact Messages</p>
                <p className="text-2xl font-bold text-yellow-700">{contacts.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-yellow-700" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-yellow-200 rounded-xl p-6 hover:bg-white/90 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Subscribers</p>
                <p className="text-2xl font-bold text-orange-700">{subscriptions.length}</p>
              </div>
              <Mail className="h-8 w-8 text-orange-700" />
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-white/70 backdrop-blur-lg border border-yellow-200 rounded-xl p-2 mb-8 shadow-lg">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'projects', label: 'Projects', color: 'yellow', icon: FolderOpen },
              { key: 'clients', label: 'Clients', color: 'orange', icon: Users },
              { key: 'contacts', label: 'Contacts', color: 'yellow', icon: MessageSquare },
              { key: 'subscriptions', label: 'Subscriptions', color: 'orange', icon: Mail }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key as TabType);
                    resetForms();
                  }}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? `bg-${tab.color}-500 text-white shadow-lg transform scale-105`
                      : 'text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Image Croppers */}
      {showProjectCropper && (
        <ImageCropper
          onCropComplete={handleProjectImageCrop}
          onCancel={() => setShowProjectCropper(false)}
          aspectRatio={450 / 350}
          cropWidth={450}
          cropHeight={350}
          maxFileSize={5}
        />
      )}
      
      {showClientCropper && (
        <ImageCropper
          onCropComplete={handleClientImageCrop}
          onCancel={() => setShowClientCropper(false)}
          aspectRatio={450 / 350}
          cropWidth={450}
          cropHeight={350}
          maxFileSize={5}
        />
      )}
    </div>
  );
};

export default Admin;
