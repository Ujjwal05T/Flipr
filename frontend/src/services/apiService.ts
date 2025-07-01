import api from './api';

// Types
export interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  _id: string;
  name: string;
  description: string;
  designation: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactForm {
  _id?: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subscription {
  _id?: string;
  email: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectData {
  name: string;
  description: string;
  image: File;
}

export interface CreateClientData {
  name: string;
  description: string;
  designation: string;
  image: File;
}

// Project API
export const projectApi = {
  getAll: async (): Promise<{ success: boolean; data: Project[]; message: string }> => {
    return await api.get('/projects');
  },
  
  getById: async (id: string): Promise<{ success: boolean; data: Project; message: string }> => {
    return await api.get(`/projects/${id}`);
  },

  create: async (projectData: CreateProjectData): Promise<{ success: boolean; data: Project; message: string }> => {
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('description', projectData.description);
    formData.append('image', projectData.image);
    
    return await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  update: async (id: string, projectData: Partial<CreateProjectData>): Promise<{ success: boolean; data: Project; message: string }> => {
    const formData = new FormData();
    if (projectData.name) formData.append('name', projectData.name);
    if (projectData.description) formData.append('description', projectData.description);
    if (projectData.image) formData.append('image', projectData.image);
    
    return await api.put(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return await api.delete(`/projects/${id}`);
  }
};

// Client API
export const clientApi = {
  getAll: async (): Promise<{ success: boolean; data: Client[]; message: string }> => {
    return await api.get('/clients');
  },
  
  getById: async (id: string): Promise<{ success: boolean; data: Client; message: string }> => {
    return await api.get(`/clients/${id}`);
  },

  create: async (clientData: CreateClientData): Promise<{ success: boolean; data: Client; message: string }> => {
    const formData = new FormData();
    formData.append('name', clientData.name);
    formData.append('description', clientData.description);
    formData.append('designation', clientData.designation);
    formData.append('image', clientData.image);
    
    return await api.post('/clients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  update: async (id: string, clientData: Partial<CreateClientData>): Promise<{ success: boolean; data: Client; message: string }> => {
    const formData = new FormData();
    if (clientData.name) formData.append('name', clientData.name);
    if (clientData.description) formData.append('description', clientData.description);
    if (clientData.designation) formData.append('designation', clientData.designation);
    if (clientData.image) formData.append('image', clientData.image);
    
    return await api.put(`/clients/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return await api.delete(`/clients/${id}`);
  }
};

// Contact API
export const contactApi = {
  getAll: async (page: number = 1, limit: number = 10): Promise<{ 
    success: boolean; 
    data: ContactForm[]; 
    pagination: { page: number; limit: number; total: number; pages: number }; 
    message: string 
  }> => {
    return await api.get(`/contacts?page=${page}&limit=${limit}`);
  },

  getById: async (id: string): Promise<{ success: boolean; data: ContactForm; message: string }> => {
    return await api.get(`/contacts/${id}`);
  },

  submit: async (contactData: ContactForm): Promise<{ success: boolean; data: any; message: string }> => {
    return await api.post('/contacts', contactData);
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return await api.delete(`/contacts/${id}`);
  }
};

// Subscription API
export const subscriptionApi = {
  getAll: async (page: number = 1, limit: number = 10): Promise<{ 
    success: boolean; 
    data: Subscription[]; 
    pagination: { page: number; limit: number; total: number; pages: number }; 
    message: string 
  }> => {
    return await api.get(`/subscriptions?page=${page}&limit=${limit}`);
  },

  subscribe: async (subscriptionData: Subscription): Promise<{ success: boolean; data: any; message: string }> => {
    return await api.post('/subscriptions', subscriptionData);
  },
  
  unsubscribe: async (email: string): Promise<{ success: boolean; data: any; message: string }> => {
    return await api.post('/subscriptions/unsubscribe', { email });
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return await api.delete(`/subscriptions/${id}`);
  }
};
