import React from "react";

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

interface BiodataPreviewProps {
  biodataData: BiodataData;
  editorSettings: EditorSettings;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (timeString: string) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function BiodataPreview({
  biodataData,
  editorSettings,
}: BiodataPreviewProps) {
  const { personal, family, contact } = biodataData;

  const renderGaneshaIcon = (position: string) => {
    if (
      !editorSettings.ganeshaIcon.show ||
      (editorSettings.ganeshaIcon.position !== position &&
        editorSettings.ganeshaIcon.position !== "both")
    ) {
      return null;
    }

    const getIconByStyle = () => {
      switch (editorSettings.ganeshaIcon.style) {
        case "traditional":
          return "🕉️ श्री गणेशाय नमः 🕉️";
        case "modern":
          return "✨ गणेश ✨";
        case "artistic":
          return "🎨 ॐ गं गणपतये नमः 🎨";
        case "minimal":
          return "📿 ॐ 📿";
        default:
          return "🕉️ श्री गणेशाय नमः 🕉️";
      }
    };

    return (
      <div className="text-center text-orange-600 text-lg mb-4">
        {getIconByStyle()}
      </div>
    );
  };

  const renderProfileImage = (size: string = "w-24 h-24") => {
    const borderStyles = {
      none: "",
      circle: "rounded-full",
      rounded: "rounded-lg",
      square: "rounded-none",
      diamond: "transform rotate-45",
    };

    const borderClass =
      borderStyles[
        editorSettings.profileImage.borderStyle as keyof typeof borderStyles
      ] || "rounded-full";
    const shadowClass = editorSettings.profileImage.shadow ? "shadow-lg" : "";

    return (
      <div
        className={`${size} mx-auto ${borderClass} ${shadowClass} relative`}
        style={{
          border:
            editorSettings.profileImage.borderWidth > 0
              ? `${editorSettings.profileImage.borderWidth}px solid ${editorSettings.profileImage.borderColor}`
              : "none",
          backgroundColor: "#F3F4F6",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-sm text-gray-500">Photo</span>
        </div>
      </div>
    );
  };

  const renderHeaderImage = () => {
    if (!editorSettings.headerImage.show) {
      return null;
    }

    return (
      <div
        className="w-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-gray-600"
        style={{
          height: `${editorSettings.headerImage.height}px`,
          opacity: editorSettings.headerImage.opacity,
        }}
      >
        <span>Header Image Area</span>
      </div>
    );
  };

  const baseStyle = {
    fontFamily: editorSettings.fontFamily,
    fontSize: `${editorSettings.fontSize}px`,
    color: editorSettings.textColor,
    backgroundColor: editorSettings.backgroundColor,
    backgroundImage: editorSettings.backgroundImage
      ? `url(${editorSettings.backgroundImage})`
      : "none",
  };

  const renderTemplate1 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Header Image */}
      {renderHeaderImage()}

      {/* Ganesha Icon Top */}
      {renderGaneshaIcon("top")}

      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-double border-gray-800 pb-4">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
        >
          MARRIAGE BIODATA
        </h1>
        <div className="flex justify-center">
          {renderProfileImage("w-24 h-24")}
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <h2
          className="text-xl font-semibold mb-3 text-center bg-gray-100 py-2"
          style={{
            fontSize: `${editorSettings.fontSize + 4}px`,
            backgroundColor:
              editorSettings.backgroundColor === "#FFFFFF"
                ? "#F3F4F6"
                : "rgba(0,0,0,0.05)",
          }}
        >
          PERSONAL DETAILS
        </h2>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          <div>
            <span className="font-semibold">Name:</span> {personal.name}
          </div>
          <div>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {formatDate(personal.dob)}
          </div>
          {personal.showFields.timeOfBirth && personal.timeOfBirth && (
            <div>
              <span className="font-semibold">Time of Birth:</span>{" "}
              {formatTime(personal.timeOfBirth)}
            </div>
          )}
          <div>
            <span className="font-semibold">Place of Birth:</span>{" "}
            {personal.placeOfBirth}
          </div>
          {personal.rashi && (
            <div>
              <span className="font-semibold">Rashi:</span> {personal.rashi}
            </div>
          )}
          {personal.nakshatra && (
            <div>
              <span className="font-semibold">Nakshatra:</span>{" "}
              {personal.nakshatra}
            </div>
          )}
          {personal.showFields.complexion && personal.complexion && (
            <div>
              <span className="font-semibold">Complexion:</span>{" "}
              {personal.complexion}
            </div>
          )}
          {personal.showFields.height && personal.height && (
            <div>
              <span className="font-semibold">Height:</span> {personal.height}
            </div>
          )}
          {personal.showFields.education && personal.education && (
            <div>
              <span className="font-semibold">Education:</span>{" "}
              {personal.education}
            </div>
          )}
          {personal.showFields.occupation && personal.occupation && (
            <div>
              <span className="font-semibold">Occupation:</span>{" "}
              {personal.occupation}
            </div>
          )}
          {personal.showFields.annualIncome && personal.annualIncome && (
            <div>
              <span className="font-semibold">Annual Income:</span>{" "}
              {personal.annualIncome}
            </div>
          )}
        </div>
        {personal.showFields.hobbies && personal.hobbies && (
          <div className="mt-2">
            <span className="font-semibold">Hobbies/Interests:</span>{" "}
            {personal.hobbies}
          </div>
        )}
      </div>

      {/* Family Information */}
      <div className="mb-6">
        <h2
          className="text-xl font-semibold mb-3 text-center bg-gray-100 py-2"
          style={{
            fontSize: `${editorSettings.fontSize + 4}px`,
            backgroundColor:
              editorSettings.backgroundColor === "#FFFFFF"
                ? "#F3F4F6"
                : "rgba(0,0,0,0.05)",
          }}
        >
          FAMILY DETAILS
        </h2>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {family.showFields.fatherName && family.fatherName && (
            <div>
              <span className="font-semibold">Father's Name:</span>{" "}
              {family.fatherName}
            </div>
          )}
          {family.showFields.fatherOccupation && family.fatherOccupation && (
            <div>
              <span className="font-semibold">Father's Occupation:</span>{" "}
              {family.fatherOccupation}
            </div>
          )}
          {family.showFields.motherName && family.motherName && (
            <div>
              <span className="font-semibold">Mother's Name:</span>{" "}
              {family.motherName}
            </div>
          )}
          {family.showFields.motherOccupation && family.motherOccupation && (
            <div>
              <span className="font-semibold">Mother's Occupation:</span>{" "}
              {family.motherOccupation}
            </div>
          )}
          {family.showFields.familyType && family.familyType && (
            <div>
              <span className="font-semibold">Family Type:</span>{" "}
              {family.familyType}
            </div>
          )}
          {family.showFields.ancestralOrigin && family.ancestralOrigin && (
            <div>
              <span className="font-semibold">Ancestral Origin:</span>{" "}
              {family.ancestralOrigin}
            </div>
          )}
        </div>
        {family.showFields.siblings &&
          family.siblings &&
          family.siblings.length > 0 && (
            <div className="mt-2">
              <span className="font-semibold">Siblings:</span>
              <ul className="mt-1 space-y-1">
                {family.siblings.map((sibling, index) => (
                  <li key={index} className="ml-4">
                    • {sibling.relation} - {sibling.maritalStatus}
                    {sibling.details && ` (${sibling.details})`}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h2
          className="text-xl font-semibold mb-3 text-center bg-gray-100 py-2"
          style={{
            fontSize: `${editorSettings.fontSize + 4}px`,
            backgroundColor:
              editorSettings.backgroundColor === "#FFFFFF"
                ? "#F3F4F6"
                : "rgba(0,0,0,0.05)",
          }}
        >
          CONTACT DETAILS
        </h2>
        <div className="grid grid-cols-1 gap-y-2">
          {contact.showFields.mobile && contact.mobile && (
            <div>
              <span className="font-semibold">Mobile:</span> {contact.mobile}
            </div>
          )}
          {contact.showFields.email && contact.email && (
            <div>
              <span className="font-semibold">Email:</span> {contact.email}
            </div>
          )}
          {contact.showFields.address && contact.address && (
            <div>
              <span className="font-semibold">Address:</span> {contact.address}
            </div>
          )}
          {contact.additionalFields &&
            contact.additionalFields.map(
              (field, index) =>
                field.label &&
                field.value && (
                  <div key={index}>
                    <span className="font-semibold">{field.label}:</span>{" "}
                    {field.value}
                  </div>
                ),
            )}
        </div>
      </div>

      {/* Ganesha Icon Bottom */}
      {renderGaneshaIcon("bottom")}
    </div>
  );

  const renderTemplate2 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Header Image */}
      {renderHeaderImage()}

      {/* Ganesha Icon Top */}
      {renderGaneshaIcon("top")}

      {/* Modern Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <h1
            className="text-4xl font-light mb-2"
            style={{ fontSize: `${editorSettings.fontSize + 12}px` }}
          >
            {personal.name}
          </h1>
          <p className="text-lg text-gray-600">Marriage Biodata</p>
          <div className="w-16 h-1 bg-rose-500 mt-2"></div>
        </div>
        {renderProfileImage("w-32 h-32")}
      </div>

      {/* Content in Cards */}
      <div className="space-y-6">
        {/* Personal Details */}
        <div className="border-l-4 border-rose-500 pl-4">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 4}px` }}
          >
            Personal Information
          </h2>
          <div className="space-y-2">
            <div className="flex">
              <span className="w-32 text-gray-600">Born:</span>
              <span>{formatDate(personal.dob)}</span>
            </div>
            {personal.showFields.timeOfBirth && personal.timeOfBirth && (
              <div className="flex">
                <span className="w-32 text-gray-600">Time:</span>
                <span>{formatTime(personal.timeOfBirth)}</span>
              </div>
            )}
            <div className="flex">
              <span className="w-32 text-gray-600">Place:</span>
              <span>{personal.placeOfBirth}</span>
            </div>
            {personal.showFields.height && personal.height && (
              <div className="flex">
                <span className="w-32 text-gray-600">Height:</span>
                <span>{personal.height}</span>
              </div>
            )}
            {personal.showFields.education && personal.education && (
              <div className="flex">
                <span className="w-32 text-gray-600">Education:</span>
                <span>{personal.education}</span>
              </div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div className="flex">
                <span className="w-32 text-gray-600">Profession:</span>
                <span>{personal.occupation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Family Details */}
        <div className="border-l-4 border-rose-500 pl-4">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 4}px` }}
          >
            Family Background
          </h2>
          <div className="space-y-2">
            {family.showFields.fatherName && family.fatherName && (
              <div className="flex">
                <span className="w-32 text-gray-600">Father:</span>
                <span>
                  {family.fatherName}
                  {family.showFields.fatherOccupation &&
                    family.fatherOccupation &&
                    ` (${family.fatherOccupation})`}
                </span>
              </div>
            )}
            {family.showFields.motherName && family.motherName && (
              <div className="flex">
                <span className="w-32 text-gray-600">Mother:</span>
                <span>
                  {family.motherName}
                  {family.showFields.motherOccupation &&
                    family.motherOccupation &&
                    ` (${family.motherOccupation})`}
                </span>
              </div>
            )}
            {family.showFields.familyType && family.familyType && (
              <div className="flex">
                <span className="w-32 text-gray-600">Family:</span>
                <span>{family.familyType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="border-l-4 border-rose-500 pl-4">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 4}px` }}
          >
            Contact Information
          </h2>
          <div className="space-y-2">
            {contact.showFields.mobile && contact.mobile && (
              <div className="flex">
                <span className="w-32 text-gray-600">Mobile:</span>
                <span>{contact.mobile}</span>
              </div>
            )}
            {contact.showFields.email && contact.email && (
              <div className="flex">
                <span className="w-32 text-gray-600">Email:</span>
                <span>{contact.email}</span>
              </div>
            )}
            {contact.showFields.address && contact.address && (
              <div className="flex">
                <span className="w-32 text-gray-600">Address:</span>
                <span>{contact.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ganesha Icon Bottom */}
      {renderGaneshaIcon("bottom")}
    </div>
  );

  const renderTemplate3 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Header Image */}
      {renderHeaderImage()}

      {/* Decorative Border */}
      <div className="absolute inset-4 border-4 border-double border-amber-600 pointer-events-none"></div>
      <div className="absolute inset-6 border border-amber-400 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 pt-8">
        {/* Ganesha Icon Top */}
        {renderGaneshaIcon("top")}

        {/* Royal Header */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1
              className="text-3xl font-serif text-amber-800 mb-2"
              style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
            >
              ॐ श्री गणेशाय नमः
            </h1>
            {renderProfileImage("w-24 h-24")}
            <h2
              className="text-2xl font-serif text-amber-800"
              style={{ fontSize: `${editorSettings.fontSize + 6}px` }}
            >
              {personal.name}
            </h2>
            <p className="text-amber-600">वि��ाह पर���चय पत्र</p>
          </div>
        </div>

        {/* Ornate Content */}
        <div className="space-y-6">
          {/* Personal Section */}
          <div>
            <h3 className="text-xl font-serif text-amber-800 mb-3 text-center border-b-2 border-amber-300 pb-1">
              व्यक्तिगत विवरण
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="font-semibold">जन्म तिथि:</span>{" "}
                {formatDate(personal.dob)}
              </div>
              <div>
                <span className="font-semibold">जन्म स्थान:</span>{" "}
                {personal.placeOfBirth}
              </div>
              {personal.rashi && (
                <div>
                  <span className="font-semibold">राशि:</span> {personal.rashi}
                </div>
              )}
              {personal.nakshatra && (
                <div>
                  <span className="font-semibold">नक्षत्र:</span>{" "}
                  {personal.nakshatra}
                </div>
              )}
              {personal.showFields.education && personal.education && (
                <div>
                  <span className="font-semibold">शिक्षा:</span>{" "}
                  {personal.education}
                </div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>
                  <span className="font-semibold">व्यवसाय:</span>{" "}
                  {personal.occupation}
                </div>
              )}
            </div>
          </div>

          {/* Family Section */}
          <div>
            <h3 className="text-xl font-serif text-amber-800 mb-3 text-center border-b-2 border-amber-300 pb-1">
              पारिवारिक विवरण
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {family.showFields.fatherName && family.fatherName && (
                <div>
                  <span className="font-semibold">पिता जी:</span>{" "}
                  {family.fatherName}
                </div>
              )}
              {family.showFields.motherName && family.motherName && (
                <div>
                  <span className="font-semibold">माता जी:</span>{" "}
                  {family.motherName}
                </div>
              )}
              {family.showFields.familyType && family.familyType && (
                <div>
                  <span className="font-semibold">पारिवारिक प्रकार:</span>{" "}
                  {family.familyType}
                </div>
              )}
              {family.showFields.ancestralOrigin && family.ancestralOrigin && (
                <div>
                  <span className="font-semibold">मूल निवास:</span>{" "}
                  {family.ancestralOrigin}
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-serif text-amber-800 mb-3 text-center border-b-2 border-amber-300 pb-1">
              संपर्क विवरण
            </h3>
            <div className="text-center space-y-2">
              {contact.showFields.mobile && contact.mobile && (
                <div>
                  <span className="font-semibold">मोबाइ��:</span>{" "}
                  {contact.mobile}
                </div>
              )}
              {contact.showFields.address && contact.address && (
                <div>
                  <span className="font-semibold">पता:</span> {contact.address}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate4 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Floral Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-100"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Elegant Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center mb-4">
            <div className="w-12 h-0.5 bg-rose-300"></div>
            <span className="mx-4 text-rose-400">❀</span>
            <div className="w-12 h-0.5 bg-rose-300"></div>
          </div>
          <h1
            className="text-3xl font-serif text-rose-800 mb-2"
            style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
          >
            {personal.name}
          </h1>
          <p className="text-rose-600 italic">Marriage Biodata</p>
          {renderProfileImage("w-28 h-28 mx-auto mt-4")}
        </div>

        {/* Elegant Cards */}
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-rose-200 shadow-sm">
            <h2 className="text-xl font-serif text-rose-800 mb-4 flex items-center">
              <span className="text-rose-400 mr-2">❀</span>
              Personal Details
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>Born: {formatDate(personal.dob)}</div>
              <div>Place: {personal.placeOfBirth}</div>
              {personal.showFields.height && personal.height && (
                <div>Height: {personal.height}</div>
              )}
              {personal.showFields.education && personal.education && (
                <div>Education: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>Profession: {personal.occupation}</div>
              )}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-rose-200 shadow-sm">
            <h2 className="text-xl font-serif text-rose-800 mb-4 flex items-center">
              <span className="text-rose-400 mr-2">❀</span>
              Family Information
            </h2>
            <div className="space-y-2">
              {family.showFields.fatherName && family.fatherName && (
                <div>Father: {family.fatherName}</div>
              )}
              {family.showFields.motherName && family.motherName && (
                <div>Mother: {family.motherName}</div>
              )}
              {family.showFields.familyType && family.familyType && (
                <div>Family Type: {family.familyType}</div>
              )}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-rose-200 shadow-sm">
            <h2 className="text-xl font-serif text-rose-800 mb-4 flex items-center">
              <span className="text-rose-400 mr-2">❀</span>
              Contact Details
            </h2>
            <div className="space-y-2">
              {contact.showFields.mobile && contact.mobile && (
                <div>Mobile: {contact.mobile}</div>
              )}
              {contact.showFields.email && contact.email && (
                <div>Email: {contact.email}</div>
              )}
              {contact.showFields.address && contact.address && (
                <div>Address: {contact.address}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate5 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Golden Luxury Template */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-100"></div>
      <div className="relative z-10">
        <div className="text-center mb-8 border-b-4 border-double border-yellow-600 pb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
            >
              {personal.name}
            </h1>
          </div>
          <div className="w-28 h-28 mx-auto bg-gradient-to-br from-yellow-200 to-amber-200 border-4 border-yellow-400 rounded-lg shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm text-yellow-700">Photo</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-yellow-200 shadow-lg">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">
              Personal Details
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-yellow-700">Born:</span>{" "}
                {formatDate(personal.dob)}
              </div>
              <div>
                <span className="font-semibold text-yellow-700">Place:</span>{" "}
                {personal.placeOfBirth}
              </div>
              {personal.showFields.education && personal.education && (
                <div>
                  <span className="font-semibold text-yellow-700">
                    Education:
                  </span>{" "}
                  {personal.education}
                </div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>
                  <span className="font-semibold text-yellow-700">
                    Profession:
                  </span>{" "}
                  {personal.occupation}
                </div>
              )}
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-yellow-200 shadow-lg">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">
              Family & Contact
            </h3>
            <div className="space-y-2">
              {family.showFields.fatherName && family.fatherName && (
                <div>
                  <span className="font-semibold text-yellow-700">Father:</span>{" "}
                  {family.fatherName}
                </div>
              )}
              {family.showFields.motherName && family.motherName && (
                <div>
                  <span className="font-semibold text-yellow-700">Mother:</span>{" "}
                  {family.motherName}
                </div>
              )}
              {contact.showFields.mobile && contact.mobile && (
                <div>
                  <span className="font-semibold text-yellow-700">Mobile:</span>{" "}
                  {contact.mobile}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate6 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Ocean Breeze Template */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-t-3xl">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
          >
            {personal.name}
          </h1>
          <p className="text-blue-100">Marriage Biodata</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-b-3xl border-x border-b border-blue-200">
          <div className="w-24 h-24 mx-auto bg-white border-4 border-blue-300 rounded-full shadow-lg">
            <div className="w-full h-full flex items-center justify-center rounded-full">
              <span className="text-sm text-blue-600">Photo</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Personal</h3>
          <div className="space-y-1 text-sm">
            <div>Born: {formatDate(personal.dob)}</div>
            <div>Place: {personal.placeOfBirth}</div>
            {personal.showFields.height && personal.height && (
              <div>Height: {personal.height}</div>
            )}
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Family</h3>
          <div className="space-y-1 text-sm">
            {family.showFields.fatherName && family.fatherName && (
              <div>Father: {family.fatherName}</div>
            )}
            {family.showFields.motherName && family.motherName && (
              <div>Mother: {family.motherName}</div>
            )}
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Contact</h3>
          <div className="space-y-1 text-sm">
            {contact.showFields.mobile && contact.mobile && (
              <div>Mobile: {contact.mobile}</div>
            )}
            {contact.showFields.email && contact.email && (
              <div>Email: {contact.email}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate7 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Vintage Romance Template */}
      <div className="absolute inset-4 border-8 border-red-200 rounded-lg"></div>
      <div className="absolute inset-6 border-2 border-red-300 rounded-lg"></div>
      <div className="relative z-10 pt-8">
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1
              className="text-4xl font-serif text-red-800 mb-4"
              style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
            >
              ♥ {personal.name} ♥
            </h1>
            <div className="w-32 h-32 mx-auto bg-red-100 border-4 border-red-300 rounded-full shadow-lg relative">
              <div className="absolute -top-2 -right-2 text-red-500 text-2xl">
                ♥
              </div>
              <div className="w-full h-full flex items-center justify-center rounded-full">
                <span className="text-sm text-red-600">Photo</span>
              </div>
              <div className="absolute -bottom-2 -left-2 text-red-500 text-2xl">
                ♥
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
            <h3 className="text-xl font-serif text-red-800 mb-4">About Me</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>Born: {formatDate(personal.dob)}</div>
              <div>Place: {personal.placeOfBirth}</div>
              {personal.showFields.education && personal.education && (
                <div>Education: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>Profession: {personal.occupation}</div>
              )}
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
            <h3 className="text-xl font-serif text-red-800 mb-4">My Family</h3>
            <div className="space-y-2">
              {family.showFields.fatherName && family.fatherName && (
                <div>Father: {family.fatherName}</div>
              )}
              {family.showFields.motherName && family.motherName && (
                <div>Mother: {family.motherName}</div>
              )}
              {family.showFields.familyType && family.familyType && (
                <div>Family: {family.familyType}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate8 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Contemporary Chic Template */}
      <div className="border-l-8 border-emerald-500 pl-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1
              className="text-4xl font-light text-gray-800 mb-2"
              style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
            >
              {personal.name}
            </h1>
            <div className="w-20 h-1 bg-emerald-500"></div>
          </div>
          <div className="w-28 h-28 bg-emerald-100 border border-emerald-300 shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm text-emerald-600">Photo</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium text-emerald-700 mb-4 border-b border-emerald-200 pb-2">
              Professional Profile
            </h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="w-24 text-gray-600">Born:</span>
                <span>{formatDate(personal.dob)}</span>
              </div>
              <div className="flex">
                <span className="w-24 text-gray-600">Location:</span>
                <span>{personal.placeOfBirth}</span>
              </div>
              {personal.showFields.education && personal.education && (
                <div className="flex">
                  <span className="w-24 text-gray-600">Education:</span>
                  <span>{personal.education}</span>
                </div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div className="flex">
                  <span className="w-24 text-gray-600">Career:</span>
                  <span>{personal.occupation}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium text-emerald-700 mb-4 border-b border-emerald-200 pb-2">
              Family & Contact
            </h3>
            <div className="space-y-3">
              {family.showFields.fatherName && family.fatherName && (
                <div className="flex">
                  <span className="w-24 text-gray-600">Father:</span>
                  <span>{family.fatherName}</span>
                </div>
              )}
              {family.showFields.motherName && family.motherName && (
                <div className="flex">
                  <span className="w-24 text-gray-600">Mother:</span>
                  <span>{family.motherName}</span>
                </div>
              )}
              {contact.showFields.mobile && contact.mobile && (
                <div className="flex">
                  <span className="w-24 text-gray-600">Mobile:</span>
                  <span>{contact.mobile}</span>
                </div>
              )}
              {contact.showFields.email && contact.email && (
                <div className="flex">
                  <span className="w-24 text-gray-600">Email:</span>
                  <span>{contact.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate9 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Sacred Traditions Template */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50"></div>
      <div className="relative z-10 text-center">
        <div className="mb-6">
          <div className="text-orange-600 text-3xl mb-2">॥ ॐ गणेशाय नमः ॥</div>
          <h1
            className="text-3xl font-serif text-orange-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
          >
            {personal.name}
          </h1>
          <div className="w-28 h-28 mx-auto bg-orange-100 border-4 border-orange-400 rounded-full shadow-lg relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-orange-600 text-xl">
              🕉
            </div>
            <div className="w-full h-full flex items-center justify-center rounded-full">
              <span className="text-sm text-orange-700">Photo</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-orange-200 shadow-md">
            <h3 className="text-xl font-serif text-orange-800 mb-4 flex items-center justify-center">
              <span className="mr-2">🏺</span> व्यक्तिगत ���िवरण{" "}
              <span className="ml-2">🏺</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>जन्म तिथि: {formatDate(personal.dob)}</div>
              <div>जन्म स्थान: {personal.placeOfBirth}</div>
              {personal.rashi && <div>राशि: {personal.rashi}</div>}
              {personal.nakshatra && <div>नक्षत्र: {personal.nakshatra}</div>}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-orange-200 shadow-md">
            <h3 className="text-xl font-serif text-orange-800 mb-4 flex items-center justify-center">
              <span className="mr-2">👪</span> पारिवारिक जानकारी{" "}
              <span className="ml-2">👪</span>
            </h3>
            <div className="space-y-2">
              {family.showFields.fatherName && family.fatherName && (
                <div>पिता: {family.fatherName}</div>
              )}
              {family.showFields.motherName && family.motherName && (
                <div>माता: {family.motherName}</div>
              )}
              {contact.showFields.mobile && contact.mobile && (
                <div>���ंपर्क: {contact.mobile}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate10 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Artistic Canvas Template */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400"></div>
        <div className="pt-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 text-transparent bg-clip-text mb-4">
              {personal.name}
            </h1>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 border-4 border-purple-300 rounded-lg shadow-lg transform rotate-3">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm text-purple-600">Photo</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-purple-200 shadow-lg">
              <h3 className="text-xl font-bold text-purple-800 mb-4">
                Creative Profile
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>Born: {formatDate(personal.dob)}</div>
                <div>From: {personal.placeOfBirth}</div>
                {personal.showFields.education && personal.education && (
                  <div>Studies: {personal.education}</div>
                )}
                {personal.showFields.occupation && personal.occupation && (
                  <div>Works as: {personal.occupation}</div>
                )}
                {personal.showFields.hobbies && personal.hobbies && (
                  <div className="col-span-2">
                    Interests: {personal.hobbies}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3">Family</h4>
                <div className="space-y-2 text-sm">
                  {family.showFields.fatherName && family.fatherName && (
                    <div>Father: {family.fatherName}</div>
                  )}
                  {family.showFields.motherName && family.motherName && (
                    <div>Mother: {family.motherName}</div>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-3">Contact</h4>
                <div className="space-y-2 text-sm">
                  {contact.showFields.mobile && contact.mobile && (
                    <div>Phone: {contact.mobile}</div>
                  )}
                  {contact.showFields.email && contact.email && (
                    <div>Email: {contact.email}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate11 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Nature's Beauty Template */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-lime-50"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1
              className="text-4xl font-serif text-green-800 mb-4"
              style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
            >
              🌿 {personal.name} 🌿
            </h1>
            <div className="w-32 h-32 mx-auto bg-white border-4 border-green-400 rounded-full shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-lime-100"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <span className="text-sm text-green-700">Photo</span>
              </div>
              <div className="absolute -top-2 -right-2 text-green-500 text-2xl">
                🌱
              </div>
              <div className="absolute -bottom-2 -left-2 text-green-500 text-2xl">
                🍃
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              🌺 Personal Garden
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>🌸 Born: {formatDate(personal.dob)}</div>
              <div>🏡 From: {personal.placeOfBirth}</div>
              {personal.showFields.education && personal.education && (
                <div>📚 Education: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>💼 Work: {personal.occupation}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                🌳 Family Tree
              </h4>
              <div className="space-y-2 text-sm">
                {family.showFields.fatherName && family.fatherName && (
                  <div>Father: {family.fatherName}</div>
                )}
                {family.showFields.motherName && family.motherName && (
                  <div>Mother: {family.motherName}</div>
                )}
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                📞 Stay Connected
              </h4>
              <div className="space-y-2 text-sm">
                {contact.showFields.mobile && contact.mobile && (
                  <div>📱 {contact.mobile}</div>
                )}
                {contact.showFields.email && contact.email && (
                  <div>✉️ {contact.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate12 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Executive Style Template */}
      <div className="border-t-4 border-gray-600">
        <div className="pt-6">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h1
                className="text-4xl font-light text-gray-800 mb-2"
                style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
              >
                {personal.name}
              </h1>
              <p className="text-lg text-gray-600 font-light">
                Professional Profile
              </p>
              <div className="w-24 h-1 bg-gray-600 mt-2"></div>
            </div>
            <div className="w-28 h-28 bg-gray-100 border border-gray-300 shadow-md">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm text-gray-600">Photo</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                Personal
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="w-16 text-gray-600">DOB:</span>
                  <span>{formatDate(personal.dob)}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-gray-600">From:</span>
                  <span>{personal.placeOfBirth}</span>
                </div>
                {personal.showFields.height && personal.height && (
                  <div className="flex">
                    <span className="w-16 text-gray-600">Height:</span>
                    <span>{personal.height}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                Professional
              </h3>
              <div className="space-y-2 text-sm">
                {personal.showFields.education && personal.education && (
                  <div className="flex">
                    <span className="w-20 text-gray-600">Education:</span>
                    <span>{personal.education}</span>
                  </div>
                )}
                {personal.showFields.occupation && personal.occupation && (
                  <div className="flex">
                    <span className="w-20 text-gray-600">Position:</span>
                    <span>{personal.occupation}</span>
                  </div>
                )}
                {personal.showFields.annualIncome && personal.annualIncome && (
                  <div className="flex">
                    <span className="w-20 text-gray-600">Income:</span>
                    <span>{personal.annualIncome}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                Contact
              </h3>
              <div className="space-y-2 text-sm">
                {contact.showFields.mobile && contact.mobile && (
                  <div>📞 {contact.mobile}</div>
                )}
                {contact.showFields.email && contact.email && (
                  <div>✉️ {contact.email}</div>
                )}
                {family.showFields.familyType && family.familyType && (
                  <div>🏠 {family.familyType} Family</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate13 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Bollywood Glamour Template */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-50 to-pink-100"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white p-6 rounded-3xl shadow-2xl">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
            >
              ✨ {personal.name} ✨
            </h1>
            <p className="text-fuchsia-100">Bollywood Style Biodata</p>
          </div>
          <div className="mt-6">
            <div className="w-36 h-36 mx-auto bg-gradient-to-br from-fuchsia-200 to-pink-200 border-4 border-fuchsia-400 rounded-full shadow-2xl relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-fuchsia-500 text-3xl">
                ⭐
              </div>
              <div className="w-full h-full flex items-center justify-center rounded-full">
                <span className="text-sm text-fuchsia-700">Photo</span>
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-fuchsia-500 text-3xl">
                💫
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-fuchsia-200 shadow-xl">
            <h3 className="text-xl font-bold text-fuchsia-800 mb-4 text-center">
              🎬 Star Profile 🎬
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>🎂 Born: {formatDate(personal.dob)}</div>
              <div>🏙️ From: {personal.placeOfBirth}</div>
              {personal.showFields.education && personal.education && (
                <div>🎓 Education: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>💼 Profession: {personal.occupation}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl p-4 border border-fuchsia-200 shadow-lg">
              <h4 className="font-bold text-fuchsia-800 mb-3 text-center">
                🏠 Family Cast
              </h4>
              <div className="space-y-2 text-sm text-center">
                {family.showFields.fatherName && family.fatherName && (
                  <div>👨 {family.fatherName}</div>
                )}
                {family.showFields.motherName && family.motherName && (
                  <div>👩 {family.motherName}</div>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200 shadow-lg">
              <h4 className="font-bold text-pink-800 mb-3 text-center">
                📞 Contact Manager
              </h4>
              <div className="space-y-2 text-sm text-center">
                {contact.showFields.mobile && contact.mobile && (
                  <div>📱 {contact.mobile}</div>
                )}
                {contact.showFields.email && contact.email && (
                  <div>📧 {contact.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate14 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Cosmic Dreams Template */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-200"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="mb-6">
            <h1
              className="text-4xl font-bold text-indigo-800 mb-4"
              style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
            >
              🌟 {personal.name} 🌟
            </h1>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-200 to-blue-300 border-4 border-indigo-400 rounded-full shadow-xl relative">
              <div className="absolute -top-2 -right-2 text-indigo-500 text-2xl">
                ⭐
              </div>
              <div className="absolute -top-3 left-3 text-blue-500 text-lg">
                ✨
              </div>
              <div className="w-full h-full flex items-center justify-center rounded-full">
                <span className="text-sm text-indigo-700">Photo</span>
              </div>
              <div className="absolute -bottom-2 -left-2 text-indigo-500 text-2xl">
                🌙
              </div>
              <div className="absolute -bottom-3 right-3 text-blue-500 text-lg">
                ⭐
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200 shadow-xl">
            <h3 className="text-xl font-bold text-indigo-800 mb-4 text-center">
              🌌 Celestial Profile 🌌
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>🌟 Born: {formatDate(personal.dob)}</div>
              <div>🌍 Planet: {personal.placeOfBirth}</div>
              {personal.rashi && <div>♈ Rashi: {personal.rashi}</div>}
              {personal.nakshatra && (
                <div>⭐ Nakshatra: {personal.nakshatra}</div>
              )}
              {personal.showFields.education && personal.education && (
                <div>🎓 Learning: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>💫 Mission: {personal.occupation}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200 shadow-lg">
              <h4 className="font-bold text-indigo-800 mb-3 text-center">
                🏠 Home Galaxy
              </h4>
              <div className="space-y-2 text-sm text-center">
                {family.showFields.fatherName && family.fatherName && (
                  <div>👨‍🚀 {family.fatherName}</div>
                )}
                {family.showFields.motherName && family.motherName && (
                  <div>👩‍🚀 {family.motherName}</div>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200 shadow-lg">
              <h4 className="font-bold text-blue-800 mb-3 text-center">
                📡 Space Communication
              </h4>
              <div className="space-y-2 text-sm text-center">
                {contact.showFields.mobile && contact.mobile && (
                  <div>📱 {contact.mobile}</div>
                )}
                {contact.showFields.email && contact.email && (
                  <div>📧 {contact.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate15 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Heritage Pride Template */}
      <div className="absolute inset-4 border-4 border-amber-400 rounded-lg"></div>
      <div className="absolute inset-6 border-2 border-yellow-300 rounded-lg"></div>
      <div className="relative z-10 pt-6">
        <div className="text-center mb-8">
          <div className="text-amber-600 text-2xl mb-4">॥ श्री ॥</div>
          <h1
            className="text-3xl font-serif text-amber-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
          >
            {personal.name}
          </h1>
          <div className="w-28 h-28 mx-auto bg-amber-100 border-4 border-amber-400 rounded-lg shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm text-amber-700">Photo</span>
            </div>
          </div>
          <div className="text-amber-600 text-xl mt-4">
            विवाह हेतु परिचय पत्र
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 shadow-md">
            <h3 className="text-xl font-serif text-amber-800 mb-4 text-center border-b border-amber-300 pb-2">
              व्यक्तिगत विवरण
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>जन्म दिनांक: {formatDate(personal.dob)}</div>
              <div>जन्म स्था��: {personal.placeOfBirth}</div>
              {personal.rashi && <div>राशि: {personal.rashi}</div>}
              {personal.nakshatra && <div>नक्षत्र: {personal.nakshatra}</div>}
              {personal.showFields.education && personal.education && (
                <div>शिक्षा: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>व्यवसाय: {personal.occupation}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-serif font-semibold text-amber-800 mb-3 text-center">
                पारिवारिक ���ानकारी
              </h4>
              <div className="space-y-2 text-sm">
                {family.showFields.fatherName && family.fatherName && (
                  <div>पिता जी: {family.fatherName}</div>
                )}
                {family.showFields.motherName && family.motherName && (
                  <div>माता जी: {family.motherName}</div>
                )}
                {family.showFields.ancestralOrigin &&
                  family.ancestralOrigin && (
                    <div>मूल निवास: {family.ancestralOrigin}</div>
                  )}
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h4 className="font-serif font-semibold text-amber-800 mb-3 text-center">
                संपर्क सूत्र
              </h4>
              <div className="space-y-2 text-sm">
                {contact.showFields.mobile && contact.mobile && (
                  <div>मोबाइल: {contact.mobile}</div>
                )}
                {contact.showFields.address && contact.address && (
                  <div>पता: {contact.address}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate16 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Sunset Elegance Template */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-200"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-serif text-orange-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            💖 {personal.name} 💖
          </h1>
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-200 to-pink-200 border-4 border-orange-400 rounded-full shadow-2xl">
            <div className="w-full h-full flex items-center justify-center rounded-full">
              <span className="text-sm text-orange-700">Photo</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-xl">
            <h3 className="text-xl font-serif text-orange-800 mb-4 text-center">
              🌅 Beautiful Journey 🌅
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>💝 Born: {formatDate(personal.dob)}</div>
              <div>🏡 From: {personal.placeOfBirth}</div>
              {personal.showFields.education && personal.education && (
                <div>🎓 Education: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>💼 Career: {personal.occupation}</div>
              )}
              {personal.showFields.hobbies && personal.hobbies && (
                <div className="col-span-2">🎨 Hobbies: {personal.hobbies}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-200 shadow-lg">
              <h4 className="font-serif font-semibold text-orange-800 mb-3 text-center">
                👨‍👩‍👧‍👦 Loving Family
              </h4>
              <div className="space-y-2 text-sm text-center">
                {family.showFields.fatherName && family.fatherName && (
                  <div>👨 {family.fatherName}</div>
                )}
                {family.showFields.motherName && family.motherName && (
                  <div>👩 {family.motherName}</div>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200 shadow-lg">
              <h4 className="font-serif font-semibold text-pink-800 mb-3 text-center">
                💌 Let's Connect
              </h4>
              <div className="space-y-2 text-sm text-center">
                {contact.showFields.mobile && contact.mobile && (
                  <div>📞 {contact.mobile}</div>
                )}
                {contact.showFields.email && contact.email && (
                  <div>💌 {contact.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate17 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Crystal Clear Template */}
      <div className="bg-white border border-gray-100 shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-light text-gray-900 mb-1"
                style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
              >
                {personal.name}
              </h1>
              <p className="text-gray-500">Marriage Biodata</p>
            </div>
            <div className="w-24 h-24 bg-gray-50 border border-gray-200">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs text-gray-500">Photo</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Personal
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div>Born {formatDate(personal.dob)}</div>
                <div>From {personal.placeOfBirth}</div>
                {personal.showFields.height && personal.height && (
                  <div>{personal.height} tall</div>
                )}
                {personal.showFields.education && personal.education && (
                  <div>{personal.education}</div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Professional
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {personal.showFields.occupation && personal.occupation && (
                  <div>{personal.occupation}</div>
                )}
                {personal.showFields.annualIncome && personal.annualIncome && (
                  <div>{personal.annualIncome}</div>
                )}
                {personal.showFields.hobbies && personal.hobbies && (
                  <div>Interests: {personal.hobbies}</div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Contact
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {family.showFields.fatherName && family.fatherName && (
                  <div>Father: {family.fatherName}</div>
                )}
                {contact.showFields.mobile && contact.mobile && (
                  <div>{contact.mobile}</div>
                )}
                {contact.showFields.email && contact.email && (
                  <div>{contact.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate18 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Majestic Royal Template */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-200"></div>
      <div className="absolute inset-4 border-8 border-purple-300 rounded-2xl"></div>
      <div className="absolute inset-6 border-4 border-purple-400 rounded-xl"></div>
      <div className="relative z-10 pt-8">
        <div className="text-center mb-8">
          <div className="text-purple-600 text-3xl mb-4">👑</div>
          <h1
            className="text-4xl font-serif text-purple-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            {personal.name}
          </h1>
          <div className="text-purple-600 text-lg mb-6">
            Royal Marriage Biodata
          </div>
          <div className="w-36 h-36 mx-auto bg-gradient-to-br from-purple-200 to-pink-200 border-6 border-purple-400 rounded-full shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-purple-500 text-4xl">
              👑
            </div>
            <div className="w-full h-full flex items-center justify-center rounded-full">
              <span className="text-sm text-purple-700">Royal Photo</span>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-purple-500 text-2xl">
              💎
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-300 shadow-2xl">
            <h3 className="text-xl font-serif text-purple-800 mb-4 text-center">
              👑 Royal Profile 👑
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>🎂 Royal Birth: {formatDate(personal.dob)}</div>
              <div>🏰 Kingdom: {personal.placeOfBirth}</div>
              {personal.rashi && <div>⭐ Rashi: {personal.rashi}</div>}
              {personal.nakshatra && (
                <div>🌟 Nakshatra: {personal.nakshatra}</div>
              )}
              {personal.showFields.education && personal.education && (
                <div>📚 Royal Education: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>👨‍💼 Royal Duty: {personal.occupation}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200 shadow-xl">
              <h4 className="font-serif font-bold text-purple-800 mb-3 text-center">
                🏰 Royal Family
              </h4>
              <div className="space-y-2 text-sm text-center">
                {family.showFields.fatherName && family.fatherName && (
                  <div>👨‍👑 King {family.fatherName}</div>
                )}
                {family.showFields.motherName && family.motherName && (
                  <div>👩‍👑 Queen {family.motherName}</div>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border-2 border-pink-200 shadow-xl">
              <h4 className="font-serif font-bold text-pink-800 mb-3 text-center">
                📞 Royal Communication
              </h4>
              <div className="space-y-2 text-sm text-center">
                {contact.showFields.mobile && contact.mobile && (
                  <div>📱 {contact.mobile}</div>
                )}
                {contact.showFields.email && contact.email && (
                  <div>���� {contact.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate19 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Divine Blessings Template */}
      {renderHeaderImage()}
      {renderGaneshaIcon("top")}
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-serif text-orange-800 mb-4"
          style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
        >
          {personal.name}
        </h1>
        {renderProfileImage("w-28 h-28")}
        <div className="text-orange-600 text-lg mt-4">दिव्य आशीर्वाद</div>
      </div>
      <div className="space-y-6">
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <h3 className="text-xl font-serif text-orange-800 mb-4">
            🕉️ Personal Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>Born: {formatDate(personal.dob)}</div>
            <div>Place: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>Education: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>Profession: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
      {renderGaneshaIcon("bottom")}
    </div>
  );

  const renderTemplate20 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Minimalist Pro Template */}
      {renderHeaderImage()}
      <div className="border-l-4 border-slate-600 pl-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1
              className="text-4xl font-extralight text-gray-900 mb-2"
              style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
            >
              {personal.name}
            </h1>
            <div className="w-16 h-0.5 bg-slate-600"></div>
          </div>
          {renderProfileImage("w-24 h-24")}
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
              Personal
            </h3>
            <div className="space-y-2 text-sm">
              <div>{formatDate(personal.dob)}</div>
              <div>{personal.placeOfBirth}</div>
              {personal.showFields.education && personal.education && (
                <div>{personal.education}</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
              Family
            </h3>
            <div className="space-y-2 text-sm">
              {family.showFields.fatherName && family.fatherName && (
                <div>{family.fatherName}</div>
              )}
              {family.showFields.motherName && family.motherName && (
                <div>{family.motherName}</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-2 text-sm">
              {contact.showFields.mobile && contact.mobile && (
                <div>{contact.mobile}</div>
              )}
              {contact.showFields.email && contact.email && (
                <div>{contact.email}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate21 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Garden Dreams Template */}
      {renderHeaderImage()}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-serif text-emerald-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            🌿 {personal.name} 🌿
          </h1>
          {renderProfileImage("w-32 h-32")}
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200 shadow-lg">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">
            🌱 Garden Profile
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>🌸 Born: {formatDate(personal.dob)}</div>
            <div>🏡 From: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>📚 Learning: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>💼 Work: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate22 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Starlight Magic Template */}
      {renderHeaderImage()}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-200"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-indigo-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            ✨ {personal.name} ⭐
          </h1>
          {renderProfileImage("w-32 h-32")}
          <div className="text-indigo-600 text-lg mt-4">Magical Romance</div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200 shadow-xl">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 text-center">
            ✨ Starlight Profile ✨
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>🌟 Born: {formatDate(personal.dob)}</div>
            <div>🌍 Planet: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>🎓 Learning: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>✨ Mission: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate23 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Corporate Elite Template */}
      {renderHeaderImage()}
      <div className="bg-white border border-blue-200 shadow-sm">
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold mb-1"
                style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
              >
                {personal.name}
              </h1>
              <p className="text-blue-100">Executive Profile</p>
            </div>
            {renderProfileImage("w-24 h-24")}
          </div>
        </div>
        <div className="p-6 grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Personal
            </h3>
            <div className="space-y-2 text-sm">
              <div>Born: {formatDate(personal.dob)}</div>
              <div>Location: {personal.placeOfBirth}</div>
              {personal.showFields.education && personal.education && (
                <div>Education: {personal.education}</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Professional
            </h3>
            <div className="space-y-2 text-sm">
              {personal.showFields.occupation && personal.occupation && (
                <div>Position: {personal.occupation}</div>
              )}
              {personal.showFields.annualIncome && personal.annualIncome && (
                <div>Income: {personal.annualIncome}</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Contact
            </h3>
            <div className="space-y-2 text-sm">
              {contact.showFields.mobile && contact.mobile && (
                <div>{contact.mobile}</div>
              )}
              {contact.showFields.email && contact.email && (
                <div>{contact.email}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate24 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Rainbow Spectrum Template */}
      {renderHeaderImage()}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text mb-4">
            {personal.name}
          </h1>
          {renderProfileImage("w-32 h-32")}
          <div className="text-rainbow text-lg mt-4">🌈 Colorful Life 🌈</div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 shadow-xl">
          <h3 className="text-xl font-bold text-center mb-4">
            🎨 Vibrant Profile 🎨
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>🎂 Born: {formatDate(personal.dob)}</div>
            <div>🏠 From: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>📚 Education: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>💼 Career: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate25 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Peacock Majesty Template */}
      {renderHeaderImage()}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-200"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-serif text-teal-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            🦚 {personal.name} 🦚
          </h1>
          {renderProfileImage("w-32 h-32")}
          <div className="text-teal-600 text-lg mt-4">Peacock Elegance</div>
        </div>
        <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 border border-teal-200 shadow-xl">
          <h3 className="text-xl font-serif text-teal-800 mb-4 text-center">
            🦚 Majestic Profile 🦚
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>💎 Born: {formatDate(personal.dob)}</div>
            <div>🏛️ Kingdom: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>🎓 Royal Education: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>👑 Royal Duty: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate26 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Lotus Serenity Template */}
      {renderHeaderImage()}
      {renderGaneshaIcon("top")}
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-serif text-pink-800 mb-4"
          style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
        >
          🪷 {personal.name} 🪷
        </h1>
        {renderProfileImage("w-28 h-28")}
        <div className="text-pink-600 text-lg mt-4">Lotus Serenity</div>
      </div>
      <div className="space-y-6">
        <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
          <h3 className="text-xl font-serif text-pink-800 mb-4 text-center">
            🪷 Sacred Profile 🪷
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>🌸 Born: {formatDate(personal.dob)}</div>
            <div>🏮 From: {personal.placeOfBirth}</div>
            {personal.rashi && <div>⭐ Rashi: {personal.rashi}</div>}
            {personal.nakshatra && (
              <div>🌟 Nakshatra: {personal.nakshatra}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate27 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Tech Innovator Template */}
      {renderHeaderImage()}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
            >
              {personal.name}
            </h1>
            <p className="text-cyan-100">Tech Professional</p>
          </div>
          {renderProfileImage("w-24 h-24")}
        </div>
      </div>
      <div className="bg-white p-6 rounded-b-lg border-x border-b border-cyan-200">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-cyan-800 mb-3">
              🔧 Technical
            </h3>
            <div className="space-y-2 text-sm">
              {personal.showFields.education && personal.education && (
                <div>Education: {personal.education}</div>
              )}
              {personal.showFields.occupation && personal.occupation && (
                <div>Role: {personal.occupation}</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cyan-800 mb-3">
              👨‍👩‍👧‍���� Family
            </h3>
            <div className="space-y-2 text-sm">
              {family.showFields.fatherName && family.fatherName && (
                <div>Father: {family.fatherName}</div>
              )}
              {family.showFields.motherName && family.motherName && (
                <div>Mother: {family.motherName}</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cyan-800 mb-3">
              📞 Connect
            </h3>
            <div className="space-y-2 text-sm">
              {contact.showFields.mobile && contact.mobile && (
                <div>📱 {contact.mobile}</div>
              )}
              {contact.showFields.email && contact.email && (
                <div>📧 {contact.email}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate28 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Vintage Charm Template */}
      {renderHeaderImage()}
      <div className="absolute inset-4 border-4 border-amber-300 rounded-lg"></div>
      <div className="absolute inset-6 border-2 border-amber-400 rounded-lg"></div>
      <div className="relative z-10 pt-8">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-serif text-amber-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            ✨ {personal.name} ✨
          </h1>
          {renderProfileImage("w-32 h-32")}
          <div className="text-amber-600 text-lg mt-4">Vintage Romance</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 shadow-md">
          <h3 className="text-xl font-serif text-amber-800 mb-4 text-center">
            🌹 Classic Profile 🌹
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>💕 Born: {formatDate(personal.dob)}</div>
            <div>🏛️ From: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>📚 Education: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>💼 Profession: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate29 = () => (
    <div className="p-8 h-full" style={baseStyle}>
      {/* Diamond Elegance Template */}
      {renderHeaderImage()}
      <div className="bg-gradient-to-br from-gray-50 to-slate-100 border border-gray-200 shadow-lg">
        <div className="bg-gradient-to-r from-gray-800 to-slate-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ fontSize: `${editorSettings.fontSize + 8}px` }}
              >
                💎 {personal.name}
              </h1>
              <p className="text-gray-200">Diamond Elegance</p>
            </div>
            {renderProfileImage("w-24 h-24")}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                💎 Premium Profile
              </h3>
              <div className="space-y-3">
                <div>Born: {formatDate(personal.dob)}</div>
                <div>From: {personal.placeOfBirth}</div>
                {personal.showFields.education && personal.education && (
                  <div>Education: {personal.education}</div>
                )}
                {personal.showFields.occupation && personal.occupation && (
                  <div>Career: {personal.occupation}</div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                💍 Contact
              </h3>
              <div className="space-y-3">
                {family.showFields.fatherName && family.fatherName && (
                  <div>Father: {family.fatherName}</div>
                )}
                {contact.showFields.mobile && contact.mobile && (
                  <div>📱 {contact.mobile}</div>
                )}
                {contact.showFields.email && contact.email && (
                  <div>📧 {contact.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate30 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Cherry Blossom Template */}
      {renderHeaderImage()}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-200"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-serif text-rose-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            🌸 {personal.name} ����
          </h1>
          {renderProfileImage("w-32 h-32")}
          <div className="text-rose-600 text-lg mt-4">
            Cherry Blossom Romance
          </div>
        </div>
        <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 border border-rose-200 shadow-xl">
          <h3 className="text-xl font-serif text-rose-800 mb-4 text-center">
            🌸 Blossoming Love 🌸
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>💖 Born: {formatDate(personal.dob)}</div>
            <div>🏡 From: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>🎓 Education: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>💼 Career: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate31 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Mandala Art Template */}
      {renderHeaderImage()}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-200"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="text-purple-600 text-2xl mb-4">🕉️ मंडल कला 🕉️</div>
          <h1
            className="text-4xl font-serif text-purple-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            {personal.name}
          </h1>
          {renderProfileImage("w-32 h-32")}
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-xl">
          <h3 className="text-xl font-serif text-purple-800 mb-4 text-center">
            🎨 Artistic Soul 🎨
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>🎭 Born: {formatDate(personal.dob)}</div>
            <div>🏛️ From: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>📚 Learning: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>🎨 Art: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate32 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Renaissance Classic Template */}
      {renderHeaderImage()}
      <div className="absolute inset-4 border-8 border-yellow-400 rounded-lg"></div>
      <div className="absolute inset-6 border-4 border-amber-300 rounded-lg"></div>
      <div className="relative z-10 pt-8">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-serif text-yellow-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            👑 {personal.name} 👑
          </h1>
          {renderProfileImage("w-32 h-32")}
          <div className="text-yellow-600 text-lg mt-4">
            Renaissance Nobility
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 shadow-md">
          <h3 className="text-xl font-serif text-yellow-800 mb-4 text-center">
            🏛️ Classical Profile 🏛️
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>👑 Born: {formatDate(personal.dob)}</div>
            <div>🏰 Kingdom: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>📜 Learning: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>⚔️ Noble Duty: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate33 = () => (
    <div className="p-8 h-full relative" style={baseStyle}>
      {/* Tropical Paradise Template */}
      {renderHeaderImage()}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-100 to-green-200"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-green-800 mb-4"
            style={{ fontSize: `${editorSettings.fontSize + 10}px` }}
          >
            🌺 {personal.name} 🌴
          </h1>
          {renderProfileImage("w-32 h-32")}
          <div className="text-green-600 text-lg mt-4">Tropical Paradise</div>
        </div>
        <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-xl">
          <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
            🏝️ Paradise Profile 🏝️
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>🌺 Born: {formatDate(personal.dob)}</div>
            <div>🏖️ Paradise: {personal.placeOfBirth}</div>
            {personal.showFields.education && personal.education && (
              <div>🎓 Learning: {personal.education}</div>
            )}
            {personal.showFields.occupation && personal.occupation && (
              <div>🌴 Work: {personal.occupation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (editorSettings.template) {
      case 1:
        return renderTemplate1();
      case 2:
        return renderTemplate2();
      case 3:
        return renderTemplate3();
      case 4:
        return renderTemplate4();
      case 5:
        return renderTemplate5();
      case 6:
        return renderTemplate6();
      case 7:
        return renderTemplate7();
      case 8:
        return renderTemplate8();
      case 9:
        return renderTemplate9();
      case 10:
        return renderTemplate10();
      case 11:
        return renderTemplate11();
      case 12:
        return renderTemplate12();
      case 13:
        return renderTemplate13();
      case 14:
        return renderTemplate14();
      case 15:
        return renderTemplate15();
      case 16:
        return renderTemplate16();
      case 17:
        return renderTemplate17();
      case 18:
        return renderTemplate18();
      case 19:
        return renderTemplate19();
      case 20:
        return renderTemplate20();
      case 21:
        return renderTemplate21();
      case 22:
        return renderTemplate22();
      case 23:
        return renderTemplate23();
      case 24:
        return renderTemplate24();
      case 25:
        return renderTemplate25();
      case 26:
        return renderTemplate26();
      case 27:
        return renderTemplate27();
      case 28:
        return renderTemplate28();
      case 29:
        return renderTemplate29();
      case 30:
        return renderTemplate30();
      case 31:
        return renderTemplate31();
      case 32:
        return renderTemplate32();
      case 33:
        return renderTemplate33();
      default:
        return renderTemplate1();
    }
  };

  return (
     <div className="w-full h-full transform scale-90 origin-center">
      {renderTemplate()}
    </div>
  );
}
