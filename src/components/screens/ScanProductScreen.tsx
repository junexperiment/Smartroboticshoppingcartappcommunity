import { ArrowLeft, ScanLine, Camera, Keyboard, Search, Package, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface ScanProductScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function ScanProductScreen({ onNavigate }: ScanProductScreenProps) {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera');
  const [manualBarcode, setManualBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any>(null);

  // Mock barcode database
  const mockProducts: Record<string, any> = {
    // Produce
    '123456789': {
      id: '1',
      name: 'Organic Bananas',
      brand: 'Fresh Farms',
      price: 2.99,
      aisle: 'Aisle 1 - Produce',
      barcode: '123456789',
    },
    '123456790': {
      id: '2',
      name: 'Fresh Strawberries',
      brand: 'Berry Best',
      price: 4.99,
      aisle: 'Aisle 1 - Produce',
      barcode: '123456790',
    },
    '123456791': {
      id: '3',
      name: 'Red Bell Peppers',
      brand: 'Fresh Farms',
      price: 3.49,
      aisle: 'Aisle 1 - Produce',
      barcode: '123456791',
    },
    '123456792': {
      id: '4',
      name: 'Baby Spinach',
      brand: 'Green Valley',
      price: 3.99,
      aisle: 'Aisle 1 - Produce',
      barcode: '123456792',
    },
    '123456793': {
      id: '5',
      name: 'Avocados',
      brand: 'Fresh Farms',
      price: 5.99,
      aisle: 'Aisle 1 - Produce',
      barcode: '123456793',
    },
    
    // Dairy
    '987654321': {
      id: '6',
      name: 'Whole Milk',
      brand: 'Dairy Best',
      price: 4.49,
      aisle: 'Aisle 5 - Dairy',
      barcode: '987654321',
    },
    '987654322': {
      id: '7',
      name: 'Greek Yogurt',
      brand: 'Dairy Best',
      price: 3.99,
      aisle: 'Aisle 5 - Dairy',
      barcode: '987654322',
    },
    '987654323': {
      id: '8',
      name: 'Cheddar Cheese',
      brand: 'Dairy Best',
      price: 6.49,
      aisle: 'Aisle 5 - Dairy',
      barcode: '987654323',
    },
    '987654324': {
      id: '9',
      name: 'Unsalted Butter',
      brand: 'Creamery Gold',
      price: 5.29,
      aisle: 'Aisle 5 - Dairy',
      barcode: '987654324',
    },
    '987654325': {
      id: '10',
      name: 'Cream Cheese',
      brand: 'Dairy Best',
      price: 4.79,
      aisle: 'Aisle 5 - Dairy',
      barcode: '987654325',
    },
    
    // Bakery
    '456789123': {
      id: '11',
      name: 'Sourdough Bread',
      brand: 'Artisan Bakery',
      price: 5.99,
      aisle: 'Aisle 7 - Bakery',
      barcode: '456789123',
    },
    '456789124': {
      id: '12',
      name: 'Whole Wheat Bagels',
      brand: 'Bagel Bros',
      price: 4.49,
      aisle: 'Aisle 7 - Bakery',
      barcode: '456789124',
    },
    '456789125': {
      id: '13',
      name: 'Croissants',
      brand: 'French Patisserie',
      price: 6.99,
      aisle: 'Aisle 7 - Bakery',
      barcode: '456789125',
    },
    '456789126': {
      id: '14',
      name: 'Multigrain Rolls',
      brand: 'Artisan Bakery',
      price: 4.99,
      aisle: 'Aisle 7 - Bakery',
      barcode: '456789126',
    },
    '456789127': {
      id: '15',
      name: 'Ciabatta Bread',
      brand: 'Italian Bakers',
      price: 5.49,
      aisle: 'Aisle 7 - Bakery',
      barcode: '456789127',
    },
    
    // Meat
    '789123456': {
      id: '16',
      name: 'Chicken Breast',
      brand: 'Premium Meats',
      price: 8.99,
      aisle: 'Aisle 3 - Meat',
      barcode: '789123456',
    },
    '789123457': {
      id: '17',
      name: 'Ground Beef',
      brand: 'Premium Meats',
      price: 7.99,
      aisle: 'Aisle 3 - Meat',
      barcode: '789123457',
    },
    '789123458': {
      id: '18',
      name: 'Salmon Fillet',
      brand: 'Ocean Fresh',
      price: 12.99,
      aisle: 'Aisle 3 - Meat',
      barcode: '789123458',
    },
    '789123459': {
      id: '19',
      name: 'Turkey Slices',
      brand: 'Deli Fresh',
      price: 6.49,
      aisle: 'Aisle 3 - Meat',
      barcode: '789123459',
    },
    '789123460': {
      id: '20',
      name: 'Pork Chops',
      brand: 'Premium Meats',
      price: 9.49,
      aisle: 'Aisle 3 - Meat',
      barcode: '789123460',
    },
    
    // Pantry
    '321654987': {
      id: '21',
      name: 'Spaghetti Pasta',
      brand: 'Italian Classics',
      price: 2.99,
      aisle: 'Aisle 4 - Pantry',
      barcode: '321654987',
    },
    '321654988': {
      id: '22',
      name: 'Marinara Sauce',
      brand: 'Italian Classics',
      price: 4.49,
      aisle: 'Aisle 4 - Pantry',
      barcode: '321654988',
    },
    '321654989': {
      id: '23',
      name: 'Olive Oil',
      brand: 'Mediterranean Gold',
      price: 12.99,
      aisle: 'Aisle 4 - Pantry',
      barcode: '321654989',
    },
    '321654990': {
      id: '24',
      name: 'Basmati Rice',
      brand: 'Royal Grains',
      price: 8.99,
      aisle: 'Aisle 4 - Pantry',
      barcode: '321654990',
    },
    '321654991': {
      id: '25',
      name: 'Black Beans (Canned)',
      brand: 'Organic Choice',
      price: 2.49,
      aisle: 'Aisle 4 - Pantry',
      barcode: '321654991',
    },
    
    // Snacks
    '654987321': {
      id: '26',
      name: 'Potato Chips',
      brand: 'Crispy Snacks',
      price: 3.99,
      aisle: 'Aisle 6 - Snacks',
      barcode: '654987321',
    },
    '654987322': {
      id: '27',
      name: 'Mixed Nuts',
      brand: 'Nutty Delights',
      price: 7.99,
      aisle: 'Aisle 6 - Snacks',
      barcode: '654987322',
    },
    '654987323': {
      id: '28',
      name: 'Granola Bars',
      brand: 'Energy Boost',
      price: 5.49,
      aisle: 'Aisle 6 - Snacks',
      barcode: '654987323',
    },
    '654987324': {
      id: '29',
      name: 'Pretzels',
      brand: 'Crispy Snacks',
      price: 3.49,
      aisle: 'Aisle 6 - Snacks',
      barcode: '654987324',
    },
    '654987325': {
      id: '30',
      name: 'Dark Chocolate',
      brand: 'Swiss Premium',
      price: 4.99,
      aisle: 'Aisle 6 - Snacks',
      barcode: '654987325',
    },
    
    // Beverages
    '159753486': {
      id: '31',
      name: 'Orange Juice',
      brand: 'Fresh Squeeze',
      price: 5.99,
      aisle: 'Aisle 8 - Beverages',
      barcode: '159753486',
    },
    '159753487': {
      id: '32',
      name: 'Green Tea',
      brand: 'Zen Leaf',
      price: 6.49,
      aisle: 'Aisle 8 - Beverages',
      barcode: '159753487',
    },
    '159753488': {
      id: '33',
      name: 'Sparkling Water',
      brand: 'Bubble Fresh',
      price: 4.99,
      aisle: 'Aisle 8 - Beverages',
      barcode: '159753488',
    },
    '159753489': {
      id: '34',
      name: 'Cold Brew Coffee',
      brand: 'Morning Boost',
      price: 7.99,
      aisle: 'Aisle 8 - Beverages',
      barcode: '159753489',
    },
    '159753490': {
      id: '35',
      name: 'Almond Milk',
      brand: 'Nutty Best',
      price: 5.49,
      aisle: 'Aisle 8 - Beverages',
      barcode: '159753490',
    },
    
    // Frozen
    '753159486': {
      id: '36',
      name: 'Frozen Peas',
      brand: 'Green Valley',
      price: 3.49,
      aisle: 'Aisle 9 - Frozen',
      barcode: '753159486',
    },
    '753159487': {
      id: '37',
      name: 'Ice Cream (Vanilla)',
      brand: 'Creamy Dreams',
      price: 6.99,
      aisle: 'Aisle 9 - Frozen',
      barcode: '753159487',
    },
    '753159488': {
      id: '38',
      name: 'Frozen Pizza',
      brand: 'Quick Meals',
      price: 8.99,
      aisle: 'Aisle 9 - Frozen',
      barcode: '753159488',
    },
    '753159489': {
      id: '39',
      name: 'Frozen Berries',
      brand: 'Berry Best',
      price: 5.99,
      aisle: 'Aisle 9 - Frozen',
      barcode: '753159489',
    },
    '753159490': {
      id: '40',
      name: 'Fish Sticks',
      brand: 'Ocean Fresh',
      price: 7.49,
      aisle: 'Aisle 9 - Frozen',
      barcode: '753159490',
    },
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      const randomBarcode = Object.keys(mockProducts)[Math.floor(Math.random() * Object.keys(mockProducts).length)];
      const product = mockProducts[randomBarcode];
      setScannedProduct(product);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualLookup = () => {
    const product = mockProducts[manualBarcode];
    if (product) {
      setScannedProduct(product);
    } else {
      setScannedProduct({
        error: true,
        message: 'Product not found. Please try a different barcode or use search.'
      });
    }
  };

  const handleViewDetails = () => {
    onNavigate('product', scannedProduct);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-smart-blue-light to-smart-green-light pb-20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-black/10 p-6 pt-12 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('back')}
            className="p-2 hover:bg-white/50"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">Scan Product</h1>
            <p className="text-muted-foreground">Scan or enter barcode manually</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('search')}
            className="p-2 hover:bg-white/50"
          >
            <Search size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Scan Mode Selector */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setScanMode('camera')}
                variant={scanMode === 'camera' ? 'default' : 'outline'}
                className={scanMode === 'camera' 
                  ? 'bg-smart-green hover:bg-smart-green/90 text-white' 
                  : 'bg-white/50'
                }
              >
                <Camera className="mr-2" size={18} />
                Camera Scan
              </Button>
              <Button
                onClick={() => setScanMode('manual')}
                variant={scanMode === 'manual' ? 'default' : 'outline'}
                className={scanMode === 'manual' 
                  ? 'bg-smart-blue hover:bg-smart-blue/90 text-white' 
                  : 'bg-white/50'
                }
              >
                <Keyboard className="mr-2" size={18} />
                Manual Entry
              </Button>
            </div>
          </div>
        </Card>

        {/* Camera Scan Mode */}
        {scanMode === 'camera' && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="p-6">
              <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl overflow-hidden mb-6">
                {/* Simulated camera view */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isScanning ? (
                    <div className="text-center">
                      <ScanLine className="text-smart-green mx-auto mb-4 animate-pulse" size={64} />
                      <p className="text-white">Scanning...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Package className="text-white/50 mx-auto mb-4" size={64} />
                      <p className="text-white/70">Position barcode in frame</p>
                    </div>
                  )}
                </div>
                
                {/* Scan frame overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-40 border-4 border-smart-green rounded-xl border-dashed"></div>
                </div>
              </div>

              <Button 
                onClick={handleScan}
                disabled={isScanning}
                className="w-full h-14 bg-smart-green hover:bg-smart-green/90 text-white rounded-xl"
              >
                <ScanLine className="mr-2" size={20} />
                {isScanning ? 'Scanning...' : 'Scan Barcode'}
              </Button>
            </div>
          </Card>
        )}

        {/* Manual Entry Mode */}
        {scanMode === 'manual' && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="p-6">
              <h3 className="font-medium mb-4">Enter Barcode Number</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter barcode (e.g., 123456789)"
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualLookup()}
                  className="bg-white/50 border-smart-blue/30 h-12"
                />
                <Button 
                  onClick={handleManualLookup}
                  disabled={!manualBarcode}
                  className="w-full h-12 bg-smart-blue hover:bg-smart-blue/90 text-white rounded-xl"
                >
                  <Search className="mr-2" size={20} />
                  Look Up Product
                </Button>
              </div>

              <div className="mt-6 p-4 bg-smart-blue-light/50 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  💡 Tip: Try scanning "123456789" or "987654321" for demo products
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Scanned Product Result */}
        {scannedProduct && !scannedProduct.error && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-in slide-in-from-bottom">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-smart-green rounded-full flex items-center justify-center">
                  <Package className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Product Found!</h3>
                  <p className="text-sm text-muted-foreground">Barcode: {scannedProduct.barcode}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <h4 className="font-medium">{scannedProduct.name}</h4>
                  <p className="text-sm text-muted-foreground">{scannedProduct.brand}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-smart-blue" size={16} />
                    <span className="text-sm">{scannedProduct.aisle}</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-smart-green">${scannedProduct.price}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setScannedProduct(null)}
                  variant="outline"
                  className="h-12 bg-white/50 rounded-xl"
                >
                  Scan Another
                </Button>
                <Button
                  onClick={handleViewDetails}
                  className="h-12 bg-smart-green hover:bg-smart-green/90 text-white rounded-xl"
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Error State */}
        {scannedProduct && scannedProduct.error && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg border-2 border-orange-300">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-orange-500" size={32} />
                </div>
                <h3 className="font-semibold mb-2">Product Not Found</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {scannedProduct.message}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setScannedProduct(null)}
                    variant="outline"
                    className="h-12 bg-white/50 rounded-xl"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={() => onNavigate('search')}
                    className="h-12 bg-smart-blue hover:bg-smart-blue/90 text-white rounded-xl"
                  >
                    <Search className="mr-2" size={16} />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="p-4">
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                onClick={() => onNavigate('search')}
                variant="outline"
                className="w-full justify-start h-12 bg-white/50"
              >
                <Search className="mr-3 text-smart-blue" size={18} />
                Search Products
              </Button>
              <Button
                onClick={() => onNavigate('compare')}
                variant="outline"
                className="w-full justify-start h-12 bg-white/50"
              >
                <Package className="mr-3 text-smart-green" size={18} />
                Compare Products
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}