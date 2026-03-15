import { ArrowLeft, MapPin, Plus, Star, Heart, ShoppingCart, AlertCircle, GitCompare } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";
import { useCart } from "../CartContext";
import { toast } from "sonner@2.0.3";

interface ProductDetailsScreenProps {
  onNavigate: (screen: string) => void;
  productData?: any;
}

export function ProductDetailsScreen({ onNavigate, productData }: ProductDetailsScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  // Comprehensive product details database
  const productDetailsDatabase: Record<string, any> = {
    '1': {
      description: "Premium organic bananas, hand-picked for perfect ripeness. Rich in potassium and perfect for snacking or baking.",
      unit: "per lb",
      nutrition: { calories: 105, carbs: "27g", fiber: "3.1g", sugar: "14g", protein: "1.3g" },
      allergens: ["None"],
      dietaryInfo: ["Organic", "Vegan", "Gluten-Free", "Non-GMO"]
    },
    '2': {
      description: "Fresh, sweet strawberries bursting with flavor. Perfect for desserts, smoothies, or enjoying on their own.",
      unit: "per lb",
      nutrition: { calories: 49, carbs: "12g", fiber: "3g", sugar: "7g", protein: "1g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Low-Calorie"]
    },
    '3': {
      description: "Crisp red bell peppers packed with vitamin C. Great for salads, stir-fries, or as a healthy snack.",
      unit: "each",
      nutrition: { calories: 37, carbs: "7g", fiber: "2.5g", sugar: "5g", protein: "1.2g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Low-Calorie", "Keto-Friendly"]
    },
    '4': {
      description: "Tender baby spinach leaves, rich in iron and vitamins. Perfect for salads or as a cooking green.",
      unit: "per 5oz bag",
      nutrition: { calories: 23, carbs: "3.6g", fiber: "2.2g", sugar: "0.4g", protein: "2.9g" },
      allergens: ["None"],
      dietaryInfo: ["Organic", "Vegan", "Gluten-Free", "Low-Calorie"]
    },
    '5': {
      description: "Creamy, nutrient-dense avocados perfect for guacamole, toast, or salads. High in healthy fats.",
      unit: "each",
      nutrition: { calories: 234, carbs: "12g", fiber: "10g", sugar: "1g", protein: "3g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Keto-Friendly", "Paleo"]
    },
    '6': {
      description: "Fresh whole milk from grass-fed cows. Rich, creamy texture perfect for drinking or cooking.",
      unit: "per gallon",
      nutrition: { calories: 149, carbs: "12g", fiber: "0g", sugar: "12g", protein: "8g" },
      allergens: ["Milk"],
      dietaryInfo: ["Vegetarian", "Gluten-Free"]
    },
    '7': {
      description: "Thick and creamy Greek yogurt with live active cultures. High in protein and probiotics.",
      unit: "per 32oz",
      nutrition: { calories: 100, carbs: "6g", fiber: "0g", sugar: "4g", protein: "17g" },
      allergens: ["Milk"],
      dietaryInfo: ["Vegetarian", "Gluten-Free", "High-Protein"]
    },
    '8': {
      description: "Sharp aged cheddar cheese with a rich, bold flavor. Perfect for sandwiches, burgers, or snacking.",
      unit: "per 8oz block",
      nutrition: { calories: 114, carbs: "1g", fiber: "0g", sugar: "0.5g", protein: "7g" },
      allergens: ["Milk"],
      dietaryInfo: ["Vegetarian", "Gluten-Free", "Keto-Friendly"]
    },
    '9': {
      description: "Premium unsalted butter made from fresh cream. Perfect for baking and cooking.",
      unit: "per 16oz",
      nutrition: { calories: 102, carbs: "0g", fiber: "0g", sugar: "0g", protein: "0.1g" },
      allergens: ["Milk"],
      dietaryInfo: ["Vegetarian", "Gluten-Free", "Keto-Friendly"]
    },
    '10': {
      description: "Smooth and creamy cream cheese, perfect for bagels, cheesecakes, or spreading.",
      unit: "per 8oz",
      nutrition: { calories: 99, carbs: "2g", fiber: "0g", sugar: "1g", protein: "2g" },
      allergens: ["Milk"],
      dietaryInfo: ["Vegetarian", "Gluten-Free"]
    },
    '11': {
      description: "Artisan sourdough bread with a crispy crust and tangy flavor. Made with traditional fermentation.",
      unit: "per loaf",
      nutrition: { calories: 120, carbs: "22g", fiber: "1g", sugar: "1g", protein: "4g" },
      allergens: ["Wheat", "Gluten"],
      dietaryInfo: ["Vegetarian", "Naturally Fermented"]
    },
    '12': {
      description: "Hearty whole wheat bagels with a chewy texture. Great for breakfast or sandwiches.",
      unit: "per 6-pack",
      nutrition: { calories: 245, carbs: "48g", fiber: "3g", sugar: "5g", protein: "9g" },
      allergens: ["Wheat", "Gluten"],
      dietaryInfo: ["Vegetarian", "Whole Grain"]
    },
    '13': {
      description: "Buttery, flaky croissants made with French techniques. Perfect for a luxurious breakfast.",
      unit: "per 4-pack",
      nutrition: { calories: 231, carbs: "26g", fiber: "1.5g", sugar: "7g", protein: "5g" },
      allergens: ["Wheat", "Gluten", "Milk", "Eggs"],
      dietaryInfo: ["Vegetarian"]
    },
    '14': {
      description: "Soft multigrain rolls packed with seeds and whole grains. Nutritious and delicious.",
      unit: "per 8-pack",
      nutrition: { calories: 140, carbs: "24g", fiber: "3g", sugar: "3g", protein: "5g" },
      allergens: ["Wheat", "Gluten", "Seeds"],
      dietaryInfo: ["Vegetarian", "Whole Grain"]
    },
    '15': {
      description: "Italian-style ciabatta bread with an airy crumb and crispy crust. Perfect for sandwiches.",
      unit: "per loaf",
      nutrition: { calories: 130, carbs: "25g", fiber: "1g", sugar: "1g", protein: "4g" },
      allergens: ["Wheat", "Gluten"],
      dietaryInfo: ["Vegetarian"]
    },
    '16': {
      description: "Fresh, tender chicken breast perfect for grilling, baking, or stir-frying. High in lean protein.",
      unit: "per lb",
      nutrition: { calories: 165, carbs: "0g", fiber: "0g", sugar: "0g", protein: "31g" },
      allergens: ["None"],
      dietaryInfo: ["Gluten-Free", "High-Protein", "Low-Carb", "Keto-Friendly"]
    },
    '17': {
      description: "Premium ground beef, perfect for burgers, tacos, or pasta sauces. 85% lean.",
      unit: "per lb",
      nutrition: { calories: 215, carbs: "0g", fiber: "0g", sugar: "0g", protein: "22g" },
      allergens: ["None"],
      dietaryInfo: ["Gluten-Free", "High-Protein", "Keto-Friendly"]
    },
    '18': {
      description: "Wild-caught salmon fillet rich in omega-3 fatty acids. Perfect for grilling or baking.",
      unit: "per lb",
      nutrition: { calories: 206, carbs: "0g", fiber: "0g", sugar: "0g", protein: "22g" },
      allergens: ["Fish"],
      dietaryInfo: ["Gluten-Free", "High-Protein", "Omega-3", "Keto-Friendly"]
    },
    '19': {
      description: "Lean turkey breast slices, perfect for sandwiches and wraps. Low in fat, high in protein.",
      unit: "per 12oz",
      nutrition: { calories: 120, carbs: "1g", fiber: "0g", sugar: "1g", protein: "25g" },
      allergens: ["None"],
      dietaryInfo: ["Gluten-Free", "High-Protein", "Low-Fat"]
    },
    '20': {
      description: "Juicy pork chops perfect for grilling or pan-frying. Tender and flavorful.",
      unit: "per lb",
      nutrition: { calories: 231, carbs: "0g", fiber: "0g", sugar: "0g", protein: "23g" },
      allergens: ["None"],
      dietaryInfo: ["Gluten-Free", "High-Protein", "Keto-Friendly"]
    },
    '21': {
      description: "Classic Italian spaghetti pasta made from durum wheat. Perfect for any pasta dish.",
      unit: "per 16oz box",
      nutrition: { calories: 200, carbs: "42g", fiber: "2g", sugar: "2g", protein: "7g" },
      allergens: ["Wheat", "Gluten"],
      dietaryInfo: ["Vegetarian"]
    },
    '22': {
      description: "Rich marinara sauce made with vine-ripened tomatoes and Italian herbs. Ready to heat and serve.",
      unit: "per 24oz jar",
      nutrition: { calories: 70, carbs: "11g", fiber: "3g", sugar: "8g", protein: "2g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free"]
    },
    '23': {
      description: "Extra virgin olive oil from Mediterranean olives. Perfect for cooking, dressings, and dipping.",
      unit: "per 750ml",
      nutrition: { calories: 119, carbs: "0g", fiber: "0g", sugar: "0g", protein: "0g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Keto-Friendly", "Paleo"]
    },
    '24': {
      description: "Aromatic basmati rice with a fluffy texture and nutty flavor. Perfect for curries and pilafs.",
      unit: "per 5lb bag",
      nutrition: { calories: 191, carbs: "45g", fiber: "0.6g", sugar: "0g", protein: "4g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free"]
    },
    '25': {
      description: "Organic black beans packed with protein and fiber. Great for burritos, soups, and salads.",
      unit: "per 15oz can",
      nutrition: { calories: 114, carbs: "20g", fiber: "8g", sugar: "0.3g", protein: "7.6g" },
      allergens: ["None"],
      dietaryInfo: ["Organic", "Vegan", "Gluten-Free", "High-Fiber"]
    },
    '26': {
      description: "Crispy, golden potato chips seasoned to perfection. Perfect for snacking or parties.",
      unit: "per 10oz bag",
      nutrition: { calories: 160, carbs: "15g", fiber: "1g", sugar: "0g", protein: "2g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free"]
    },
    '27': {
      description: "Premium blend of cashews, almonds, and walnuts. A healthy, protein-rich snack.",
      unit: "per 16oz bag",
      nutrition: { calories: 170, carbs: "6g", fiber: "3g", sugar: "1g", protein: "6g" },
      allergens: ["Tree Nuts"],
      dietaryInfo: ["Vegan", "Gluten-Free", "High-Protein", "Keto-Friendly"]
    },
    '28': {
      description: "Nutritious granola bars packed with oats, honey, and dried fruit. Perfect for on-the-go energy.",
      unit: "per 12-pack",
      nutrition: { calories: 140, carbs: "23g", fiber: "3g", sugar: "8g", protein: "3g" },
      allergens: ["Oats", "Gluten", "Tree Nuts"],
      dietaryInfo: ["Vegetarian", "Whole Grain"]
    },
    '29': {
      description: "Classic salted pretzels with a satisfying crunch. Low-fat and delicious.",
      unit: "per 16oz bag",
      nutrition: { calories: 110, carbs: "23g", fiber: "1g", sugar: "1g", protein: "3g" },
      allergens: ["Wheat", "Gluten"],
      dietaryInfo: ["Vegetarian", "Low-Fat"]
    },
    '30': {
      description: "Premium dark chocolate with 70% cacao. Rich, smooth, and packed with antioxidants.",
      unit: "per 3.5oz bar",
      nutrition: { calories: 170, carbs: "13g", fiber: "3g", sugar: "9g", protein: "2g" },
      allergens: ["Milk", "Soy"],
      dietaryInfo: ["Vegetarian", "Antioxidant-Rich"]
    },
    '31': {
      description: "Fresh-squeezed orange juice with no added sugar. 100% pure and refreshing.",
      unit: "per 64oz",
      nutrition: { calories: 110, carbs: "26g", fiber: "0.5g", sugar: "22g", protein: "2g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Vitamin C"]
    },
    '32': {
      description: "Premium green tea leaves rich in antioxidants. Smooth flavor with natural benefits.",
      unit: "per 20-bag box",
      nutrition: { calories: 0, carbs: "0g", fiber: "0g", sugar: "0g", protein: "0g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Antioxidant-Rich", "Caffeine"]
    },
    '33': {
      description: "Crisp sparkling water with natural bubbles. Zero calories, zero sugar, maximum refreshment.",
      unit: "per 12-pack",
      nutrition: { calories: 0, carbs: "0g", fiber: "0g", sugar: "0g", protein: "0g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Zero-Calorie"]
    },
    '34': {
      description: "Smooth cold brew coffee with a rich, bold flavor. Ready to drink, no brewing required.",
      unit: "per 32oz",
      nutrition: { calories: 5, carbs: "0g", fiber: "0g", sugar: "0g", protein: "0g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Low-Calorie", "Caffeine"]
    },
    '35': {
      description: "Creamy almond milk made from real almonds. Dairy-free and naturally lactose-free.",
      unit: "per 64oz",
      nutrition: { calories: 60, carbs: "8g", fiber: "1g", sugar: "7g", protein: "1g" },
      allergens: ["Tree Nuts"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Dairy-Free", "Lactose-Free"]
    },
    '36': {
      description: "Premium frozen sweet peas. Flash-frozen to lock in nutrients and flavor.",
      unit: "per 16oz bag",
      nutrition: { calories: 62, carbs: "11g", fiber: "4g", sugar: "4g", protein: "4g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "High-Fiber"]
    },
    '37': {
      description: "Creamy vanilla ice cream made with real vanilla beans. Rich and indulgent.",
      unit: "per pint",
      nutrition: { calories: 267, carbs: "28g", fiber: "0g", sugar: "21g", protein: "5g" },
      allergens: ["Milk", "Eggs"],
      dietaryInfo: ["Vegetarian", "Gluten-Free"]
    },
    '38': {
      description: "Delicious frozen pizza with mozzarella cheese and pepperoni. Quick and easy meal solution.",
      unit: "per 12-inch",
      nutrition: { calories: 320, carbs: "38g", fiber: "2g", sugar: "5g", protein: "13g" },
      allergens: ["Wheat", "Gluten", "Milk"],
      dietaryInfo: ["Contains Pork"]
    },
    '39': {
      description: "Mixed frozen berries including strawberries, blueberries, and raspberries. Perfect for smoothies.",
      unit: "per 16oz bag",
      nutrition: { calories: 70, carbs: "17g", fiber: "4g", sugar: "11g", protein: "1g" },
      allergens: ["None"],
      dietaryInfo: ["Vegan", "Gluten-Free", "Antioxidant-Rich"]
    },
    '40': {
      description: "Crispy breaded fish sticks made with wild-caught fish. Kid-friendly and easy to prepare.",
      unit: "per 24oz box",
      nutrition: { calories: 220, carbs: "20g", fiber: "1g", sugar: "2g", protein: "12g" },
      allergens: ["Fish", "Wheat", "Gluten"],
      dietaryInfo: ["Contains Fish"]
    }
  };

  // Default product for fallback
  const defaultProduct = {
    id: "1",
    name: "Organic Bananas",
    brand: "Fresh Farms",
    price: 2.99,
    originalPrice: 3.49,
    rating: 4.5,
    reviews: 247,
    aisle: "Aisle 1 - Produce Section",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400",
  };

  // Merge passed product data with detailed information
  const baseProduct = productData || defaultProduct;
  const detailedInfo = productDetailsDatabase[baseProduct.id] || productDetailsDatabase['1'];
  
  const product = {
    ...baseProduct,
    ...detailedInfo,
    stock: baseProduct.stock || "In Stock"
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      quantity: quantity,
      image: product.image,
      aisle: product.aisle,
    });
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

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
            <h1 className="text-xl font-semibold text-gray-900">Product Details</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 hover:bg-white/50"
          >
            <Heart 
              size={20} 
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
            />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Product Image */}
        <div className="p-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden mb-6">
            <div className="relative h-64">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className="bg-red-500 text-white">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Product Info */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">{product.name}</h2>
                  <p className="text-muted-foreground mb-2">{product.brand}</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-smart-green">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.unit}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-smart-blue" size={16} />
                  <span className="text-sm font-medium">{product.aisle}</span>
                </div>
                <Badge className="bg-smart-green-light text-smart-green">
                  {product.stock}
                </Badge>
              </div>

              <p className="text-muted-foreground text-sm mb-4">{product.description}</p>

              <div className="flex flex-wrap gap-2">
                {product.dietaryInfo.map((info) => (
                  <Badge key={info} variant="outline" className="border-smart-green text-smart-green">
                    {info}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Nutrition Info */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <p className="text-lg font-semibold text-smart-green">{product.nutrition.calories}</p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <p className="text-lg font-semibold text-smart-blue">{product.nutrition.carbs}</p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <p className="text-lg font-semibold text-smart-green">{product.nutrition.fiber}</p>
                  <p className="text-xs text-muted-foreground">Fiber</p>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <p className="text-lg font-semibold text-smart-blue">{product.nutrition.protein}</p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Allergen Info */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="text-orange-500" size={20} />
                <h3 className="font-semibold">Allergen Information</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Contains:</span>
                {product.allergens.map((allergen) => (
                  <Badge key={allergen} variant="outline" className="border-green-300 text-green-600">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-20 left-0 right-0 bg-white/70 backdrop-blur-lg border-t border-black/10 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-full p-0"
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-full p-0"
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => onNavigate('navigation')}
                variant="outline"
                className="h-12 bg-white/50 border-smart-blue/30 hover:bg-smart-blue-light rounded-xl flex items-center justify-center gap-1"
              >
                <MapPin className="text-smart-blue" size={14} />
                <span className="text-smart-blue text-sm">Find</span>
              </Button>
              
              <Button
                onClick={() => onNavigate('compare')}
                variant="outline"
                className="h-12 bg-white/50 border-purple-300 hover:bg-purple-50 rounded-xl flex items-center justify-center gap-1"
              >
                <GitCompare className="text-purple-500" size={14} />
                <span className="text-purple-600 text-sm">Compare</span>
              </Button>

              <Button
                onClick={() => onNavigate('checkout')}
                variant="outline"
                className="h-12 bg-white/50 border-orange-300 hover:bg-orange-50 rounded-xl flex items-center justify-center gap-1"
              >
                <ShoppingCart className="text-orange-500" size={14} />
                <span className="text-orange-600 text-sm">Cart</span>
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full h-12 bg-smart-green hover:bg-smart-green/90 text-white rounded-xl flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              <span>Add {quantity} to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}