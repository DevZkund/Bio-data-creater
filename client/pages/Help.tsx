import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Download,
  Palette,
  Shield,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I create a biodata?",
    answer:
      "Simply click 'Start Creating Your Biodata' on the homepage, fill in your details in the form, and then customize your biodata in our editor. You can choose from 33+ templates and customize fonts, colors, and layouts.",
  },
  {
    question: "How many templates are available?",
    answer:
      "We offer 33+ professionally designed templates covering Traditional, Modern, Premium, Artistic, Professional, Vintage, and Romantic styles. Each template is crafted with cultural sensitivity and modern aesthetics.",
  },
  {
    question: "Can I customize the templates?",
    answer:
      "Absolutely! Our editor allows you to customize fonts, colors, backgrounds, add/remove Ganesha icons, adjust profile image borders, add header images, and much more. You have complete control over the appearance.",
  },
  {
    question: "Is my data safe and private?",
    answer:
      "Yes, your privacy is our top priority. We don't store any personal information on our servers. All data processing happens in your browser, and once you close the app, your data is gone.",
  },
  {
    question: "What format will I get my biodata in?",
    answer:
      "Your biodata will be generated as a high-quality PDF file that's ready for printing or sharing digitally. The PDF maintains professional formatting and is optimized for A4 paper size.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Creating and customizing your biodata is completely free! You only pay ₹11 when you want to download the final PDF. This small fee helps us maintain the service and create new templates.",
  },
  {
    question: "Can I edit my biodata after creating it?",
    answer:
      "Unfortunately, we don't store your data, so you'll need to fill in the details again if you want to make changes. However, you can always create a new biodata with updated information.",
  },
  {
    question: "What if I need help with creating my biodata?",
    answer:
      "We're here to help! You can contact us through the contact form below or email us directly. We also have detailed tooltips and guidance throughout the creation process.",
  },
  {
    question: "Can I use multiple templates for the same person?",
    answer:
      "Yes! You can create multiple versions of the same biodata using different templates. This is great for having options or for different purposes (formal vs casual family sharing).",
  },
  {
    question: "Do you support different languages?",
    answer:
      "Currently, our interface is in English, but many of our traditional templates include Hindi text and Sanskrit symbols. We're working on adding more language support in future updates.",
  },
];

export default function Help() {
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
              <Link
                to="/templates"
                className="text-gray-600 hover:text-rose-500 transition-colors"
              >
                Templates
              </Link>
              <Link to="/help" className="text-rose-500 font-medium">
                Help
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-700 mb-4">
            <HelpCircle className="h-4 w-4 mr-1" />
            Help Center
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            How Can We <span className="text-rose-500">Help You?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions, get tips for creating the perfect
            biodata, or reach out to our support team.
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="pt-6">
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
              <p className="text-gray-600 mb-4">
                Learn how to create your first biodata in minutes
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/#getting-started">Quick Start Guide</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="pt-6">
              <Palette className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customization Tips</h3>
              <p className="text-gray-600 mb-4">
                Make your biodata unique with our customization features
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/#customization">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="pt-6">
              <Download className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Download & Print</h3>
              <p className="text-gray-600 mb-4">
                Get your biodata as a high-quality PDF for printing
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/#download">Download Guide</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-gray-800">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Still Need Help?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our support team is here to help you create the perfect biodata.
              Reach out to us through any of the channels below, and we'll get
              back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Support</h3>
                  <p className="text-gray-600">support@biodatacreator.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Live Chat</h3>
                  <p className="text-gray-600">Available 9 AM - 6 PM IST</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Response Time</h3>
                  <p className="text-gray-600">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-0 bg-gradient-to-br from-gray-50 to-slate-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-rose-500" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Tell us about your question or issue..."
                ></textarea>
              </div>
              <Button className="w-full bg-rose-500 hover:bg-rose-600">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-semibold text-blue-800 mb-2">Privacy Notice</h3>
          <p className="text-blue-700 text-sm">
            We respect your privacy. Any information shared through our contact
            forms is used solely for providing support and is never shared with
            third parties.
          </p>
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
