import { Upload, Camera, FileText, Plus, Check, ArrowLeft, ScanLine, Search, ShoppingCart, Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface ShoppingListScreenProps {
  onNavigate: (screen: string) => void;
}

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  found: boolean;
}

export function ShoppingListScreen({ onNavigate }: ShoppingListScreenProps) {
  const [newItem, setNewItem] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([
    // Produce (5 items)
    { id: '1', name: 'Organic Bananas', category: 'Produce', found: false },
    { id: '2', name: 'Fresh Strawberries', category: 'Produce', found: false },
    { id: '3', name: 'Red Bell Peppers', category: 'Produce', found: false },
    { id: '4', name: 'Baby Spinach', category: 'Produce', found: false },
    { id: '5', name: 'Avocados', category: 'Produce', found: false },
    
    // Dairy (5 items)
    { id: '6', name: 'Whole Milk', category: 'Dairy', found: true },
    { id: '7', name: 'Greek Yogurt', category: 'Dairy', found: false },
    { id: '8', name: 'Cheddar Cheese', category: 'Dairy', found: false },
    { id: '9', name: 'Unsalted Butter', category: 'Dairy', found: false },
    { id: '10', name: 'Cream Cheese', category: 'Dairy', found: false },
    
    // Bakery (5 items)
    { id: '11', name: 'Sourdough Bread', category: 'Bakery', found: false },
    { id: '12', name: 'Whole Wheat Bagels', category: 'Bakery', found: false },
    { id: '13', name: 'Croissants', category: 'Bakery', found: false },
    { id: '14', name: 'Multigrain Rolls', category: 'Bakery', found: false },
    { id: '15', name: 'Ciabatta Bread', category: 'Bakery', found: false },
    
    // Meat (5 items)
    { id: '16', name: 'Chicken Breast', category: 'Meat', found: false },
    { id: '17', name: 'Ground Beef', category: 'Meat', found: false },
    { id: '18', name: 'Salmon Fillet', category: 'Meat', found: false },
    { id: '19', name: 'Turkey Slices', category: 'Meat', found: false },
    { id: '20', name: 'Pork Chops', category: 'Meat', found: false },
    
    // Pantry (5 items)
    { id: '21', name: 'Spaghetti Pasta', category: 'Pantry', found: false },
    { id: '22', name: 'Marinara Sauce', category: 'Pantry', found: false },
    { id: '23', name: 'Olive Oil', category: 'Pantry', found: false },
    { id: '24', name: 'Basmati Rice', category: 'Pantry', found: false },
    { id: '25', name: 'Black Beans (Canned)', category: 'Pantry', found: false },
    
    // Snacks (5 items)
    { id: '26', name: 'Potato Chips', category: 'Snacks', found: false },
    { id: '27', name: 'Mixed Nuts', category: 'Snacks', found: false },
    { id: '28', name: 'Granola Bars', category: 'Snacks', found: false },
    { id: '29', name: 'Pretzels', category: 'Snacks', found: false },
    { id: '30', name: 'Dark Chocolate', category: 'Snacks', found: false },
    
    // Beverages (5 items)
    { id: '31', name: 'Orange Juice', category: 'Beverages', found: false },
    { id: '32', name: 'Green Tea', category: 'Beverages', found: false },
    { id: '33', name: 'Sparkling Water', category: 'Beverages', found: false },
    { id: '34', name: 'Cold Brew Coffee', category: 'Beverages', found: false },
    { id: '35', name: 'Almond Milk', category: 'Beverages', found: false },
    
    // Frozen (5 items)
    { id: '36', name: 'Frozen Peas', category: 'Frozen', found: false },
    { id: '37', name: 'Ice Cream (Vanilla)', category: 'Frozen', found: false },
    { id: '38', name: 'Frozen Pizza', category: 'Frozen', found: false },
    { id: '39', name: 'Frozen Berries', category: 'Frozen', found: false },
    { id: '40', name: 'Fish Sticks', category: 'Frozen', found: false },
  ]);

  const toggleItem = (id: string) => {
    setShoppingItems(items =>
      items.map(item =>
        item.id === id ? { ...item, found: !item.found } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setShoppingItems(items => items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (newItem.trim()) {
      const newShoppingItem: ShoppingItem = {
        id: Date.now().toString(),
        name: newItem.trim(),
        category: 'General',
        found: false
      };
      setShoppingItems([...shoppingItems, newShoppingItem]);
      setNewItem("");
      toast.success("Item added to list");
    }
  };

  // 📤 UPLOAD HANDLER
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    toast.info("Scanning your list...");

    // SIMULATION: Simulate parsing a file/image
    setTimeout(() => {
      const extractedItems: ShoppingItem[] = [
        { id: Date.now().toString() + '1', name: 'Spaghetti Pasta', category: 'Pantry', found: false },
        { id: Date.now().toString() + '2', name: 'Marinara Sauce', category: 'Pantry', found: false },
        { id: Date.now().toString() + '3', name: 'Ground Beef', category: 'Meat', found: false },
        { id: Date.now().toString() + '4', name: 'Parmesan Cheese', category: 'Dairy', found: false },
      ];

      setShoppingItems(prev => [...prev, ...extractedItems]);
      setIsUploading(false);
      toast.success("List imported successfully!");
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2000);
  };

  const foundItems = shoppingItems.filter(item => item.found).length;
  const totalItems = shoppingItems.length;
  const progressPercentage = totalItems === 0 ? 0 : (foundItems / totalItems) * 100;

  return (
    <div className="flex h-screen bg-gradient-to-br from-smart-green-light to-smart-blue-light overflow-hidden">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".txt,.csv,image/*" 
        onChange={handleFileChange} 
      />

      {/* ================= LEFT SIDE: ACTION CENTER ================= */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('back')}
            className="p-2 hover:bg-white/50 rounded-full bg-white/30 backdrop-blur-sm"
          >
            <ArrowLeft size={24} className="text-gray-800" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Assistant</h1>
            <p className="text-muted-foreground">Manage and upload your grocery needs</p>
          </div>
        </div>

        {/* Large Upload Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <button 
            onClick={handleUploadClick}
            disabled={isUploading}
            className="group relative h-64 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-smart-green/50 hover:border-smart-green hover:bg-white transition-all flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-xl"
          >
            <div className="w-20 h-20 bg-smart-green/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              {isUploading ? (
                <Loader2 size={40} className="text-smart-green animate-spin" />
              ) : (
                <Upload size={40} className="text-smart-green" />
              )}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Upload Grocery List</h3>
              <p className="text-sm text-gray-500 mt-1 px-8">
                {isUploading ? 'AI is analyzing your file...' : 'Upload a photo or text file to auto-fill your list'}
              </p>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-4 h-64">
            <button 
              onClick={() => onNavigate('scan')}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 hover:bg-white transition-all flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <ScanLine size={24} className="text-purple-600" />
              </div>
              <span className="font-medium text-gray-700">Scan Product</span>
            </button>

            <button 
              onClick={() => onNavigate('search')}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 hover:bg-white transition-all flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Search size={24} className="text-blue-600" />
              </div>
              <span className="font-medium text-gray-700">Search Item</span>
            </button>
            
            <button className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 hover:bg-white transition-all flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Camera size={24} className="text-orange-600" />
              </div>
              <span className="font-medium text-gray-700">Photo Note</span>
            </button>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 p-4 flex flex-col justify-center">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">Quick Add</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Milk..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                  className="bg-white h-10"
                />
                <Button size="icon" onClick={addItem} className="h-10 w-10 bg-smart-green shrink-0">
                  <Plus size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start">
          <FileText className="text-blue-500 mt-0.5" size={20} />
          <div>
            <h4 className="font-medium text-blue-900">Pro Tip: Upload Handwritten Lists</h4>
            <p className="text-sm text-blue-700 mt-1">
              Our AI can read handwritten notes! Just take a photo of your fridge note and upload it to instantly populate your shopping list.
            </p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE: THE LIST (SIDEBAR) ================= */}
      <div className="w-96 bg-white border-l border-gray-200 shadow-2xl flex flex-col z-20">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100 bg-white z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your List</h2>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {foundItems}/{totalItems} Done
            </Badge>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-smart-green h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Scrollable List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
          {shoppingItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center p-4">
              <ShoppingCart size={48} className="mb-4 opacity-20" />
              <p>Your list is empty.</p>
              <p className="text-sm mt-2">Upload a list or add items manually to get started.</p>
            </div>
          ) : (
            shoppingItems.map((item) => (
              <div 
                key={item.id} 
                className={`group bg-white p-3 rounded-xl border shadow-sm transition-all duration-200 ${
                  item.found ? 'border-smart-green/30 bg-smart-green/5' : 'border-gray-100 hover:border-smart-blue/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      item.found
                        ? 'bg-smart-green border-smart-green text-white'
                        : 'border-gray-300 hover:border-smart-green bg-white'
                    }`}
                  >
                    {item.found && <Check size={14} strokeWidth={3} />}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium text-sm truncate pr-2 ${item.found ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${item.found ? 'bg-white border-gray-200 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Footer (Checkout) */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Remaining Items</span>
            <span className="font-medium text-gray-900">{totalItems - foundItems}</span>
          </div>
          <Button 
            onClick={() => onNavigate('checkout')}
            className="w-full h-12 bg-smart-green hover:bg-smart-green/90 text-white shadow-lg shadow-smart-green/20 rounded-xl font-semibold text-lg"
          >
            Start Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}