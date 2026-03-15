import { ArrowLeft, Star, TrendingUp, Sparkles, Check, X as XIcon, Filter, GitCompare } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { useState } from "react";

interface ProductComparisonScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function ProductComparisonScreen({ onNavigate }: ProductComparisonScreenProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Full product database
  const allProducts = [
    // Bananas - Multiple Brands
    { id: '1', name: 'Organic Bananas', brand: 'Fresh Farms', price: 2.99, rating: 4.5, reviews: 247, category: 'Bananas', 
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
      nutrition: { calories: 105, protein: '1.3g', carbs: '27g', fiber: '3.1g' },
      features: ['Organic', 'Non-GMO', 'Fair Trade'], aiScore: 92 },
    { id: '1b', name: 'Regular Bananas', brand: 'Daily Fresh', price: 1.99, rating: 4.2, reviews: 532, category: 'Bananas',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
      nutrition: { calories: 105, protein: '1.3g', carbs: '27g', fiber: '3.1g' },
      features: ['Fresh', 'Budget-Friendly'], aiScore: 78 },
    { id: '1c', name: 'Premium Bananas', brand: 'Tropical Best', price: 3.49, rating: 4.8, reviews: 189, category: 'Bananas',
      image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400',
      nutrition: { calories: 105, protein: '1.3g', carbs: '27g', fiber: '3.1g' },
      features: ['Premium Quality', 'Hand-Selected', 'Organic'], aiScore: 95 },
    { id: '1d', name: 'Bananas', brand: 'Value Mart', price: 1.79, rating: 4.0, reviews: 678, category: 'Bananas',
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
      nutrition: { calories: 105, protein: '1.3g', carbs: '27g', fiber: '3.1g' },
      features: ['Value Pack', 'Fresh'], aiScore: 72 },
    
    // Milk - Multiple Brands
    { id: '6a', name: 'Whole Milk', brand: 'Dairy Best', price: 4.49, rating: 4.7, reviews: 532, category: 'Milk',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
      nutrition: { calories: 149, protein: '7.7g', carbs: '11.7g', fiber: '0g' },
      features: ['Vitamin D', 'Calcium Rich', 'rBST Free'], aiScore: 85 },
    { id: '6b', name: 'Organic Whole Milk', brand: 'Green Valley', price: 5.99, rating: 4.8, reviews: 398, category: 'Milk',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      nutrition: { calories: 149, protein: '7.7g', carbs: '11.7g', fiber: '0g' },
      features: ['Organic', 'Grass-Fed', 'Vitamin D', 'No Antibiotics'], aiScore: 93 },
    { id: '6c', name: 'Whole Milk', brand: 'Farm Fresh', price: 3.99, rating: 4.5, reviews: 689, category: 'Milk',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
      nutrition: { calories: 149, protein: '7.7g', carbs: '11.7g', fiber: '0g' },
      features: ['Vitamin D', 'Local', 'Fresh Daily'], aiScore: 82 },
    { id: '6d', name: '2% Reduced Fat Milk', brand: 'Dairy Best', price: 4.29, rating: 4.6, reviews: 445, category: 'Milk',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      nutrition: { calories: 122, protein: '8.1g', carbs: '11.7g', fiber: '0g' },
      features: ['Lower Fat', 'Vitamin D', 'Calcium'], aiScore: 87 },
    
    // Bread - Multiple Brands
    { id: '11a', name: 'Sourdough Bread', brand: 'Artisan Bakery', price: 5.99, rating: 4.8, reviews: 189, category: 'Bread',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
      nutrition: { calories: 120, protein: '4g', carbs: '20g', fiber: '1g' },
      features: ['Artisan', 'Freshly Baked', 'No Preservatives'], aiScore: 87 },
    { id: '11b', name: 'Whole Wheat Bread', brand: 'Healthy Choice', price: 3.99, rating: 4.6, reviews: 567, category: 'Bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      nutrition: { calories: 110, protein: '5g', carbs: '18g', fiber: '3g' },
      features: ['Whole Grain', 'High Fiber', 'No Sugar Added'], aiScore: 91 },
    { id: '11c', name: 'White Bread', brand: 'Daily Bread Co.', price: 2.99, rating: 4.3, reviews: 823, category: 'Bread',
      image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400',
      nutrition: { calories: 130, protein: '3g', carbs: '24g', fiber: '1g' },
      features: ['Soft', 'Classic', 'Fresh'], aiScore: 73 },
    { id: '11d', name: 'Multigrain Bread', brand: 'Nature\'s Best', price: 4.49, rating: 4.7, reviews: 412, category: 'Bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      nutrition: { calories: 115, protein: '5g', carbs: '19g', fiber: '4g' },
      features: ['12 Grains', 'High Fiber', 'Organic'], aiScore: 89 },
    
    // Chicken - Multiple Brands
    { id: '16a', name: 'Chicken Breast', brand: 'Premium Meats', price: 8.99, rating: 4.6, reviews: 445, category: 'Chicken',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
      nutrition: { calories: 165, protein: '31g', carbs: '0g', fiber: '0g' },
      features: ['High Protein', 'Lean', 'Fresh'], aiScore: 89 },
    { id: '16b', name: 'Organic Chicken Breast', brand: 'Nature\'s Farm', price: 11.99, rating: 4.8, reviews: 298, category: 'Chicken',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400',
      nutrition: { calories: 165, protein: '31g', carbs: '0g', fiber: '0g' },
      features: ['Organic', 'Free-Range', 'No Antibiotics', 'High Protein'], aiScore: 95 },
    { id: '16c', name: 'Chicken Breast', brand: 'Value Pack', price: 6.99, rating: 4.3, reviews: 589, category: 'Chicken',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
      nutrition: { calories: 165, protein: '31g', carbs: '0g', fiber: '0g' },
      features: ['Budget-Friendly', 'Fresh', 'Lean'], aiScore: 80 },
    { id: '16d', name: 'Air-Chilled Chicken Breast', brand: 'Premium Select', price: 10.49, rating: 4.7, reviews: 334, category: 'Chicken',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400',
      nutrition: { calories: 165, protein: '31g', carbs: '0g', fiber: '0g' },
      features: ['Air-Chilled', 'Premium', 'No Water Added'], aiScore: 92 },
    
    // Yogurt - Multiple Brands
    { id: '7a', name: 'Greek Yogurt', brand: 'Dairy Best', price: 3.99, rating: 4.6, reviews: 421, category: 'Yogurt',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      nutrition: { calories: 100, protein: '17g', carbs: '6g', fiber: '0g' },
      features: ['High Protein', 'Probiotic', 'Low Fat'], aiScore: 91 },
    { id: '7b', name: 'Icelandic Yogurt', brand: 'Nordic Farms', price: 4.49, rating: 4.8, reviews: 267, category: 'Yogurt',
      image: 'https://images.unsplash.com/photo-1571212515416-26b6cb3f09d2?w=400',
      nutrition: { calories: 90, protein: '19g', carbs: '5g', fiber: '0g' },
      features: ['Ultra High Protein', 'Probiotic', 'Creamy'], aiScore: 94 },
    { id: '7c', name: 'Greek Yogurt', brand: 'Mountain High', price: 3.49, rating: 4.5, reviews: 534, category: 'Yogurt',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      nutrition: { calories: 100, protein: '15g', carbs: '7g', fiber: '0g' },
      features: ['Probiotic', 'Creamy', 'Natural'], aiScore: 86 },
    { id: '7d', name: 'Plant-Based Yogurt', brand: 'Green Valley', price: 4.99, rating: 4.4, reviews: 312, category: 'Yogurt',
      image: 'https://images.unsplash.com/photo-1571212515416-26b6cb3f09d2?w=400',
      nutrition: { calories: 130, protein: '8g', carbs: '15g', fiber: '2g' },
      features: ['Vegan', 'Dairy-Free', 'Probiotic'], aiScore: 83 },
    
    // Strawberries - Multiple Brands
    { id: '2a', name: 'Fresh Strawberries', brand: 'Berry Best', price: 4.99, rating: 4.6, reviews: 189, category: 'Strawberries',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
      nutrition: { calories: 46, protein: '1g', carbs: '11g', fiber: '3g' },
      features: ['Fresh', 'Vitamin C Rich'], aiScore: 88 },
    { id: '2b', name: 'Organic Strawberries', brand: 'Farm Fresh', price: 5.99, rating: 4.8, reviews: 256, category: 'Strawberries',
      image: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=400',
      nutrition: { calories: 46, protein: '1g', carbs: '11g', fiber: '3g' },
      features: ['Organic', 'Sweet', 'No Pesticides'], aiScore: 93 },
    { id: '2c', name: 'Strawberries', brand: 'Value Basket', price: 3.99, rating: 4.3, reviews: 445, category: 'Strawberries',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
      nutrition: { calories: 46, protein: '1g', carbs: '11g', fiber: '3g' },
      features: ['Fresh', 'Budget-Friendly'], aiScore: 80 },
    
    // Cheese - Multiple Brands
    { id: '8a', name: 'Cheddar Cheese', brand: 'Dairy Best', price: 6.49, rating: 4.5, reviews: 367, category: 'Cheese',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
      nutrition: { calories: 114, protein: '7g', carbs: '0.4g', fiber: '0g' },
      features: ['Aged', 'Calcium Rich'], aiScore: 78 },
    { id: '8b', name: 'Sharp Cheddar', brand: 'Artisan Cheese Co.', price: 7.99, rating: 4.8, reviews: 234, category: 'Cheese',
      image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400',
      nutrition: { calories: 114, protein: '7g', carbs: '0.4g', fiber: '0g' },
      features: ['Extra Sharp', 'Aged 2 Years', 'Award-Winning'], aiScore: 88 },
    { id: '8c', name: 'Mild Cheddar', brand: 'Value Dairy', price: 4.99, rating: 4.3, reviews: 512, category: 'Cheese',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
      nutrition: { calories: 114, protein: '7g', carbs: '0.4g', fiber: '0g' },
      features: ['Mild', 'Melts Well', 'Budget-Friendly'], aiScore: 74 },
    { id: '8d', name: 'Organic Cheddar', brand: 'Green Valley', price: 8.49, rating: 4.7, reviews: 189, category: 'Cheese',
      image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400',
      nutrition: { calories: 114, protein: '7g', carbs: '0.4g', fiber: '0g' },
      features: ['Organic', 'Grass-Fed', 'No Hormones'], aiScore: 91 },
    
    // Chips - Multiple Brands
    { id: '26a', name: 'Potato Chips', brand: 'Crispy Snacks', price: 3.99, rating: 4.3, reviews: 678, category: 'Chips',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
      nutrition: { calories: 160, protein: '2g', carbs: '15g', fiber: '1g' },
      features: ['Crispy', 'Salted'], aiScore: 65 },
    { id: '26b', name: 'Kettle Chips', brand: 'Premium Crunch', price: 4.49, rating: 4.6, reviews: 445, category: 'Chips',
      image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400',
      nutrition: { calories: 150, protein: '2g', carbs: '16g', fiber: '1g' },
      features: ['Kettle Cooked', 'Sea Salt', 'Crunchy'], aiScore: 72 },
    { id: '26c', name: 'Organic Chips', brand: 'Healthy Crunch', price: 4.99, rating: 4.5, reviews: 323, category: 'Chips',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
      nutrition: { calories: 140, protein: '2g', carbs: '14g', fiber: '2g' },
      features: ['Organic', 'Non-GMO', 'Lower Sodium'], aiScore: 78 },
    { id: '26d', name: 'Baked Chips', brand: 'Better Choice', price: 3.49, rating: 4.4, reviews: 556, category: 'Chips',
      image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400',
      nutrition: { calories: 120, protein: '2g', carbs: '21g', fiber: '2g' },
      features: ['Baked Not Fried', '40% Less Fat', 'Healthier'], aiScore: 81 },
    
    // Orange Juice - Multiple Brands
    { id: '31a', name: 'Orange Juice', brand: 'Fresh Squeeze', price: 4.99, rating: 4.5, reviews: 478, category: 'Orange Juice',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
      nutrition: { calories: 110, protein: '2g', carbs: '26g', fiber: '0g' },
      features: ['Not From Concentrate', 'Vitamin C', 'Fresh'], aiScore: 84 },
    { id: '31b', name: 'Organic OJ', brand: 'Pure Goodness', price: 6.49, rating: 4.7, reviews: 312, category: 'Orange Juice',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
      nutrition: { calories: 110, protein: '2g', carbs: '26g', fiber: '0g' },
      features: ['Organic', 'Cold-Pressed', 'No Added Sugar'], aiScore: 89 },
    { id: '31c', name: 'Orange Juice', brand: 'Daily Juice', price: 3.99, rating: 4.3, reviews: 623, category: 'Orange Juice',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
      nutrition: { calories: 110, protein: '2g', carbs: '26g', fiber: '0g' },
      features: ['Vitamin C', 'Value Pack'], aiScore: 76 },
  ];

  const categories = ['all', 'Bananas', 'Milk', 'Bread', 'Chicken', 'Yogurt', 'Strawberries', 'Cheese', 'Chips', 'Orange Juice'];

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter(p => p.category === selectedCategory);
  };

  const getProductCount = (category: string) => {
    if (category === 'all') return allProducts.length;
    return allProducts.filter(p => p.category === category).length;
  };
  
  const getProductsToCompare = () => {
    return getFilteredProducts().filter(p => selectedProducts.includes(p.id));
  };

  const getBestValue = (metric: string) => {
    const productsToCompare = getProductsToCompare();
    if (metric === 'price') {
      return Math.min(...productsToCompare.map(p => p.price));
    }
    if (metric === 'rating') {
      return Math.max(...productsToCompare.map(p => p.rating));
    }
    return null;
  };

  const aiRecommendation = getProductsToCompare().find(p => p.aiScore === Math.max(...getProductsToCompare().map(p => p.aiScore)));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-smart-blue-light to-smart-green-light pb-20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-black/10 p-6 pt-12 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('search')}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">Compare Products</h1>
            <p className="text-muted-foreground">AI-powered comparison</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-smart-green to-smart-blue rounded-full flex items-center justify-center">
            <Sparkles className="text-white" size={20} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* AI Recommendation */}
        {selectedProducts.length >= 2 && aiRecommendation && (
          <Card className="bg-gradient-to-br from-smart-green to-smart-blue text-white border-0 shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} />
                <h3 className="font-semibold">AI Recommendation</h3>
              </div>
              <p className="mb-4 opacity-90">
                Based on your preferences, nutrition, and value for money, we recommend:
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{aiRecommendation?.name}</h4>
                    <p className="text-sm opacity-90">{aiRecommendation?.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp size={16} />
                      <span className="font-bold">{aiRecommendation?.aiScore}%</span>
                    </div>
                    <p className="text-xs opacity-90">Match Score</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Getting Started Message */}
        {selectedProducts.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-smart-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                <GitCompare className="text-smart-green" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Start Comparing Products</h3>
              <p className="text-muted-foreground text-sm">
                Select 2-3 products below to see a detailed side-by-side comparison with AI recommendations
              </p>
            </div>
          </Card>
        )}

        {selectedProducts.length === 1 && (
          <Card className="bg-orange-50/70 backdrop-blur-sm border-orange-200 shadow-lg">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Sparkles className="text-orange-600" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Select one more product</h4>
                  <p className="text-xs text-muted-foreground">You need at least 2 products to compare</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Product Selector */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Select products to compare (max 3)</h3>
              <Badge variant="secondary" className="bg-smart-green-light text-smart-green">
                {selectedProducts.length}/3
              </Badge>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto mb-4 pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-smart-green text-white shadow-md'
                      : 'bg-white/50 text-gray-700 hover:bg-white'
                  }`}
                >
                  <span>{category === 'all' ? 'All Products' : category}</span>
                  <Badge 
                    variant="secondary" 
                    className={`h-5 px-1.5 min-w-[20px] ${
                      selectedCategory === category 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {getProductCount(category)}
                  </Badge>
                </button>
              ))}
            </div>
            
            {/* Product Count Info */}
            <p className="text-xs text-muted-foreground mb-3">
              Showing {getFilteredProducts().length} {selectedCategory === 'all' ? 'products' : `${selectedCategory.toLowerCase()} options`}
            </p>
            
            <div className="grid grid-cols-3 gap-3">
              {getFilteredProducts().map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    if (selectedProducts.includes(product.id)) {
                      setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                    } else if (selectedProducts.length < 3) {
                      setSelectedProducts([...selectedProducts, product.id]);
                    }
                  }}
                  className={`relative p-2 rounded-xl border-2 transition-all ${
                    selectedProducts.includes(product.id)
                      ? 'border-smart-green bg-smart-green-light shadow-md'
                      : 'border-gray-200 bg-white/50 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-semibold truncate text-gray-900">{product.brand}</p>
                  <p className="text-[10px] text-muted-foreground truncate">${product.price}</p>
                  {selectedProducts.includes(product.id) && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-smart-green rounded-full flex items-center justify-center shadow-md">
                      <Check className="text-white" size={14} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Comparison Table */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
          <div className="p-4">
            <h3 className="font-medium mb-4">Side-by-Side Comparison</h3>
            
            {/* Product Headers */}
            <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: `120px repeat(${getProductsToCompare().length}, 1fr)` }}>
              <div></div>
              {getProductsToCompare().map((product) => (
                <div key={product.id} className="text-center">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="space-y-3">
              {/* Price */}
              <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${getProductsToCompare().length}, 1fr)` }}>
                <div className="flex items-center">
                  <span className="text-sm font-medium">Price</span>
                </div>
                {getProductsToCompare().map((product) => (
                  <div key={product.id} className="text-center">
                    <div className={`inline-flex items-center justify-center px-3 py-1 rounded-lg ${
                      product.price === getBestValue('price') 
                        ? 'bg-smart-green-light text-smart-green font-semibold' 
                        : 'bg-gray-100'
                    }`}>
                      ${product.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${getProductsToCompare().length}, 1fr)` }}>
                <div className="flex items-center">
                  <span className="text-sm font-medium">Rating</span>
                </div>
                {getProductsToCompare().map((product) => (
                  <div key={product.id} className="text-center">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
                      product.rating === getBestValue('rating') 
                        ? 'bg-smart-green-light text-smart-green font-semibold' 
                        : 'bg-gray-100'
                    }`}>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Score */}
              <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${getProductsToCompare().length}, 1fr)` }}>
                <div className="flex items-center">
                  <span className="text-sm font-medium">AI Score</span>
                </div>
                {getProductsToCompare().map((product) => (
                  <div key={product.id} className="text-center">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
                      product.aiScore >= 90 
                        ? 'bg-smart-green-light text-smart-green font-semibold' 
                        : 'bg-gray-100'
                    }`}>
                      <Sparkles className="w-3 h-3" />
                      {product.aiScore}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Nutrition - Calories */}
              <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${getProductsToCompare().length}, 1fr)` }}>
                <div className="flex items-center">
                  <span className="text-sm font-medium">Calories</span>
                </div>
                {getProductsToCompare().map((product) => (
                  <div key={product.id} className="text-center py-1">
                    {product.nutrition.calories}
                  </div>
                ))}
              </div>

              {/* Nutrition - Protein */}
              <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${getProductsToCompare().length}, 1fr)` }}>
                <div className="flex items-center">
                  <span className="text-sm font-medium">Protein</span>
                </div>
                {getProductsToCompare().map((product) => (
                  <div key={product.id} className="text-center py-1">
                    {product.nutrition.protein}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${getProductsToCompare().length}, 1fr)` }}>
                <div className="flex items-center">
                  <span className="text-sm font-medium">Features</span>
                </div>
                {getProductsToCompare().map((product) => (
                  <div key={product.id} className="space-y-1">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1 text-xs">
                        <Check className="w-3 h-3 text-smart-green flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate('search')}
            variant="outline"
            className="h-12 bg-white/70 rounded-xl"
          >
            Search More
          </Button>
          <Button
            onClick={() => onNavigate('product', aiRecommendation)}
            className="h-12 bg-smart-green hover:bg-smart-green/90 text-white rounded-xl"
          >
            View Recommended
          </Button>
        </div>
      </div>
    </div>
  );
}