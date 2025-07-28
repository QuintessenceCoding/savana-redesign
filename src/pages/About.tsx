import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Users, Leaf } from 'lucide-react';
import aboutImage from '@/assets/about-image.jpg';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-accent" />,
      title: "Empowerment",
      description: "We believe every woman deserves to feel confident and beautiful in her own skin."
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: "Quality",
      description: "Premium materials and meticulous craftsmanship in every piece we create."
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Community",
      description: "Building a supportive community of women who inspire and uplift each other."
    },
    {
      icon: <Leaf className="h-8 w-8 text-accent" />,
      title: "Sustainability",
      description: "Committed to ethical practices and sustainable fashion for a better future."
    }
  ];

  const team = [
    {
      name: "Elena Rodriguez",
      role: "Founder & Creative Director",
      description: "With 15 years in fashion, Elena brings a vision of accessible luxury to modern women."
    },
    {
      name: "Sofia Chen",
      role: "Head of Design",
      description: "Sofia's keen eye for detail and trend forecasting shapes our seasonal collections."
    },
    {
      name: "Maya Johnson",
      role: "Sustainability Lead",
      description: "Maya ensures our commitment to ethical practices across our entire supply chain."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-light text-primary mb-6">
                Our Story
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Savana was born from a simple belief: that every woman deserves clothing that makes her feel powerful, beautiful, and authentically herself. Founded in 2020, we've been on a mission to create pieces that seamlessly blend soft femininity with urban sophistication.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our collections are designed for the modern woman who values both style and substance, seeking pieces that transcend trends and become cherished parts of her wardrobe.
              </p>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src={aboutImage}
                  alt="Savana brand story"
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from design to delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 bg-background hover-lift text-center">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-primary mb-8">
            Our Mission
          </h2>
          <blockquote className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic">
            "To create timeless, elegant pieces that empower women to express their unique style while feeling confident, comfortable, and authentically themselves in every moment of their lives."
          </blockquote>
          <div className="mt-8 w-24 h-px bg-accent mx-auto"></div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground">
              The passionate women behind Savana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 bg-background hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-accent/20 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-medium text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-primary mb-6">
                Sustainability Commitment
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We're dedicated to creating beautiful fashion that doesn't compromise our planet's future. Our commitment includes:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Ethically sourced materials from certified suppliers</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Carbon-neutral shipping on all orders</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Waste reduction initiatives in our production process</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Supporting local artisans and communities</span>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Ethical Sourcing</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-2">0</div>
                <div className="text-sm text-muted-foreground">Carbon Footprint</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Artisans Supported</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-2">50%</div>
                <div className="text-sm text-muted-foreground">Waste Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;