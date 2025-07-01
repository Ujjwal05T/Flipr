import { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Building, 
  TrendingUp, 
  Palette, 
  Megaphone,
  ArrowRight,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

// Import new components
import ProjectsSection from '../components/ProjectsSection';
import ClientsSection from '../components/ClientsSection';
import SubscriptionComponent from '../components/Subscription';
import { contactApi, type ContactForm } from '../services/apiService';

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Contact form state
  const [contactFormData, setContactFormData] = useState<ContactForm>({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await contactApi.submit(contactFormData);
      if (response.success) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully.');
        setContactFormData({
          fullName: '',
          email: '',
          mobileNumber: '',
          city: '',
          message: ''
        });
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setStatusMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Home className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">Real Trust</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">HOME</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">SERVICES</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">RECENT PROJECTS</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">OUR REFERENCE</a>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                  GET STARTED
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">HOME</a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">SERVICES</a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">RECENT PROJECTS</a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">OUR REFERENCE</a>
                <button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-base font-medium">
                  GET STARTED
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Professional consultation team"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-blue-900 bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="text-white text-center px-6">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    Consultation,<br />
                    Design,<br />
                    & Marketing
                  </h1>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-600 rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Get A Free Consultation</h2>
              <form onSubmit={handleContactFormSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    name="fullName"
                    value={contactFormData.fullName}
                    onChange={handleContactFormChange}
                    placeholder="FULL NAME" 
                    required
                    className="w-full px-4 py-3 rounded-md bg-blue-700 text-white placeholder-blue-200 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactFormChange}
                    placeholder="EMAIL ADDRESS" 
                    required
                    className="w-full px-4 py-3 rounded-md bg-blue-700 text-white placeholder-blue-200 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    name="mobileNumber"
                    value={contactFormData.mobileNumber}
                    onChange={handleContactFormChange}
                    placeholder="PHONE" 
                    required
                    className="w-full px-4 py-3 rounded-md bg-blue-700 text-white placeholder-blue-200 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    name="city"
                    value={contactFormData.city}
                    onChange={handleContactFormChange}
                    placeholder="CITY" 
                    required
                    className="w-full px-4 py-3 rounded-md bg-blue-700 text-white placeholder-blue-200 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <textarea 
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactFormChange}
                    placeholder="MESSAGE" 
                    rows={4}
                    className="w-full px-4 py-3 rounded-md bg-blue-700 text-white placeholder-blue-200 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  ></textarea>
                </div>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <div className={`p-3 rounded-md text-sm ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {statusMessage}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      SENDING...
                    </>
                  ) : (
                    'SEND MESSAGE'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Not Your Average Realtor Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Not Your Average Realtor</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We can't get you deals, but we promise you that we will do our best to help you market your developments, or new builds until they're sold. We will help you design your space and market it efficiently with sales.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Professional consultation"
                  className="rounded-full w-32 h-32 object-cover mx-auto shadow-lg"
                />
                <img 
                  src="https://images.pexels.com/photos/3184420/pexels-photo-3184420.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Design planning"
                  className="rounded-full w-24 h-24 object-cover mx-auto shadow-lg"
                />
              </div>
              <div className="pt-12">
                <img 
                  src="https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Marketing consultation"
                  className="rounded-full w-28 h-28 object-cover mx-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Potential ROI</h3>
              <p className="text-gray-600 leading-relaxed">
                Creating a space where potential clients can actually buy into the lifestyle. Paired with our excellent partner rates, we can create your reality.
              </p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Design</h3>
              <p className="text-gray-600 leading-relaxed">
                We offer a full line of interior design services. Choose from design consultations, you get design agreement and everything that is involved in the entire creation.
              </p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Megaphone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Marketing</h3>
              <p className="text-gray-600 leading-relaxed">
                We help our sales team by partnering them with an expert marketing team experienced guide to the entire process, making it a lot smoother from a-z.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Consultation project"
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute top-4 left-4">
                <div className="w-8 h-8 bg-blue-600 rounded-sm"></div>
              </div>
            </div>
            <div className="relative group">
              <img 
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Design project"
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute bottom-4 right-4">
                <div className="w-12 h-12 bg-blue-600 rounded-sm"></div>
              </div>
            </div>
            <div className="relative group md:col-span-2 lg:col-span-1">
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Marketing project"
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-orange-500 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg leading-relaxed">
            These questions can start at any stage, be it a restaurant's design or perhaps you would like to 
            contact them for some first-time guidance or design a stage with us to ensure equality and quality 
            while also maintaining code compliance in business facilities. This is where we begin all our 
            partnerships, by building clients and in the end that means professional management and experience 
            by understanding people deeply.
          </p>
          <button className="mt-8 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
            LEARN MORE
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Our Projects - Connected to Backend */}
      <ProjectsSection />

      {/* Happy Clients - Connected to Backend */}
      <ClientsSection />

      {/* Final CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Learn more about our listing process, as well as our additional staging and design work.
          </h2>
          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-colors">
            GET STARTED TODAY
          </button>
        </div>
      </section>

      {/* Newsletter Subscription - Connected to Backend */}
      <SubscriptionComponent />

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Home className="h-8 w-8 text-white mr-2" />
                <span className="text-xl font-bold">Real Trust</span>
              </div>
              <p className="text-blue-200 text-sm">
                Professional real estate consultation, design, and marketing services.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Consultation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Construction</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-blue-200 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Real Trust Phone</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Real Trust Email</span>
                </div>
              </div>
              <div className="flex space-x-4 mt-4">
                <Facebook className="h-5 w-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p className="text-blue-200 text-sm">© 2024 Real Trust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;