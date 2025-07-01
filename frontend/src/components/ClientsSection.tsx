import React, { useState, useEffect } from 'react';
import { clientApi, type Client } from '../services/apiService';
import { Star } from 'lucide-react';

const ClientsSection: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await clientApi.getAll();
        if (response.success) {
          setClients(response.data.slice(0, 4)); // Show only first 4 clients
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load client testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Happy Clients</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
          <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Happy Clients</h2>
        </div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No client testimonials available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">We're working on gathering feedback from our valued clients!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div key={client._id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <img
                  src={client.image.startsWith('http') ? client.image : `http://localhost:5000/${client.image}`}
                  alt={client.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=3B82F6&color=fff`;
                  }}
                />
                <div className="flex justify-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">"{client.description}"</p>
                <h4 className="font-semibold text-gray-900">{client.name}</h4>
                <p className="text-gray-500 text-sm">{client.designation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
