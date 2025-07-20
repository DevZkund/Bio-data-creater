import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Star,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Download,
  Palette,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                BiodataCreator
              </h1>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-rose-500 transition-colors"
              >
                Home
              </Link>
              <Link to="/about" className="text-rose-500 font-medium">
                About
              </Link>
              <Link
                to="/templates"
                className="text-gray-600 hover:text-rose-500 transition-colors"
              >
                Templates
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-rose-100 text-rose-700 mb-4">
            <Award className="h-4 w-4 mr-1" />
            Trusted by 10,000+ families
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            About <span className="text-rose-500">BiodataCreator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about helping families create beautiful,
            professional marriage biodata that showcase personalities and
            connect hearts across India.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-8 border-0 bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-rose-600 mb-2">
                10,000+
              </div>
              <p className="text-gray-600">Happy Families</p>
            </CardContent>
          </Card>
          <Card className="text-center p-8 border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">33+</div>
              <p className="text-gray-600">Beautiful Templates</p>
            </CardContent>
          </Card>
          <Card className="text-center p-8 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                50,000+
              </div>
              <p className="text-gray-600">Biodata Created</p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              BiodataCreator was born from a simple observation: creating a
              marriage biodata shouldn't be stressful or time-consuming. Every
              family deserves a beautiful, professional way to share their loved
              one's story.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We started with 4 templates and have grown to offer 33+ stunning
              designs, each crafted with cultural sensitivity and modern
              aesthetics in mind.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">
                  Traditional and modern designs
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Cultural sensitivity</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">
                  Professional quality output
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-rose-100 to-pink-200 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center">
              <Heart className="h-16 w-16 text-rose-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Made with Love
              </h3>
              <p className="text-gray-600">
                Every template is designed with care, understanding the
                importance of this special moment in your family's journey.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">33+ Templates</h3>
              <p className="text-gray-600">
                From traditional to modern, find the perfect design for your
                family.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">
                Your data stays secure. We don't store any personal information.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
              <p className="text-gray-600">
                Get your professionally designed biodata in seconds as PDF.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Approved</h3>
              <p className="text-gray-600">
                Trusted by thousands of families across India for their special
                moments.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Biodata?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who have created beautiful biodata with
            us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-rose-500 hover:bg-gray-100"
              asChild
            >
              <Link to="/">
                Start Creating Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-rose-500"
              asChild
            >
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-semibold">BiodataCreator</span>
            </div>
            <p className="text-gray-400">
              Creating beautiful marriage biodata since 2024
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Appsylo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
