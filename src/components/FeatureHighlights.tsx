import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScanLine, Search, GitCompare, CreditCard, Sparkles, MapPin, ShoppingCart, CheckCircle } from "lucide-react";

export function FeatureHighlights() {
  const features = [
    {
      icon: ScanLine,
      title: "Product Scanning",
      description: "Scan barcodes instantly or enter manually to view detailed product information including price, ingredients, nutrition, and reviews.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Quickly find products, view active promotions, and discover deals. Search by name, brand, or category.",
      color: "text-smart-blue",
      bgColor: "bg-smart-blue-light",
      borderColor: "border-smart-blue/30",
    },
    {
      icon: GitCompare,
      title: "AI Product Comparison",
      description: "Compare up to 3 similar products side-by-side with AI-powered recommendations based on price, nutrition, quality, and your preferences.",
      color: "text-smart-green",
      bgColor: "bg-smart-green-light",
      borderColor: "border-smart-green/30",
    },
    {
      icon: CreditCard,
      title: "Smart Checkout",
      description: "Choose from automatic checkout (walk-out payment), card payment, or mobile wallet for a seamless payment experience.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: MapPin,
      title: "Product Location",
      description: "Never get lost in the store. View exact aisle locations for each product and get guided navigation.",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      icon: ShoppingCart,
      title: "Real-time Cart Management",
      description: "Track items, quantities, and total price in real-time. See automatic calculations with tax and savings.",
      color: "text-smart-green",
      bgColor: "bg-smart-green-light",
      borderColor: "border-smart-green/30",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-smart-green" size={24} />
        <h2 className="text-xl font-semibold">Smart Cart Features</h2>
      </div>

      <div className="space-y-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={feature.title}
              className={`bg-white/70 backdrop-blur-sm border-2 ${feature.borderColor} shadow-lg`}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={feature.color} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-smart-green to-smart-blue text-white border-0 shadow-lg mt-6">
        <div className="p-6 text-center">
          <CheckCircle size={48} className="mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Experience the Future of Shopping</h3>
          <p className="text-sm opacity-90">
            All features work seamlessly together to create an intelligent, efficient, and convenient shopping experience.
          </p>
        </div>
      </Card>
    </div>
  );
}
