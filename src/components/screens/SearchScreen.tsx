import { ArrowLeft, Search, Tag, TrendingUp, Percent, Star, MapPin, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface SearchScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function SearchScreen({ onNavigate }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock product database
  const allProducts = [
    // Produce (5 products)
    {
      id: '1',
      name: 'Organic Bananas',
      brand: 'Fresh Farms',
      price: 2.99,
      originalPrice: 3.49,
      rating: 4.5,
      reviews: 247,
      aisle: 'Aisle 1',
      category: 'Produce',
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
      onSale: true,
    },
    {
      id: '2',
      name: 'Fresh Strawberries',
      brand: 'Berry Best',
      price: 4.99,
      rating: 4.6,
      reviews: 189,
      aisle: 'Aisle 1',
      category: 'Produce',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
      onSale: false,
    },
    {
      id: '3',
      name: 'Red Bell Peppers',
      brand: 'Fresh Farms',
      price: 3.49,
      originalPrice: 4.29,
      rating: 4.4,
      reviews: 156,
      aisle: 'Aisle 1',
      category: 'Produce',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
      onSale: true,
    },
    {
      id: '4',
      name: 'Baby Spinach',
      brand: 'Green Valley',
      price: 3.99,
      rating: 4.7,
      reviews: 298,
      aisle: 'Aisle 1',
      category: 'Produce',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      onSale: false,
    },
    {
      id: '5',
      name: 'Avocados',
      brand: 'Fresh Farms',
      price: 5.99,
      originalPrice: 6.99,
      rating: 4.8,
      reviews: 412,
      aisle: 'Aisle 1',
      category: 'Produce',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
      onSale: true,
    },
    
    // Dairy (5 products)
    {
      id: '6',
      name: 'Whole Milk',
      brand: 'Dairy Best',
      price: 4.49,
      rating: 4.7,
      reviews: 532,
      aisle: 'Aisle 5',
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
      onSale: false,
    },
    {
      id: '7',
      name: 'Greek Yogurt',
      brand: 'Dairy Best',
      price: 3.99,
      rating: 4.6,
      reviews: 421,
      aisle: 'Aisle 5',
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      onSale: false,
    },
    {
      id: '8',
      name: 'Cheddar Cheese',
      brand: 'Dairy Best',
      price: 6.49,
      originalPrice: 7.99,
      rating: 4.5,
      reviews: 367,
      aisle: 'Aisle 5',
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
      onSale: true,
    },
    {
      id: '9',
      name: 'Unsalted Butter',
      brand: 'Creamery Gold',
      price: 5.29,
      rating: 4.8,
      reviews: 289,
      aisle: 'Aisle 5',
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400',
      onSale: false,
    },
    {
      id: '10',
      name: 'Cream Cheese',
      brand: 'Dairy Best',
      price: 4.79,
      originalPrice: 5.49,
      rating: 4.4,
      reviews: 198,
      aisle: 'Aisle 5',
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400',
      onSale: true,
    },
    
    // Bakery (5 products)
    {
      id: '11',
      name: 'Sourdough Bread',
      brand: 'Artisan Bakery',
      price: 5.99,
      originalPrice: 6.99,
      rating: 4.8,
      reviews: 189,
      aisle: 'Aisle 7',
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
      onSale: true,
    },
    {
      id: '12',
      name: 'Whole Wheat Bagels',
      brand: 'Bagel Bros',
      price: 4.49,
      rating: 4.5,
      reviews: 256,
      aisle: 'Aisle 7',
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      onSale: false,
    },
    {
      id: '13',
      name: 'Croissants',
      brand: 'French Patisserie',
      price: 6.99,
      originalPrice: 8.49,
      rating: 4.9,
      reviews: 334,
      aisle: 'Aisle 7',
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      onSale: true,
    },
    {
      id: '14',
      name: 'Multigrain Rolls',
      brand: 'Artisan Bakery',
      price: 4.99,
      rating: 4.6,
      reviews: 178,
      aisle: 'Aisle 7',
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      onSale: false,
    },
    {
      id: '15',
      name: 'Ciabatta Bread',
      brand: 'Italian Bakers',
      price: 5.49,
      rating: 4.7,
      reviews: 212,
      aisle: 'Aisle 7',
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400',
      onSale: false,
    },
    
    // Meat (5 products)
    {
      id: '16',
      name: 'Chicken Breast',
      brand: 'Premium Meats',
      price: 8.99,
      rating: 4.6,
      reviews: 445,
      aisle: 'Aisle 3',
      category: 'Meat',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
      onSale: false,
    },
    {
      id: '17',
      name: 'Ground Beef',
      brand: 'Premium Meats',
      price: 7.99,
      originalPrice: 9.49,
      rating: 4.5,
      reviews: 389,
      aisle: 'Aisle 3',
      category: 'Meat',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400',
      onSale: true,
    },
    {
      id: '18',
      name: 'Salmon Fillet',
      brand: 'Ocean Fresh',
      price: 12.99,
      originalPrice: 14.99,
      rating: 4.8,
      reviews: 267,
      aisle: 'Aisle 3',
      category: 'Meat',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
      onSale: true,
    },
    {
      id: '19',
      name: 'Turkey Slices',
      brand: 'Deli Fresh',
      price: 6.49,
      rating: 4.4,
      reviews: 234,
      aisle: 'Aisle 3',
      category: 'Meat',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      onSale: false,
    },
    {
      id: '20',
      name: 'Pork Chops',
      brand: 'Premium Meats',
      price: 9.49,
      rating: 4.7,
      reviews: 312,
      aisle: 'Aisle 3',
      category: 'Meat',
      image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400',
      onSale: false,
    },
    
    // Pantry (5 products)
    {
      id: '21',
      name: 'Spaghetti Pasta',
      brand: 'Italian Classics',
      price: 2.99,
      rating: 4.5,
      reviews: 512,
      aisle: 'Aisle 4',
      category: 'Pantry',
      image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400',
      onSale: false,
    },
    {
      id: '22',
      name: 'Marinara Sauce',
      brand: 'Italian Classics',
      price: 4.49,
      originalPrice: 5.49,
      rating: 4.6,
      reviews: 398,
      aisle: 'Aisle 4',
      category: 'Pantry',
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
      onSale: true,
    },
    {
      id: '23',
      name: 'Olive Oil',
      brand: 'Mediterranean Gold',
      price: 12.99,
      rating: 4.8,
      reviews: 478,
      aisle: 'Aisle 4',
      category: 'Pantry',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      onSale: false,
    },
    {
      id: '24',
      name: 'Basmati Rice',
      brand: 'Royal Grains',
      price: 8.99,
      originalPrice: 10.49,
      rating: 4.7,
      reviews: 567,
      aisle: 'Aisle 4',
      category: 'Pantry',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      onSale: true,
    },
    {
      id: '25',
      name: 'Black Beans (Canned)',
      brand: 'Organic Choice',
      price: 2.49,
      rating: 4.4,
      reviews: 289,
      aisle: 'Aisle 4',
      category: 'Pantry',
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400',
      onSale: false,
    },
    
    // Snacks (5 products)
    {
      id: '26',
      name: 'Potato Chips',
      brand: 'Crispy Snacks',
      price: 3.99,
      originalPrice: 4.99,
      rating: 4.3,
      reviews: 678,
      aisle: 'Aisle 6',
      category: 'Snacks',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
      onSale: true,
    },
    {
      id: '27',
      name: 'Mixed Nuts',
      brand: 'Nutty Delights',
      price: 7.99,
      rating: 4.6,
      reviews: 445,
      aisle: 'Aisle 6',
      category: 'Snacks',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
      onSale: false,
    },
    {
      id: '28',
      name: 'Granola Bars',
      brand: 'Energy Boost',
      price: 5.49,
      originalPrice: 6.49,
      rating: 4.5,
      reviews: 523,
      aisle: 'Aisle 6',
      category: 'Snacks',
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
      onSale: true,
    },
    {
      id: '29',
      name: 'Pretzels',
      brand: 'Crispy Snacks',
      price: 3.49,
      rating: 4.4,
      reviews: 389,
      aisle: 'Aisle 6',
      category: 'Snacks',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
      onSale: false,
    },
    {
      id: '30',
      name: 'Dark Chocolate',
      brand: 'Swiss Premium',
      price: 4.99,
      rating: 4.8,
      reviews: 712,
      aisle: 'Aisle 6',
      category: 'Snacks',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
      onSale: false,
    },
    
    // Beverages (5 products)
    {
      id: '31',
      name: 'Orange Juice',
      brand: 'Fresh Squeeze',
      price: 5.99,
      originalPrice: 6.99,
      rating: 4.6,
      reviews: 456,
      aisle: 'Aisle 8',
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
      onSale: true,
    },
    {
      id: '32',
      name: 'Green Tea',
      brand: 'Zen Leaf',
      price: 6.49,
      rating: 4.7,
      reviews: 334,
      aisle: 'Aisle 8',
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
      onSale: false,
    },
    {
      id: '33',
      name: 'Sparkling Water',
      brand: 'Bubble Fresh',
      price: 4.99,
      originalPrice: 5.99,
      rating: 4.5,
      reviews: 589,
      aisle: 'Aisle 8',
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400',
      onSale: true,
    },
    {
      id: '34',
      name: 'Cold Brew Coffee',
      brand: 'Morning Boost',
      price: 7.99,
      rating: 4.8,
      reviews: 678,
      aisle: 'Aisle 8',
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
      onSale: false,
    },
    {
      id: '35',
      name: 'Almond Milk',
      brand: 'Nutty Best',
      price: 5.49,
      rating: 4.6,
      reviews: 423,
      aisle: 'Aisle 8',
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      onSale: false,
    },
    
    // Frozen (5 products)
    {
      id: '36',
      name: 'Frozen Peas',
      brand: 'Green Valley',
      price: 3.49,
      originalPrice: 4.29,
      rating: 4.4,
      reviews: 267,
      aisle: 'Aisle 9',
      category: 'Frozen',
      image: 'https://images.unsplash.com/photo-1613743983303-b3e89f8a90b1?w=400',
      onSale: true,
    },
    {
      id: '37',
      name: 'Ice Cream (Vanilla)',
      brand: 'Creamy Dreams',
      price: 6.99,
      rating: 4.7,
      reviews: 892,
      aisle: 'Aisle 9',
      category: 'Frozen',
      image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400',
      onSale: false,
    },
    {
      id: '38',
      name: 'Frozen Pizza',
      brand: 'Quick Meals',
      price: 8.99,
      originalPrice: 10.49,
      rating: 4.3,
      reviews: 534,
      aisle: 'Aisle 9',
      category: 'Frozen',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      onSale: true,
    },
    {
      id: '39',
      name: 'Frozen Berries',
      brand: 'Berry Best',
      price: 5.99,
      rating: 4.6,
      reviews: 378,
      aisle: 'Aisle 9',
      category: 'Frozen',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
      onSale: false,
    },
    {
      id: '40',
      name: 'Fish Sticks',
      brand: 'Ocean Fresh',
      price: 7.49,
      originalPrice: 8.99,
      rating: 4.2,
      reviews: 289,
      aisle: 'Aisle 9',
      category: 'Frozen',
      image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400',
      onSale: true,
    },
  ];

  // Mock promotions
  const promotions = [
    {
      id: 'p1',
      title: 'Fresh Produce Sale',
      description: 'Save 20% on all organic fruits and vegetables',
      discount: '20% OFF',
      category: 'Produce',
      endDate: 'Nov 25, 2025',
      color: 'bg-green-500',
    },
    {
      id: 'p2',
      title: 'Dairy Week Special',
      description: 'Buy 2 Get 1 Free on selected dairy products',
      discount: 'BOGO',
      category: 'Dairy',
      endDate: 'Nov 22, 2025',
      color: 'bg-blue-500',
    },
    {
      id: 'p3',
      title: 'Bakery Fresh Deals',
      description: '$2 off on artisan breads',
      discount: '$2 OFF',
      category: 'Bakery',
      endDate: 'Nov 20, 2025',
      color: 'bg-orange-500',
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-smart-green-light to-smart-blue-light pb-20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-black/10 p-6 pt-12 flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('back')}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">Search</h1>
            <p className="text-muted-foreground">Find products & promotions</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10 h-12 bg-white/50 border-smart-green/30 rounded-xl"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="products" className="w-full">
          <div className="bg-white/50 backdrop-blur-sm border-b border-black/10 px-6 py-2 sticky top-0 z-10">
            <TabsList className="w-full grid grid-cols-2 bg-white/70">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="products" className="p-6 space-y-4 mt-0">
            {isSearching && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-smart-green/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <Search className="text-smart-green" size={24} />
                  </div>
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              </Card>
            )}

            {!isSearching && searchQuery && searchResults.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" size={32} />
                  </div>
                  <h3 className="font-semibold mb-2">No products found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try searching with different keywords
                  </p>
                  <Button
                    onClick={() => onNavigate('scan')}
                    className="bg-smart-blue hover:bg-smart-blue/90 text-white"
                  >
                    Try Scanning Instead
                  </Button>
                </div>
              </Card>
            )}

            {!searchQuery && (
              <div className="space-y-4">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <div className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <TrendingUp className="text-smart-green" size={18} />
                      Trending Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Organic', 'Milk', 'Bread', 'Yogurt', 'Fruits', 'Vegetables'].map((term) => (
                        <Badge
                          key={term}
                          variant="outline"
                          className="cursor-pointer hover:bg-smart-green-light hover:border-smart-green"
                          onClick={() => handleSearch(term)}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <div className="p-4">
                    <h3 className="font-medium mb-3">Popular Categories</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Produce', 'Dairy', 'Bakery', 'Meat'].map((category) => (
                        <Button
                          key={category}
                          variant="outline"
                          className="h-20 bg-white/50 flex flex-col items-center justify-center gap-2"
                          onClick={() => handleSearch(category)}
                        >
                          <Tag className="text-smart-blue" size={24} />
                          <span>{category}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">
                    {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate('compare')}
                    className="text-smart-blue"
                  >
                    Compare Selected
                  </Button>
                </div>

                {searchResults.map((product) => (
                  <Card 
                    key={product.id} 
                    className="bg-white/70 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => onNavigate('product', product)}
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex-1">
                              <h4 className="font-medium truncate">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.brand}</p>
                            </div>
                            {product.onSale && (
                              <Badge className="bg-red-500 text-white ml-2">
                                Sale
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{product.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                            <div className="flex items-center gap-1 ml-auto">
                              <MapPin className="text-smart-blue" size={12} />
                              <span className="text-xs text-muted-foreground">{product.aisle}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-smart-green">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="promotions" className="p-6 space-y-4 mt-0">
            <div className="space-y-4">
              {promotions.map((promo) => (
                <Card key={promo.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <div className={`${promo.color} h-2`}></div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Percent className="text-smart-green" size={18} />
                            <h3 className="font-semibold">{promo.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{promo.description}</p>
                        </div>
                        <Badge className={`${promo.color} text-white ml-2`}>
                          {promo.discount}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {promo.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Ends {promo.endDate}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-smart-blue hover:bg-smart-blue-light"
                          onClick={() => handleSearch(promo.category)}
                        >
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-smart-green to-smart-blue text-white border-0 shadow-lg">
              <div className="p-6 text-center">
                <h3 className="font-semibold mb-2">Want More Deals?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Enable notifications to get personalized offers
                </p>
                <Button className="bg-white text-smart-green hover:bg-white/90">
                  Enable Notifications
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}