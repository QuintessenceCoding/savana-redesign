import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-accent" />,
      title: "Email Us",
      details: "hello@savana.com",
      subDetails: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subDetails: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Visit Us",
      details: "123 Fashion District",
      subDetails: "New York, NY 10013"
    }
  ];

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, name: "Instagram", href: "#" },
    { icon: <Facebook className="h-5 w-5" />, name: "Facebook", href: "#" },
    { icon: <Twitter className="h-5 w-5" />, name: "Twitter", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-primary mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-0 bg-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-medium text-primary mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="styling">Styling Advice</option>
                      <option value="press">Press & Media</option>
                      <option value="wholesale">Wholesale Inquiries</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-medium text-primary mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 bg-card hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-primary mb-1">{info.title}</h3>
                          <p className="text-muted-foreground mb-1">{info.details}</p>
                          <p className="text-sm text-muted-foreground">{info.subDetails}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-medium text-primary mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-3 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors hover-lift"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <Card className="border-0 bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-primary mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-primary mb-1">What's your return policy?</h4>
                    <p className="text-sm text-muted-foreground">We offer 30-day returns on all unworn items with tags attached.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">How long does shipping take?</h4>
                    <p className="text-sm text-muted-foreground">Standard shipping takes 3-5 business days. Express shipping is available.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">Do you offer international shipping?</h4>
                    <p className="text-sm text-muted-foreground">Yes, we ship worldwide. International orders may take 7-14 business days.</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 elegant-underline">
                  View All FAQs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-accent/10 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest collections, styling tips, and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-accent bg-background"
            />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;