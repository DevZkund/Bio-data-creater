import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Star,
  Search,
  Eye,
  Crown,
  Sparkles,
  Flower,
  Palette,
  Zap,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Traditional Elegance",
    description: "Classic design with traditional borders",
    category: "Traditional",
    gradient: "from-amber-100 to-orange-100",
    icon: Crown,
    popular: true,
    preview:
      "https://cdn.builder.io/api/v1/image/assets%2F4772890f0fbb4523b6765a1c3264c1e2%2F4b201cf487f448adad40a9b6c8a7558a?format=webp&width=800",
  },
  {
    id: 2,
    name: "Modern Minimalist",
    description: "Clean and contemporary layout",
    category: "Modern",
    gradient: "from-gray-100 to-slate-100",
    icon: Zap,
    popular: true,
    preview:
      "https://cdn.builder.io/api/v1/image/assets%2F4772890f0fbb4523b6765a1c3264c1e2%2F4b201cf487f448adad40a9b6c8a7558a?format=webp&width=800",
  },
  {
    id: 3,
    name: "Royal Heritage",
    description: "Ornate design with cultural motifs",
    category: "Premium",
    gradient: "from-purple-100 to-indigo-100",
    icon: Crown,
    popular: false,
    preview:
      "https://cdn.builder.io/api/v1/image/assets%2F4772890f0fbb4523b6765a1c3264c1e2%2F4b201cf487f448adad40a9b6c8a7558a?format=webp&width=800",
  },
  {
    id: 4,
    name: "Floral Bliss",
    description: "Beautiful floral patterns and soft colors",
    category: "Artistic",
    gradient: "from-pink-100 to-rose-100",
    icon: Flower,
    popular: true,
    preview:
      "https://cdn.builder.io/api/v1/image/assets%2F4772890f0fbb4523b6765a1c3264c1e2%2F4b201cf487f448adad40a9b6c8a7558a?format=webp&width=800",
  },
  // Adding more templates for showcase
  {
    id: 5,
    name: "Golden Luxury",
    description: "Premium gold accents with elegant typography",
    category: "Premium",
    gradient: "from-yellow-100 to-amber-100",
    icon: Sparkles,
    popular: false,
    preview:
      "https://cdn.builder.io/api/v1/image/assets%2F4772890f0fbb4523b6765a1c3264c1e2%2F4b201cf487f448adad40a9b6c8a7558a?format=webp&width=800",
  },
  {
    id: 6,
    name: "Ocean Breeze",
    description: "Fresh blue tones with modern styling",
    category: "Modern",
    gradient: "from-blue-100 to-cyan-100",
    icon: Palette,
    popular: false,
    preview:
      "https://cdn.builder.io/api/v1/image/assets%2F4772890f0fbb4523b6765a1c3264c1e2%2F4b201cf487f448adad40a9b6c8a7558a?format=webp&width=800",
  },
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories = [
    "All",
    "Traditional",
    "Modern",
    "Premium",
    "Artistic",
    "Professional",
    "Vintage",
    "Romantic",
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <Link
                to="/about"
                className="text-gray-600 hover:text-rose-500 transition-colors"
              >
                About
              </Link>
              <Link to="/templates" className="text-rose-500 font-medium">
                Templates
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Choose Your Perfect
            <span className="text-rose-500 block">Template</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our collection of 33+ professionally designed biodata
            templates. Each template is crafted with attention to detail and
            cultural sensitivity.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-rose-500 text-white border-rose-500"
                      : "hover:bg-rose-50 hover:border-rose-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Showing {filteredTemplates.length} templates
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredTemplates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card
                key={template.id}
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border hover:border-rose-200 hover-lift"
              >
                <CardContent className="p-0">
                  <div
                    className={`aspect-[3/4] bg-gradient-to-br ${template.gradient} relative overflow-hidden rounded-t-lg`}
                  >
                    {template.popular && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-rose-500 text-white text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}

                    {/* Template Preview Image */}
                    <div className="absolute inset-0">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-full object-cover opacity-60"
                      />
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-center justify-center p-6 text-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-rose-500" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">
                        {template.name}
                      </h3>
                      <p className="text-sm text-white/90 mb-4 drop-shadow">
                        {template.description}
                      </p>
                      <Badge
                        variant="outline"
                        className="bg-white/80 text-gray-800 border-white/50"
                      >
                        {template.category}
                      </Badge>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-all duration-300" />

                    {/* Preview Button */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Button
                        size="sm"
                        className="w-full bg-white text-gray-800 hover:bg-gray-100"
                        asChild
                      >
                        <Link to={`/?template=${template.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Use This Template
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No templates found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find the Perfect Template?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Don't worry! You can customize any template to match your style
            perfectly in our editor.
          </p>
          <Button
            size="lg"
            className="bg-white text-rose-500 hover:bg-gray-100"
            asChild
          >
            <Link to="/">Start Creating Your Biodata</Link>
          </Button>
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
              © 2024 BiodataCreator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
