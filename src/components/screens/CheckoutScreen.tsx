import { ArrowLeft, ShoppingCart, CreditCard, Smartphone, Scan, Check, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useCart } from "../CartContext";

interface CheckoutScreenProps {
  onNavigate: (screen: string) => void;
}

export function CheckoutScreen({ onNavigate }: CheckoutScreenProps) {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'auto'>('auto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const savings = cartItems.reduce((sum, item) => {
    // Mock savings calculation
    return sum + (item.price * 0.15 * item.quantity);
  }, 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
        onNavigate('home');
      }, 3000);
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-smart-green-light to-smart-blue-light">
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg max-w-md w-full">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-smart-green rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in">
                <Check className="text-white" size={40} />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-4">
                Your order has been processed successfully
              </p>
              <div className="bg-smart-green-light/50 rounded-xl p-4 mb-6">
                <p className="text-sm">Total Paid</p>
                <p className="text-3xl font-bold text-smart-green">${total.toFixed(2)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Redirecting to home...
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-smart-green-light to-smart-blue-light pb-20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-black/10 p-6 pt-12 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('list')}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
            <p className="text-muted-foreground">{getTotalItems()} items in cart</p>
          </div>
          <div className="w-10 h-10 bg-smart-green rounded-full flex items-center justify-center">
            <ShoppingCart className="text-white" size={20} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-gray-400" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add items to your cart to continue shopping
              </p>
              <Button
                onClick={() => onNavigate('search')}
                className="bg-smart-green hover:bg-smart-green/90 text-white"
              >
                Start Shopping
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <div className="p-4">
                <h3 className="font-medium mb-4">Items in Cart</h3>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.brand}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full p-0"
                              >
                                <Minus size={12} />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full p-0"
                              >
                                <Plus size={12} />
                              </Button>
                            </div>
                            <span className="font-bold text-smart-green">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <div className="p-4">
                <h3 className="font-medium mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod('auto')}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'auto'
                        ? 'border-smart-green bg-smart-green-light'
                        : 'border-gray-200 bg-white/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentMethod === 'auto' ? 'bg-smart-green' : 'bg-gray-100'
                    }`}>
                      <Scan className={paymentMethod === 'auto' ? 'text-white' : 'text-gray-400'} size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium">Automatic Checkout</h4>
                      <p className="text-sm text-muted-foreground">Walk out and pay automatically</p>
                    </div>
                    {paymentMethod === 'auto' && (
                      <Badge className="bg-smart-green text-white">Recommended</Badge>
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'card'
                        ? 'border-smart-blue bg-smart-blue-light'
                        : 'border-gray-200 bg-white/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentMethod === 'card' ? 'bg-smart-blue' : 'bg-gray-100'
                    }`}>
                      <CreditCard className={paymentMethod === 'card' ? 'text-white' : 'text-gray-400'} size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium">Credit/Debit Card</h4>
                      <p className="text-sm text-muted-foreground">Pay with saved card</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('mobile')}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'mobile'
                        ? 'border-smart-green bg-smart-green-light'
                        : 'border-gray-200 bg-white/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      paymentMethod === 'mobile' ? 'bg-smart-green' : 'bg-gray-100'
                    }`}>
                      <Smartphone className={paymentMethod === 'mobile' ? 'text-white' : 'text-gray-400'} size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium">Mobile Wallet</h4>
                      <p className="text-sm text-muted-foreground">Apple Pay or Google Pay</p>
                    </div>
                  </button>
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <div className="p-4">
                <h3 className="font-medium mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-smart-green">
                    <span>Total Savings</span>
                    <span className="font-medium">-${savings.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-smart-green">${total.toFixed(2)}</span>
                  </div>
                </div>

                {paymentMethod === 'auto' && (
                  <div className="mt-4 p-3 bg-smart-blue-light/50 rounded-xl">
                    <p className="text-sm text-muted-foreground">
                      💡 With automatic checkout, simply walk out of the store and payment will be processed automatically
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full h-14 bg-smart-green hover:bg-smart-green/90 text-white rounded-xl shadow-lg"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing Payment...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check size={20} />
                  {paymentMethod === 'auto' ? 'Complete Automatic Checkout' : 'Pay Now'}
                </span>
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
