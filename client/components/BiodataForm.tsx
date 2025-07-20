import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Upload,
  ArrowLeft,
  User,
  Users,
  Phone,
} from "lucide-react";

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

interface BiodataFormProps {
  onSubmit: (data: BiodataData) => void;
  onBack: () => void;
  initialData?: BiodataData;
}

const rashiOptions = [
  "Mesha (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrishchika (Scorpio)",
  "Dhanus (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)",
];

const nakshatraOptions = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

const complexionOptions = ["Fair", "Wheatish", "Medium", "Dark"];

const heightOptions = [
  "4'0\"",
  "4'1\"",
  "4'2\"",
  "4'3\"",
  "4'4\"",
  "4'5\"",
  "4'6\"",
  "4'7\"",
  "4'8\"",
  "4'9\"",
  "4'10\"",
  "4'11\"",
  "5'0\"",
  "5'1\"",
  "5'2\"",
  "5'3\"",
  "5'4\"",
  "5'5\"",
  "5'6\"",
  "5'7\"",
  "5'8\"",
  "5'9\"",
  "5'10\"",
  "5'11\"",
  "6'0\"",
  "6'1\"",
  "6'2\"",
  "6'3\"",
  "6'4\"",
  "6'5\"",
];

const educationOptions = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Degree",
  "Other",
];

const familyTypeOptions = ["Nuclear", "Joint", "Extended"];

export default function BiodataForm({
  onSubmit,
  onBack,
  initialData,
}: BiodataFormProps) {
  const [openSections, setOpenSections] = useState({
    personal: true,
    family: false,
    contact: false,
  });

  const [formData, setFormData] = useState<BiodataData>(
    initialData || {
      personal: {
        name: "",
        dob: "",
        timeOfBirth: "",
        placeOfBirth: "",
        rashi: "",
        nakshatra: "",
        complexion: "",
        height: "",
        education: "",
        occupation: "",
        annualIncome: "",
        hobbies: "",
        profileImage: "",
        showFields: {
          timeOfBirth: true,
          complexion: true,
          height: true,
          education: true,
          occupation: true,
          annualIncome: true,
          hobbies: true,
        },
      },
      family: {
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
        siblings: [],
        familyType: "",
        ancestralOrigin: "",
        showFields: {
          fatherName: true,
          fatherOccupation: true,
          motherName: true,
          motherOccupation: true,
          siblings: true,
          familyType: true,
          ancestralOrigin: true,
        },
      },
      contact: {
        mobile: "",
        email: "",
        address: "",
        additionalFields: [],
        showFields: {
          mobile: true,
          email: true,
          address: true,
        },
      },
    },
  );

  // Add reload alert functionality
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your form data may be lost.";
      return "Are you sure you want to leave? Your form data may be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updatePersonalField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const updatePersonalToggle = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        showFields: {
          ...prev.personal.showFields,
          [field]: value,
        },
      },
    }));
  };

  const updateFamilyField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      family: {
        ...prev.family,
        [field]: value,
      },
    }));
  };

  const updateFamilyToggle = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      family: {
        ...prev.family,
        showFields: {
          ...prev.family.showFields,
          [field]: value,
        },
      },
    }));
  };

  const updateContactField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const updateContactToggle = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        showFields: {
          ...prev.contact.showFields,
          [field]: value,
        },
      },
    }));
  };

  const addSibling = () => {
    setFormData((prev) => ({
      ...prev,
      family: {
        ...prev.family,
        siblings: [
          ...prev.family.siblings,
          { relation: "", maritalStatus: "", details: "" },
        ],
      },
    }));
  };

  const removeSibling = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      family: {
        ...prev.family,
        siblings: prev.family.siblings.filter((_, i) => i !== index),
      },
    }));
  };

  const updateSibling = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      family: {
        ...prev.family,
        siblings: prev.family.siblings.map((sibling, i) =>
          i === index ? { ...sibling, [field]: value } : sibling,
        ),
      },
    }));
  };

  const addContactField = () => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        additionalFields: [
          ...prev.contact.additionalFields,
          { label: "", value: "" },
        ],
      },
    }));
  };

  const removeContactField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        additionalFields: prev.contact.additionalFields.filter(
          (_, i) => i !== index,
        ),
      },
    }));
  };

  const updateContactField_additional = (
    index: number,
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        additionalFields: prev.contact.additionalFields.map((item, i) =>
          i === index ? { ...item, [field]: value } : item,
        ),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Templates
        </Button>
        <h2 className="text-3xl font-bold text-gray-800">
          Fill Your Biodata Details
        </h2>
        <div />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Collapsible
          open={openSections.personal}
          onOpenChange={() => toggleSection("personal")}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-rose-500" />
                    Personal Information
                  </div>
                  {openSections.personal ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                {/* Profile Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="profileImage">Profile Image</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button type="button" variant="outline">
                      Choose Image
                    </Button>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.personal.name}
                    onChange={(e) =>
                      updatePersonalField("name", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.personal.dob}
                    onChange={(e) => updatePersonalField("dob", e.target.value)}
                    required
                  />
                </div>

                {/* Time of Birth */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="timeOfBirth">Time of Birth</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="timeToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="timeToggle"
                        checked={formData.personal.showFields.timeOfBirth}
                        onCheckedChange={(checked) =>
                          updatePersonalToggle("timeOfBirth", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="timeOfBirth"
                    type="time"
                    value={formData.personal.timeOfBirth}
                    onChange={(e) =>
                      updatePersonalField("timeOfBirth", e.target.value)
                    }
                  />
                </div>

                {/* Place of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                  <Input
                    id="placeOfBirth"
                    value={formData.personal.placeOfBirth}
                    onChange={(e) =>
                      updatePersonalField("placeOfBirth", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Rashi */}
                <div className="space-y-2">
                  <Label htmlFor="rashi">Rashi</Label>
                  <Select
                    value={formData.personal.rashi}
                    onValueChange={(value) =>
                      updatePersonalField("rashi", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rashi" />
                    </SelectTrigger>
                    <SelectContent>
                      {rashiOptions.map((rashi) => (
                        <SelectItem key={rashi} value={rashi}>
                          {rashi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Nakshatra */}
                <div className="space-y-2">
                  <Label htmlFor="nakshatra">Nakshatra</Label>
                  <Select
                    value={formData.personal.nakshatra}
                    onValueChange={(value) =>
                      updatePersonalField("nakshatra", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Nakshatra" />
                    </SelectTrigger>
                    <SelectContent>
                      {nakshatraOptions.map((nakshatra) => (
                        <SelectItem key={nakshatra} value={nakshatra}>
                          {nakshatra}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Complexion */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="complexion">Complexion</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="complexionToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="complexionToggle"
                        checked={formData.personal.showFields.complexion}
                        onCheckedChange={(checked) =>
                          updatePersonalToggle("complexion", checked)
                        }
                      />
                    </div>
                  </div>
                  <Select
                    value={formData.personal.complexion}
                    onValueChange={(value) =>
                      updatePersonalField("complexion", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Complexion" />
                    </SelectTrigger>
                    <SelectContent>
                      {complexionOptions.map((complexion) => (
                        <SelectItem key={complexion} value={complexion}>
                          {complexion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="height">Height</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="heightToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="heightToggle"
                        checked={formData.personal.showFields.height}
                        onCheckedChange={(checked) =>
                          updatePersonalToggle("height", checked)
                        }
                      />
                    </div>
                  </div>
                  <Select
                    value={formData.personal.height}
                    onValueChange={(value) =>
                      updatePersonalField("height", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Height" />
                    </SelectTrigger>
                    <SelectContent>
                      {heightOptions.map((height) => (
                        <SelectItem key={height} value={height}>
                          {height}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="education">Education</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="educationToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="educationToggle"
                        checked={formData.personal.showFields.education}
                        onCheckedChange={(checked) =>
                          updatePersonalToggle("education", checked)
                        }
                      />
                    </div>
                  </div>
                  <Select
                    value={formData.personal.education}
                    onValueChange={(value) =>
                      updatePersonalField("education", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Education" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((education) => (
                        <SelectItem key={education} value={education}>
                          {education}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Occupation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="occupation">Occupation</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="occupationToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="occupationToggle"
                        checked={formData.personal.showFields.occupation}
                        onCheckedChange={(checked) =>
                          updatePersonalToggle("occupation", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="occupation"
                    value={formData.personal.occupation}
                    onChange={(e) =>
                      updatePersonalField("occupation", e.target.value)
                    }
                  />
                </div>

                {/* Annual Income */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="annualIncome">Annual Income</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="incomeToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="incomeToggle"
                        checked={formData.personal.showFields.annualIncome}
                        onCheckedChange={(checked) =>
                          updatePersonalToggle("annualIncome", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="annualIncome"
                    value={formData.personal.annualIncome}
                    onChange={(e) =>
                      updatePersonalField("annualIncome", e.target.value)
                    }
                    placeholder="e.g., ₹5,00,000"
                  />
                </div>

                {/* Hobbies */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hobbies">Hobbies/Interests</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="hobbiesToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="hobbiesToggle"
                        checked={formData.personal.showFields.hobbies}
                        onCheckedChange={(checked) =>
                          updatePersonalToggle("hobbies", checked)
                        }
                      />
                    </div>
                  </div>
                  <Textarea
                    id="hobbies"
                    value={formData.personal.hobbies}
                    onChange={(e) =>
                      updatePersonalField("hobbies", e.target.value)
                    }
                    placeholder="Reading, traveling, cooking..."
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Family Information */}
        <Collapsible
          open={openSections.family}
          onOpenChange={() => toggleSection("family")}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-rose-500" />
                    Family Information
                  </div>
                  {openSections.family ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                {/* Father's Name */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="fatherNameToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="fatherNameToggle"
                        checked={formData.family.showFields.fatherName}
                        onCheckedChange={(checked) =>
                          updateFamilyToggle("fatherName", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="fatherName"
                    value={formData.family.fatherName}
                    onChange={(e) =>
                      updateFamilyField("fatherName", e.target.value)
                    }
                  />
                </div>

                {/* Father's Occupation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fatherOccupation">
                      Father's Occupation
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor="fatherOccupationToggle"
                        className="text-sm"
                      >
                        Show in biodata
                      </Label>
                      <Switch
                        id="fatherOccupationToggle"
                        checked={formData.family.showFields.fatherOccupation}
                        onCheckedChange={(checked) =>
                          updateFamilyToggle("fatherOccupation", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="fatherOccupation"
                    value={formData.family.fatherOccupation}
                    onChange={(e) =>
                      updateFamilyField("fatherOccupation", e.target.value)
                    }
                  />
                </div>

                {/* Mother's Name */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="motherNameToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="motherNameToggle"
                        checked={formData.family.showFields.motherName}
                        onCheckedChange={(checked) =>
                          updateFamilyToggle("motherName", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="motherName"
                    value={formData.family.motherName}
                    onChange={(e) =>
                      updateFamilyField("motherName", e.target.value)
                    }
                  />
                </div>

                {/* Mother's Occupation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="motherOccupation">
                      Mother's Occupation
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor="motherOccupationToggle"
                        className="text-sm"
                      >
                        Show in biodata
                      </Label>
                      <Switch
                        id="motherOccupationToggle"
                        checked={formData.family.showFields.motherOccupation}
                        onCheckedChange={(checked) =>
                          updateFamilyToggle("motherOccupation", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="motherOccupation"
                    value={formData.family.motherOccupation}
                    onChange={(e) =>
                      updateFamilyField("motherOccupation", e.target.value)
                    }
                  />
                </div>

                {/* Siblings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Siblings</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="siblingsToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="siblingsToggle"
                        checked={formData.family.showFields.siblings}
                        onCheckedChange={(checked) =>
                          updateFamilyToggle("siblings", checked)
                        }
                      />
                    </div>
                  </div>

                  {formData.family.siblings.map((sibling, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Sibling {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSibling(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Relation</Label>
                          <Select
                            value={sibling.relation}
                            onValueChange={(value) =>
                              updateSibling(index, "relation", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Brother">Brother</SelectItem>
                              <SelectItem value="Sister">Sister</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Marital Status</Label>
                          <Select
                            value={sibling.maritalStatus}
                            onValueChange={(value) =>
                              updateSibling(index, "maritalStatus", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Married">Married</SelectItem>
                              <SelectItem value="Unmarried">
                                Unmarried
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Details</Label>
                          <Input
                            value={sibling.details}
                            onChange={(e) =>
                              updateSibling(index, "details", e.target.value)
                            }
                            placeholder="Additional details"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSibling}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sibling
                  </Button>
                </div>

                {/* Family Type */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="familyType">Family Type</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="familyTypeToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="familyTypeToggle"
                        checked={formData.family.showFields.familyType}
                        onCheckedChange={(checked) =>
                          updateFamilyToggle("familyType", checked)
                        }
                      />
                    </div>
                  </div>
                  <Select
                    value={formData.family.familyType}
                    onValueChange={(value) =>
                      updateFamilyField("familyType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Family Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {familyTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ancestral Origin */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ancestralOrigin">Ancestral Origin</Label>
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor="ancestralOriginToggle"
                        className="text-sm"
                      >
                        Show in biodata
                      </Label>
                      <Switch
                        id="ancestralOriginToggle"
                        checked={formData.family.showFields.ancestralOrigin}
                        onCheckedChange={(checked) =>
                          updateFamilyToggle("ancestralOrigin", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="ancestralOrigin"
                    value={formData.family.ancestralOrigin}
                    onChange={(e) =>
                      updateFamilyField("ancestralOrigin", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Contact Information */}
        <Collapsible
          open={openSections.contact}
          onOpenChange={() => toggleSection("contact")}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-rose-500" />
                    Contact Information
                  </div>
                  {openSections.contact ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                {/* Mobile Number */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="mobileToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="mobileToggle"
                        checked={formData.contact.showFields.mobile}
                        onCheckedChange={(checked) =>
                          updateContactToggle("mobile", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.contact.mobile}
                    onChange={(e) =>
                      updateContactField("mobile", e.target.value)
                    }
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="emailToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="emailToggle"
                        checked={formData.contact.showFields.email}
                        onCheckedChange={(checked) =>
                          updateContactToggle("email", checked)
                        }
                      />
                    </div>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) =>
                      updateContactField("email", e.target.value)
                    }
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="address">Residential Address</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="addressToggle" className="text-sm">
                        Show in biodata
                      </Label>
                      <Switch
                        id="addressToggle"
                        checked={formData.contact.showFields.address}
                        onCheckedChange={(checked) =>
                          updateContactToggle("address", checked)
                        }
                      />
                    </div>
                  </div>
                  <Textarea
                    id="address"
                    value={formData.contact.address}
                    onChange={(e) =>
                      updateContactField("address", e.target.value)
                    }
                  />
                </div>

                {/* Additional Contact Fields */}
                <div className="space-y-4">
                  <Label>Additional Contact Information</Label>

                  {formData.contact.additionalFields.map((field, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Additional Field {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeContactField(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) =>
                              updateContactField_additional(
                                index,
                                "label",
                                e.target.value,
                              )
                            }
                            placeholder="e.g., WhatsApp, LinkedIn"
                          />
                        </div>
                        <div>
                          <Label>Value</Label>
                          <Input
                            value={field.value}
                            onChange={(e) =>
                              updateContactField_additional(
                                index,
                                "value",
                                e.target.value,
                              )
                            }
                            placeholder="Enter value"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addContactField}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact Field
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
          <Button
            type="submit"
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-4 text-lg"
          >
            Generate Biodata
          </Button>
        </div>
      </form>
    </div>
  );
}
