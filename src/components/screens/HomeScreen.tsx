import { ShoppingCart, Upload, Zap, Wifi, Battery, Clock, ScanLine, Search, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { useCart } from "../CartContext";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { getTotalPrice, getTotalItems } = useCart();
  const cartTotal = getTotalPrice();
  const cartItemCount = getTotalItems();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-smart-blue-light to-smart-green-light pb-20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-black/10 p-6 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">🥕 Carrot Cart</h1>
            <p className="text-muted-foreground">Your intelligent shopping companion</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <ShoppingCart className="text-white" size={24} />
          </div>
        </div>
        
        {/* Cart Status */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-smart-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Cart Connected</span>
              </div>
              <Badge variant="secondary" className="bg-smart-green-light text-smart-green">
                Active
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Battery className="text-smart-green mb-1" size={16} />
                <span className="text-xs text-muted-foreground">85%</span>
              </div>
              <div className="flex flex-col items-center">
                <Wifi className="text-smart-blue mb-1" size={16} />
                <span className="text-xs text-muted-foreground">Strong</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="text-smart-green mb-1" size={16} />
                <span className="text-xs text-muted-foreground">2:30 PM</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Cart Summary (if items exist) */}
        {cartItemCount > 0 && (
          <Card className="bg-gradient-to-br from-smart-green to-smart-blue text-white border-0 shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Current Cart Total</p>
                  <p className="text-2xl font-bold">${cartTotal.toFixed(2)}</p>
                  <p className="text-xs opacity-75">{cartItemCount} item{cartItemCount !== 1 ? 's' : ''} in cart</p>
                </div>
                <Button
                  onClick={() => onNavigate('checkout')}
                  className="bg-white text-smart-green hover:bg-white/90"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Main Actions */}
      <div className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => onNavigate('list')}
            className="h-32 bg-smart-green hover:bg-smart-green/90 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 transform transition-all duration-200 hover:scale-105"
          >
            <ShoppingCart size={32} />
            <span>Start Shopping</span>
          </Button>
          
          <Button 
            onClick={() => onNavigate('list')}
            variant="outline"
            className="h-32 bg-white/70 backdrop-blur-sm border-smart-blue/30 hover:bg-smart-blue-light rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 transform transition-all duration-200 hover:scale-105"
          >
            <Upload size={32} className="text-smart-blue" />
            <span className="text-smart-blue">Upload List</span>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button 
            onClick={() => onNavigate('scan')}
            variant="outline"
            className="h-24 bg-white/70 backdrop-blur-sm border-purple-300 hover:bg-purple-50 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105"
          >
            <ScanLine size={24} className="text-purple-500" />
            <span className="text-purple-600 text-sm">Scan Item</span>
          </Button>

          <Button 
            onClick={() => onNavigate('search')}
            variant="outline"
            className="h-24 bg-white/70 backdrop-blur-sm border-smart-blue/30 hover:bg-smart-blue-light rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105"
          >
            <Search size={24} className="text-smart-blue" />
            <span className="text-smart-blue text-sm">Search</span>
          </Button>

          <Button 
            onClick={() => onNavigate('checkout')}
            variant="outline"
            className="h-24 bg-white/70 backdrop-blur-sm border-green-300 hover:bg-green-50 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105"
          >
            <CreditCard size={24} className="text-green-600" />
            <span className="text-green-600 text-sm">Checkout</span>
          </Button>
        </div>

        <Button 
          variant="outline"
          className="h-24 bg-white/70 backdrop-blur-sm border-orange-300 hover:bg-orange-50 rounded-2xl shadow-lg flex items-center justify-center gap-3 transform transition-all duration-200 hover:scale-105 w-full"
        >
          <Zap size={24} className="text-orange-500" />
          <span className="text-orange-600">Deals & Offers</span>
        </Button>

        {/* Quick Tips */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-smart-blue rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💡</span>
              </div>
              <h3 className="font-medium">Quick Tips</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-smart-green" />
                <span>Upload your list before arriving to save time</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Hero Image */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
          <div className="relative h-40">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1617218607489-4d28d612bd07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdHMlMjBvcmFuZ2V8ZW58MXx8fHwxNzY0NTEzMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Fresh organic carrots"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/70 to-transparent flex items-end p-4">
              <div className="text-white">
                <h3 className="font-semibold">🥕 Fresh & Healthy Shopping</h3>
                <p className="text-sm opacity-90">Smart AI-powered cart guidance</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}