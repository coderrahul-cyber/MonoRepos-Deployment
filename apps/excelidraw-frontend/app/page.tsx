"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  Palette, 
  Layers, 
  Share2, 
  Zap, 
  Users, 
  Download,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  Play,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Palette,
      title: "Intuitive Drawing Tools",
      description: "Create beautiful diagrams with our comprehensive set of drawing tools and shapes.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Layers,
      title: "Layer Management",
      description: "Organize your work with advanced layer management and grouping capabilities.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Share2,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, see changes as they happen.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures smooth drawing experience even with complex diagrams.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Team Workspaces",
      description: "Create shared workspaces for your team projects and maintain version control.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Download,
      title: "Export Anywhere",
      description: "Export your creations in multiple formats including PNG, SVG, and PDF.",
      color: "from-red-500 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      company: "TechCorp",
      content: "Excil Draw has revolutionized how our team collaborates on design projects. The real-time features are incredible!",
      avatar: "SC"
    },
    {
      name: "Mike Johnson",
      role: "Engineering Manager",
      company: "StartupXYZ",
      content: "The best drawing tool we've used. Clean interface, powerful features, and excellent performance.",
      avatar: "MJ"
    },
    {
      name: "Emily Rodriguez",
      role: "UX Researcher",
      company: "DesignStudio",
      content: "Perfect for creating user journey maps and wireframes. Our entire team has adopted it.",
      avatar: "ER"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Excil Draw
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Reviews
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Pricing
              </Link>
              <Link href="/signin">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 bg-white">
              <div className="flex flex-col space-y-4">
                <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors">
                  Features
                </Link>
                <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors">
                  Reviews
                </Link>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors">
                  Pricing
                </Link>
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-100">
                  <Link href="/signin">
                    <Button variant="outline" className="w-full font-medium">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ teams worldwide
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Create Beautiful{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Diagrams
              </span>
              <br />
              That Tell Stories
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              The intuitive drawing tool that helps teams visualize ideas, create stunning diagrams, 
              and collaborate in real-time. Start creating beautiful visuals in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Start Drawing for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-3xl p-8 shadow-2xl border border-gray-200">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 rounded-lg h-8 flex items-center px-4">
                      <span className="text-sm text-gray-500">excildraw.com/canvas</span>
                    </div>
                  </div>
                  <div className="h-80 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Palette className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Creative Canvas</h3>
                      <p className="text-gray-600">Start drawing amazing diagrams here</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse opacity-80 shadow-lg"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-pulse opacity-80 shadow-lg"></div>
              <div className="absolute top-1/2 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-pulse opacity-60 shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to create
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful tools designed for teams who want to move fast and create beautiful work that stands out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group bg-white"
                >
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by teams everywhere
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users have to say about their experience with Excil Draw
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-200 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">&quot;{testimonial.content}&quot;</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to start creating?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams already using Excil Draw to bring their ideas to life. 
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button 
                variant="outline"
                size="lg" 
                className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200 font-semibold"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Excil Draw</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-6">
                The modern drawing tool for teams who want to create, collaborate, and communicate visually. 
                Built for the future of work.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">tw</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">gh</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Product</h3>
              <div className="space-y-3 text-gray-400">
                <p className="hover:text-white transition-colors cursor-pointer">Features</p>
                <p className="hover:text-white transition-colors cursor-pointer">Pricing</p>
                <p className="hover:text-white transition-colors cursor-pointer">Templates</p>
                <p className="hover:text-white transition-colors cursor-pointer">Integrations</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Company</h3>
              <div className="space-y-3 text-gray-400">
                <p className="hover:text-white transition-colors cursor-pointer">About</p>
                <p className="hover:text-white transition-colors cursor-pointer">Blog</p>
                <p className="hover:text-white transition-colors cursor-pointer">Careers</p>
                <p className="hover:text-white transition-colors cursor-pointer">Contact</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Excil Draw. All rights reserved. Built with ❤️ for creative teams.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}