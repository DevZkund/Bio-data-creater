import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Star,
  Users,
  Eye,
  Sparkles,
  Crown,
  Flower,
  Palette,
  Zap,
} from "lucide-react";
import BiodataForm from "@/components/BiodataForm";
import BiodataEditor from "@/components/BiodataEditor";

interface BiodataData {
  personal: {
    name: string;
    dob: string;
    timeOfBirth: string;
    placeOfBirth: string;
    rashi: string;
    nakshatra: string;
    complexion: string;
    height: string;
    education: string;
    occupation: string;
    annualIncome: string;
    hobbies: string;
    profileImage: string;
    showFields: {
      timeOfBirth: boolean;
      complexion: boolean;
      height: boolean;
      education: boolean;
      occupation: boolean;
      annualIncome: boolean;
      hobbies: boolean;
    };
  };
  family: {
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    siblings: Array<{
      relation: string;
      maritalStatus: string;
      details: string;
    }>;
    familyType: string;
    ancestralOrigin: string;
    showFields: {
      fatherName: boolean;
      fatherOccupation: boolean;
      motherName: boolean;
      motherOccupation: boolean;
      siblings: boolean;
      familyType: boolean;
      ancestralOrigin: boolean;
    };
  };
  contact: {
    mobile: string;
    email: string;
    address: string;
    additionalFields: Array<{
      label: string;
      value: string;
    }>;
    showFields: {
      mobile: boolean;
      email: boolean;
      address: boolean;
    };
  };
}

const templates = [
  {
    id: 1,
    name: "Traditional Elegance",
    image: "/placeholder.svg",
    description: "Classic design with traditional borders",
    category: "Traditional",
    gradient: "from-amber-100 to-orange-100",
    icon: Crown,
    popular: true,
  },
  {
    id: 2,
    name: "Modern Minimalist",
    image: "/placeholder.svg",
    description: "Clean and contemporary layout",
    category: "Modern",
    gradient: "from-gray-100 to-slate-100",
    icon: Zap,
    popular: true,
  },
  {
    id: 3,
    name: "Royal Heritage",
    image: "/placeholder.svg",
    description: "Ornate design with cultural motifs",
    category: "Premium",
    gradient: "from-purple-100 to-indigo-100",
    icon: Crown,
    popular: false,
  },
  {
    id: 4,
    name: "Floral Bliss",
    image: "/placeholder.svg",
    description: "Beautiful floral patterns and soft colors",
    category: "Artistic",
    gradient: "from-pink-100 to-rose-100",
    icon: Flower,
    popular: true,
  },
  {
    id: 5,
    name: "Golden Luxury",
    image: "/placeholder.svg",
    description: "Premium gold accents with elegant typography",
    category: "Premium",
    gradient: "from-yellow-100 to-amber-100",
    icon: Sparkles,
    popular: false,
  },
  {
    id: 6,
    name: "Ocean Breeze",
    image: "/placeholder.svg",
    description: "Fresh blue tones with modern styling",
    category: "Modern",
    gradient: "from-blue-100 to-cyan-100",
    icon: Palette,
    popular: false,
  },
  {
    id: 7,
    name: "Vintage Romance",
    image: "/placeholder.svg",
    description: "Romantic vintage design with ornate details",
    category: "Vintage",
    gradient: "from-red-100 to-pink-100",
    icon: Heart,
    popular: true,
  },
  {
    id: 8,
    name: "Contemporary Chic",
    image: "/placeholder.svg",
    description: "Sophisticated design for modern professionals",
    category: "Modern",
    gradient: "from-emerald-100 to-teal-100",
    icon: Star,
    popular: false,
  },
  {
    id: 9,
    name: "Sacred Traditions",
    image: "/placeholder.svg",
    description: "Religious motifs with spiritual symbolism",
    category: "Traditional",
    gradient: "from-orange-100 to-red-100",
    icon: Crown,
    popular: false,
  },
  {
    id: 10,
    name: "Artistic Canvas",
    image: "/placeholder.svg",
    description: "Creative design with artistic elements",
    category: "Artistic",
    gradient: "from-violet-100 to-purple-100",
    icon: Palette,
    popular: false,
  },
  {
    id: 11,
    name: "Nature's Beauty",
    image: "/placeholder.svg",
    description: "Natural green tones with botanical elements",
    category: "Artistic",
    gradient: "from-green-100 to-lime-100",
    icon: Flower,
    popular: true,
  },
  {
    id: 12,
    name: "Executive Style",
    image: "/placeholder.svg",
    description: "Professional layout for corporate profiles",
    category: "Professional",
    gradient: "from-slate-100 to-gray-100",
    icon: Star,
    popular: false,
  },
  {
    id: 13,
    name: "Bollywood Glamour",
    image: "/placeholder.svg",
    description: "Glamorous design with star-like appeal",
    category: "Premium",
    gradient: "from-fuchsia-100 to-pink-100",
    icon: Sparkles,
    popular: true,
  },
  {
    id: 14,
    name: "Cosmic Dreams",
    image: "/placeholder.svg",
    description: "Celestial theme with starry backgrounds",
    category: "Artistic",
    gradient: "from-indigo-100 to-blue-100",
    icon: Star,
    popular: false,
  },
  {
    id: 15,
    name: "Heritage Pride",
    image: "/placeholder.svg",
    description: "Cultural heritage with traditional patterns",
    category: "Traditional",
    gradient: "from-amber-100 to-yellow-100",
    icon: Crown,
    popular: false,
  },
  {
    id: 16,
    name: "Sunset Elegance",
    image: "/placeholder.svg",
    description: "Warm sunset colors with elegant fonts",
    category: "Romantic",
    gradient: "from-orange-100 to-pink-100",
    icon: Heart,
    popular: false,
  },
  {
    id: 17,
    name: "Crystal Clear",
    image: "/placeholder.svg",
    description: "Ultra-clean design with crystal clarity",
    category: "Modern",
    gradient: "from-gray-50 to-blue-50",
    icon: Zap,
    popular: false,
  },
  {
    id: 18,
    name: "Majestic Royal",
    image: "/placeholder.svg",
    description: "Royal treatment with majestic elements",
    category: "Premium",
    gradient: "from-purple-100 to-pink-100",
    icon: Crown,
    popular: true,
  },
  {
    id: 19,
    name: "Divine Blessings",
    image: "/placeholder.svg",
    description: "Sacred design with divine motifs",
    category: "Traditional",
    gradient: "from-orange-100 to-red-100",
    icon: Crown,
    popular: false,
  },
  {
    id: 20,
    name: "Minimalist Pro",
    image: "/placeholder.svg",
    description: "Ultra-minimal professional design",
    category: "Professional",
    gradient: "from-slate-100 to-gray-100",
    icon: Zap,
    popular: true,
  },
  {
    id: 21,
    name: "Garden Dreams",
    image: "/placeholder.svg",
    description: "Lush garden theme with nature elements",
    category: "Artistic",
    gradient: "from-emerald-100 to-green-100",
    icon: Flower,
    popular: false,
  },
  {
    id: 22,
    name: "Starlight Magic",
    image: "/placeholder.svg",
    description: "Magical starlit night design",
    category: "Romantic",
    gradient: "from-indigo-100 to-purple-100",
    icon: Star,
    popular: true,
  },
  {
    id: 23,
    name: "Corporate Elite",
    image: "/placeholder.svg",
    description: "Executive-level professional presentation",
    category: "Professional",
    gradient: "from-blue-100 to-slate-100",
    icon: Star,
    popular: false,
  },
  {
    id: 24,
    name: "Rainbow Spectrum",
    image: "/placeholder.svg",
    description: "Vibrant multicolor artistic design",
    category: "Artistic",
    gradient: "from-pink-100 to-yellow-100",
    icon: Palette,
    popular: false,
  },
  {
    id: 25,
    name: "Peacock Majesty",
    image: "/placeholder.svg",
    description: "Elegant peacock-inspired traditional design",
    category: "Traditional",
    gradient: "from-teal-100 to-blue-100",
    icon: Crown,
    popular: true,
  },
  {
    id: 26,
    name: "Lotus Serenity",
    image: "/placeholder.svg",
    description: "Peaceful lotus-themed spiritual design",
    category: "Traditional",
    gradient: "from-pink-100 to-purple-100",
    icon: Flower,
    popular: false,
  },
  {
    id: 27,
    name: "Tech Innovator",
    image: "/placeholder.svg",
    description: "Modern tech professional layout",
    category: "Modern",
    gradient: "from-cyan-100 to-blue-100",
    icon: Zap,
    popular: false,
  },
  {
    id: 28,
    name: "Vintage Charm",
    image: "/placeholder.svg",
    description: "Classic vintage with old-world charm",
    category: "Vintage",
    gradient: "from-amber-100 to-orange-100",
    icon: Heart,
    popular: true,
  },
  {
    id: 29,
    name: "Diamond Elegance",
    image: "/placeholder.svg",
    description: "Luxurious diamond-inspired premium design",
    category: "Premium",
    gradient: "from-gray-100 to-slate-100",
    icon: Sparkles,
    popular: false,
  },
  {
    id: 30,
    name: "Cherry Blossom",
    image: "/placeholder.svg",
    description: "Delicate cherry blossom romantic theme",
    category: "Romantic",
    gradient: "from-pink-100 to-rose-100",
    icon: Flower,
    popular: true,
  },
  {
    id: 31,
    name: "Mandala Art",
    image: "/placeholder.svg",
    description: "Intricate mandala artistic patterns",
    category: "Artistic",
    gradient: "from-purple-100 to-indigo-100",
    icon: Palette,
    popular: false,
  },
  {
    id: 32,
    name: "Renaissance Classic",
    image: "/placeholder.svg",
    description: "Classical renaissance-inspired design",
    category: "Vintage",
    gradient: "from-yellow-100 to-amber-100",
    icon: Crown,
    popular: false,
  },
  {
    id: 33,
    name: "Tropical Paradise",
    image: "/placeholder.svg",
    description: "Vibrant tropical theme with exotic elements",
    category: "Artistic",
    gradient: "from-lime-100 to-green-100",
    icon: Flower,
    popular: true,
  },
];

export default function Index() {
  const [currentSection, setCurrentSection] = useState<
    "landing" | "form" | "editor"
  >("landing");
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [biodataData, setBiodataData] = useState<BiodataData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const nextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentTemplateIndex(
      (prev) => (prev - 1 + templates.length) % templates.length,
    );
  };

  const handleStartCreating = () => {
    setCurrentSection("form");
  };

  const handleFormSubmit = (data: BiodataData) => {
    setBiodataData(data);
    setCurrentSection("editor");
  };

  const handleBackToForm = () => {
    setCurrentSection("form");
  };

  const getFilteredTemplates = () => {
    if (selectedCategory === "All") {
      return templates;
    }
    return templates.filter(
      (template) => template.category === selectedCategory,
    );
  };

  const getFilteredPopularTemplates = () => {
    const filtered = getFilteredTemplates().filter(
      (template) => template.popular,
    );
    return filtered.slice(0, 4);
  };

  if (currentSection === "editor" && biodataData) {
    return (
      <BiodataEditor biodataData={biodataData} onBack={handleBackToForm} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                BiodataCreator
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Badge variant="secondary" className="bg-rose-100 text-rose-700">
                <Star className="h-4 w-4 mr-1" />
                Trusted by 10,000+ families
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {currentSection === "landing" && (
          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* Hero Section */}
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                Create Your Perfect
                <span className="text-rose-500 block">Marriage Biodata</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Design beautiful, professional biodata with our easy-to-use
                templates. Showcase your personality and connect with the right
                match.
              </p>
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleStartCreating}
              >
                Start Creating Your Biodata
              </Button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 my-16">
              <div className="text-center space-y-4">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold">Beautiful Templates</h3>
                <p className="text-gray-600">
                  Choose from elegant, professionally designed templates
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold">Easy Customization</h3>
                <p className="text-gray-600">
                  Personalize fonts, colors, and layout to match your style
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Download className="h-8 w-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold">Instant Download</h3>
                <p className="text-gray-600">
                  Get your biodata as a high-quality PDF in seconds
                </p>
              </div>
            </div>

            {/* Template Gallery */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h3 className="text-4xl font-bold text-gray-800">
                  Choose Your Perfect Template
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover our collection of 33+ stunning biodata templates,
                  each crafted with love and attention to detail
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  "All",
                  "Traditional",
                  "Modern",
                  "Premium",
                  "Artistic",
                  "Professional",
                  "Vintage",
                  "Romantic",
                ].map((category) => (
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

              {/* Featured Templates */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <Star className="h-6 w-6 mr-2 text-rose-500" />
                    Popular Templates
                  </h4>
                  <Badge className="bg-rose-100 text-rose-700">
                    Most Loved
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getFilteredPopularTemplates().map((template) => {
                    const IconComponent = template.icon;
                    return (
                      <Card
                        key={template.id}
                        className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-rose-200 hover-lift"
                        onClick={() => {
                          setCurrentTemplateIndex(template.id - 1);
                          handleStartCreating();
                        }}
                      >
                        <CardContent className="p-0">
                          <div
                            className={`aspect-[3/4] bg-gradient-to-br ${template.gradient} relative overflow-hidden`}
                          >
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-rose-500 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Popular
                              </Badge>
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="h-8 w-8 text-rose-500" />
                              </div>
                              <h5 className="text-lg font-bold text-gray-800 mb-2">
                                {template.name}
                              </h5>
                              <p className="text-sm text-gray-600 mb-4">
                                {template.description}
                              </p>
                              <Badge variant="outline" className="bg-white/80">
                                {template.category}
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-all duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* All Templates Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <Palette className="h-6 w-6 mr-2 text-rose-500" />
                    All Templates
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>
                      {getFilteredTemplates().length} designs available
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredTemplates().map((template) => {
                    const IconComponent = template.icon;
                    return (
                      <Card
                        key={template.id}
                        className="group hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-rose-200 hover-lift animate-fadeIn"
                        onClick={() => {
                          setCurrentTemplateIndex(template.id - 1);
                          handleStartCreating();
                        }}
                        style={{ animationDelay: `${template.id * 50}ms` }}
                      >
                        <CardContent className="p-0">
                          <div
                            className={`aspect-[3/4] bg-gradient-to-br ${template.gradient} relative overflow-hidden`}
                          >
                            {template.popular && (
                              <div className="absolute top-2 right-2 z-10">
                                <Badge className="bg-rose-500 text-white text-xs">
                                  <Star className="h-2 w-2 mr-1" />
                                  Hot
                                </Badge>
                              </div>
                            )}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 mb-3 group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="h-6 w-6 text-rose-500" />
                              </div>
                              <h5 className="text-base font-semibold text-gray-800 mb-2">
                                {template.name}
                              </h5>
                              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                {template.description}
                              </p>
                              <Badge
                                variant="outline"
                                className="bg-white/80 text-xs"
                              >
                                {template.category}
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <Button
                                size="sm"
                                className="w-full bg-white text-gray-800 hover:bg-gray-100"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Preview & Select
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-8">
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">
                    Can't decide? No worries!
                  </h4>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    You can always change your template later in the editor.
                    Pick any design to get started and customize it to your
                    heart's content.
                  </p>
                  <Button
                    size="lg"
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleStartCreating}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Start with Any Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === "form" && (
          <BiodataForm
            onSubmit={handleFormSubmit}
            onBack={() => {
              setBiodataData(null);
              setCurrentSection("landing");
            }}
            initialData={biodataData || undefined}
          />
        )}
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
