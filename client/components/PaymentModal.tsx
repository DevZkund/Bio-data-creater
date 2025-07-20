import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Smartphone,
  Building2,
  Check,
  Loader2,
  Download,
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

type PaymentMethod = "card" | "upi" | "netbanking";

export default function PaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    bank: "",
  });

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);

    // Show success state for a moment, then trigger download
    setTimeout(() => {
      onPaymentSuccess();
      setIsSuccess(false);
      setFormData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        upiId: "",
        bank: "",
      });
    }, 1500);
  };

  const resetModal = () => {
    setIsProcessing(false);
    setIsSuccess(false);
    setFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      upiId: "",
      bank: "",
    });
    onClose();
  };

  const renderPaymentForm = () => {
    if (paymentMethod === "card") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cardNumber: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expiryDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, cvv: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
      );
    }

    if (paymentMethod === "upi") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              placeholder="yourname@paytm"
              value={formData.upiId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, upiId: e.target.value }))
              }
            />
          </div>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">or scan QR code to pay</p>
            <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-sm text-gray-500">QR Code</span>
            </div>
          </div>
        </div>
      );
    }

    if (paymentMethod === "netbanking") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bank">Select Bank</Label>
            <Select
              value={formData.bank}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, bank: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose your bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sbi">State Bank of India</SelectItem>
                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                <SelectItem value="icici">ICICI Bank</SelectItem>
                <SelectItem value="axis">Axis Bank</SelectItem>
                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                <SelectItem value="pnb">Punjab National Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={resetModal}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mt-2">
                Your biodata PDF is being prepared for download...
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Download className="h-4 w-4" />
              <span>Download starting soon</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Complete Your Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span>Biodata PDF Download</span>
                <span className="font-semibold">₹11.00</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount</span>
                  <span className="text-lg text-rose-600">₹11.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label>Choose Payment Method</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={paymentMethod === "upi" ? "default" : "outline"}
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => setPaymentMethod("upi")}
              >
                <Smartphone className="h-6 w-6 mb-1" />
                <span className="text-xs">UPI</span>
              </Button>
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className="h-6 w-6 mb-1" />
                <span className="text-xs">Card</span>
              </Button>
              <Button
                variant={paymentMethod === "netbanking" ? "default" : "outline"}
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => setPaymentMethod("netbanking")}
              >
                <Building2 className="h-6 w-6 mb-1" />
                <span className="text-xs">Net Banking</span>
              </Button>
            </div>
          </div>

          {/* Payment Form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                {paymentMethod === "upi" && (
                  <>
                    <Smartphone className="h-4 w-4 mr-2" />
                    UPI Payment
                  </>
                )}
                {paymentMethod === "card" && (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Card Payment
                  </>
                )}
                {paymentMethod === "netbanking" && (
                  <>
                    <Building2 className="h-4 w-4 mr-2" />
                    Net Banking
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>{renderPaymentForm()}</CardContent>
          </Card>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              🔒 Your payment is secured with 256-bit SSL encryption
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={resetModal} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 bg-rose-500 hover:bg-rose-600"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay ₹11"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
