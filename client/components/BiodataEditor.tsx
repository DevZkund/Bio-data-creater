import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Download,
  Palette,
  Type,
  Image as ImageIcon,
  FileText,
  Crown,
  User,
} from "lucide-react";

import BiodataPreview from "@/components/BiodataPreview";

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

interface BiodataEditorProps {
  biodataData: BiodataData;
  onBack: () => void;
}

interface EditorSettings {
  template: number;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  backgroundImage: string;
  // New controls
  ganeshaIcon: {
    show: boolean;
    style: string; // 'traditional', 'modern', 'artistic', 'none'
    position: string; // 'top', 'bottom', 'both'
  };
  profileImage: {
    borderStyle: string; // 'none', 'circle', 'rounded', 'square'
    borderColor: string;
    borderWidth: number;
    shadow: boolean;
  };
  headerImage: {
    show: boolean;
    image: string;
    height: number;
    opacity: number;
  };
}

const templates = [
  {
    id: 1,
    name: "Traditional Elegance",
    description: "Classic design with traditional borders",
  },
  {
    id: 2,
    name: "Modern Minimalist",
    description: "Clean and contemporary layout",
  },
  {
    id: 3,
    name: "Royal Heritage",
    description: "Ornate design with cultural motifs",
  },
  {
    id: 4,
    name: "Floral Bliss",
    description: "Beautiful floral patterns and soft colors",
  },
  {
    id: 5,
    name: "Golden Luxury",
    description: "Premium gold accents with elegant typography",
  },
  {
    id: 6,
    name: "Ocean Breeze",
    description: "Fresh blue tones with modern styling",
  },
  {
    id: 7,
    name: "Vintage Romance",
    description: "Romantic vintage design with ornate details",
  },
  {
    id: 8,
    name: "Contemporary Chic",
    description: "Sophisticated design for modern professionals",
  },
  {
    id: 9,
    name: "Sacred Traditions",
    description: "Religious motifs with spiritual symbolism",
  },
  {
    id: 10,
    name: "Artistic Canvas",
    description: "Creative design with artistic elements",
  },
  {
    id: 11,
    name: "Nature's Beauty",
    description: "Natural green tones with botanical elements",
  },
  {
    id: 12,
    name: "Executive Style",
    description: "Professional layout for corporate profiles",
  },
  {
    id: 13,
    name: "Bollywood Glamour",
    description: "Glamorous design with star-like appeal",
  },
  {
    id: 14,
    name: "Cosmic Dreams",
    description: "Celestial theme with starry backgrounds",
  },
  {
    id: 15,
    name: "Heritage Pride",
    description: "Cultural heritage with traditional patterns",
  },
  {
    id: 16,
    name: "Sunset Elegance",
    description: "Warm sunset colors with elegant fonts",
  },
  {
    id: 17,
    name: "Crystal Clear",
    description: "Ultra-clean design with crystal clarity",
  },
  {
    id: 18,
    name: "Majestic Royal",
    description: "Royal treatment with majestic elements",
  },
  {
    id: 19,
    name: "Divine Blessings",
    description: "Sacred design with divine motifs",
  },
  {
    id: 20,
    name: "Minimalist Pro",
    description: "Ultra-minimal professional design",
  },
  {
    id: 21,
    name: "Garden Dreams",
    description: "Lush garden theme with nature elements",
  },
  {
    id: 22,
    name: "Starlight Magic",
    description: "Magical starlit night design",
  },
  {
    id: 23,
    name: "Corporate Elite",
    description: "Executive-level professional presentation",
  },
  {
    id: 24,
    name: "Rainbow Spectrum",
    description: "Vibrant multicolor artistic design",
  },
  {
    id: 25,
    name: "Peacock Majesty",
    description: "Elegant peacock-inspired traditional design",
  },
  {
    id: 26,
    name: "Lotus Serenity",
    description: "Peaceful lotus-themed spiritual design",
  },
  {
    id: 27,
    name: "Tech Innovator",
    description: "Modern tech professional layout",
  },
  {
    id: 28,
    name: "Vintage Charm",
    description: "Classic vintage with old-world charm",
  },
  {
    id: 29,
    name: "Diamond Elegance",
    description: "Luxurious diamond-inspired premium design",
  },
  {
    id: 30,
    name: "Cherry Blossom",
    description: "Delicate cherry blossom romantic theme",
  },
  {
    id: 31,
    name: "Mandala Art",
    description: "Intricate mandala artistic patterns",
  },
  {
    id: 32,
    name: "Renaissance Classic",
    description: "Classical renaissance-inspired design",
  },
  {
    id: 33,
    name: "Tropical Paradise",
    description: "Vibrant tropical theme with exotic elements",
  },
];

const googleFonts = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Source Sans Pro",
  "Merriweather",
  "Playfair Display",
  "Lora",
  "Dancing Script",
  "Crimson Text",
];

const predefinedColors = [
  "#000000",
  "#374151",
  "#6B7280",
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
];

const predefinedBackgrounds = [
  "#FFFFFF",
  "#F9FAFB",
  "#FEF2F2",
  "#FFFBEB",
  "#F0FDF4",
  "#EFF6FF",
  "#F5F3FF",
  "#FDF2F8",
];

export default function BiodataEditor({
  biodataData,
  onBack,
}: BiodataEditorProps) {
  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    template: 1,
    fontFamily: "Inter",
    fontSize: 14,
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
    backgroundImage: "",
    ganeshaIcon: {
      show: true,
      style: "traditional",
      position: "top",
    },
    profileImage: {
      borderStyle: "circle",
      borderColor: "#E5E7EB",
      borderWidth: 2,
      shadow: true,
    },
    headerImage: {
      show: false,
      image: "",
      height: 150,
      opacity: 0.8,
    },
  });

  const updateSetting = (key: keyof EditorSettings, value: any) => {
    setEditorSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDownload = async () => {
    try {
      // Get the preview element
      const previewElement = document.querySelector(
        ".biodata-preview",
      ) as HTMLElement;
      if (!previewElement) {
        alert("Preview not found. Please try again.");
        return;
      }

      // Create canvas from the preview
      const canvas = await html2canvas(previewElement, {
        useCORS: true,
        allowTaint: true,
        width: previewElement.scrollWidth,
        height: previewElement.scrollHeight,
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit A4
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to PDF
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight,
      );

      // Download the PDF
      const fileName = `${biodataData.personal.name || "biodata"}_biodata.pdf`;
      pdf.save(fileName);

      alert("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  // Add reload alert functionality
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your biodata progress may be lost.";
      return "Are you sure you want to leave? Your biodata progress may be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Biodata Editor</h1>
            <Button
              onClick={handleDownload}
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Left Panel - Tools */}
          <div className="lg:col-span-1 space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2 text-rose-500" />
                  Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Choose Template</Label>
                  <Select
                    value={editorSettings.template.toString()}
                    onValueChange={(value) =>
                      updateSetting("template", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem
                          key={template.id}
                          value={template.id.toString()}
                        >
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-gray-600">
                  {
                    templates.find((t) => t.id === editorSettings.template)
                      ?.description
                  }
                </div>
              </CardContent>
            </Card>

            {/* Font Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Type className="h-5 w-5 mr-2 text-rose-500" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select
                    value={editorSettings.fontFamily}
                    onValueChange={(value) =>
                      updateSetting("fontFamily", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {googleFonts.map((font) => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font }}>{font}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size: {editorSettings.fontSize}px</Label>
                  <Slider
                    value={[editorSettings.fontSize]}
                    onValueChange={([value]) =>
                      updateSetting("fontSize", value)
                    }
                    min={10}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-md border-2 ${editorSettings.textColor === color
                          ? "border-rose-500"
                          : "border-gray-300"
                          }`}
                        style={{ backgroundColor: color }}
                        onClick={() => updateSetting("textColor", color)}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={editorSettings.textColor}
                    onChange={(e) => updateSetting("textColor", e.target.value)}
                    className="w-full h-10 rounded-md border border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Background Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Palette className="h-5 w-5 mr-2 text-rose-500" />
                  Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {predefinedBackgrounds.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-md border-2 ${editorSettings.backgroundColor === color
                          ? "border-rose-500"
                          : "border-gray-300"
                          }`}
                        style={{ backgroundColor: color }}
                        onClick={() => updateSetting("backgroundColor", color)}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={editorSettings.backgroundColor}
                    onChange={(e) =>
                      updateSetting("backgroundColor", e.target.value)
                    }
                    className="w-full h-10 rounded-md border border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Background Image</Label>
                  <Button variant="outline" className="w-full">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                  <p className="text-xs text-gray-500">
                    Upload a background image for your biodata
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Ganesha Icon Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Crown className="h-5 w-5 mr-2 text-rose-500" />
                  Ganesha Icons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Show Ganesha Icon</Label>
                    <Switch
                      checked={editorSettings.ganeshaIcon.show}
                      onCheckedChange={(checked) =>
                        updateSetting("ganeshaIcon", {
                          ...editorSettings.ganeshaIcon,
                          show: checked,
                        })
                      }
                    />
                  </div>
                </div>

                {editorSettings.ganeshaIcon.show && (
                  <>
                    <div className="space-y-2">
                      <Label>Icon Style</Label>
                      <Select
                        value={editorSettings.ganeshaIcon.style}
                        onValueChange={(value) =>
                          updateSetting("ganeshaIcon", {
                            ...editorSettings.ganeshaIcon,
                            style: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="traditional">
                            🕉️ Traditional
                          </SelectItem>
                          <SelectItem value="modern">✨ Modern</SelectItem>
                          <SelectItem value="artistic">🎨 Artistic</SelectItem>
                          <SelectItem value="minimal">📿 Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select
                        value={editorSettings.ganeshaIcon.position}
                        onValueChange={(value) =>
                          updateSetting("ganeshaIcon", {
                            ...editorSettings.ganeshaIcon,
                            position: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top Only</SelectItem>
                          <SelectItem value="bottom">Bottom Only</SelectItem>
                          <SelectItem value="both">Top & Bottom</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Profile Image Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="h-5 w-5 mr-2 text-rose-500" />
                  Profile Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Border Style</Label>
                  <Select
                    value={editorSettings.profileImage.borderStyle}
                    onValueChange={(value) =>
                      updateSetting("profileImage", {
                        ...editorSettings.profileImage,
                        borderStyle: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Border</SelectItem>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="rounded">Rounded Rectangle</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="diamond">Diamond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Border Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-md border-2 ${editorSettings.profileImage.borderColor === color
                          ? "border-rose-500"
                          : "border-gray-300"
                          }`}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          updateSetting("profileImage", {
                            ...editorSettings.profileImage,
                            borderColor: color,
                          })
                        }
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={editorSettings.profileImage.borderColor}
                    onChange={(e) =>
                      updateSetting("profileImage", {
                        ...editorSettings.profileImage,
                        borderColor: e.target.value,
                      })
                    }
                    className="w-full h-8 rounded-md border border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Border Width: {editorSettings.profileImage.borderWidth}px
                  </Label>
                  <Slider
                    value={[editorSettings.profileImage.borderWidth]}
                    onValueChange={([value]) =>
                      updateSetting("profileImage", {
                        ...editorSettings.profileImage,
                        borderWidth: value,
                      })
                    }
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Drop Shadow</Label>
                    <Switch
                      checked={editorSettings.profileImage.shadow}
                      onCheckedChange={(checked) =>
                        updateSetting("profileImage", {
                          ...editorSettings.profileImage,
                          shadow: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Header Image Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ImageIcon className="h-5 w-5 mr-2 text-rose-500" />
                  Header Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Show Header Image</Label>
                    <Switch
                      checked={editorSettings.headerImage.show}
                      onCheckedChange={(checked) =>
                        updateSetting("headerImage", {
                          ...editorSettings.headerImage,
                          show: checked,
                        })
                      }
                    />
                  </div>
                </div>

                {editorSettings.headerImage.show && (
                  <>
                    <div className="space-y-2">
                      <Label>Upload Header Image</Label>
                      <Button variant="outline" className="w-full">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Choose Header Image
                      </Button>
                      <p className="text-xs text-gray-500">
                        Upload a banner image for the top of your biodata
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Height: {editorSettings.headerImage.height}px
                      </Label>
                      <Slider
                        value={[editorSettings.headerImage.height]}
                        onValueChange={([value]) =>
                          updateSetting("headerImage", {
                            ...editorSettings.headerImage,
                            height: value,
                          })
                        }
                        min={50}
                        max={300}
                        step={10}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Opacity:{" "}
                        {Math.round(editorSettings.headerImage.opacity * 100)}%
                      </Label>
                      <Slider
                        value={[editorSettings.headerImage.opacity]}
                        onValueChange={([value]) =>
                          updateSetting("headerImage", {
                            ...editorSettings.headerImage,
                            opacity: value,
                          })
                        }
                        min={0.1}
                        max={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <p className="text-sm text-gray-600">
                  See how your biodata will look when printed
                </p>
              </CardHeader>
              <CardContent className="h-full">
                <div
                  className="bg-white shadow-lg mx-auto biodata-preview m"
                  style={{ width: "210mm", minHeight: "297mm" }}
                >
                  <BiodataPreview
                    biodataData={biodataData}
                    editorSettings={editorSettings}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
