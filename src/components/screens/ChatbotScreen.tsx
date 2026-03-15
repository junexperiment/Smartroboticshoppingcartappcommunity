import { Send, Mic, ArrowLeft, Bot, User, MapPin, Clock, Info, ShoppingCart, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../CartContext";

interface ChatbotScreenProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type?: 'text' | 'location' | 'product' | 'suggestion' | 'total';
  productInfo?: {
    name: string;
    price: number;
    aisle: string;
    category: string;
  };
}

// Comprehensive product database with aisle assignments
const productDatabase = [
  // Produce - Aisle 1
  { id: '1', name: 'Organic Bananas', brand: 'Fresh Farms', price: 2.99, category: 'Produce', aisle: 'Aisle 1' },
  { id: '2', name: 'Fresh Strawberries', brand: 'Berry Best', price: 4.99, category: 'Produce', aisle: 'Aisle 1' },
  { id: '3', name: 'Red Bell Peppers', brand: 'Fresh Farms', price: 3.49, category: 'Produce', aisle: 'Aisle 1' },
  { id: '4', name: 'Baby Spinach', brand: 'Green Valley', price: 3.99, category: 'Produce', aisle: 'Aisle 1' },
  { id: '5', name: 'Avocados', brand: 'Fresh Farms', price: 5.99, category: 'Produce', aisle: 'Aisle 1' },
  
  // Meat & Seafood - Aisle 3
  { id: '16', name: 'Chicken Breast', brand: 'Premium Meats', price: 8.99, category: 'Meat', aisle: 'Aisle 3' },
  { id: '17', name: 'Ground Beef', brand: 'Premium Meats', price: 7.99, category: 'Meat', aisle: 'Aisle 3' },
  { id: '18', name: 'Salmon Fillet', brand: 'Ocean Fresh', price: 12.99, category: 'Seafood', aisle: 'Aisle 3' },
  { id: '19', name: 'Turkey Slices', brand: 'Deli Fresh', price: 6.49, category: 'Meat', aisle: 'Aisle 3' },
  { id: '20', name: 'Pork Chops', brand: 'Premium Meats', price: 9.49, category: 'Meat', aisle: 'Aisle 3' },
  
  // Pantry - Aisle 4
  { id: '21', name: 'Spaghetti Pasta', brand: 'Italian Classics', price: 2.99, category: 'Pantry', aisle: 'Aisle 4' },
  { id: '22', name: 'Marinara Sauce', brand: 'Italian Classics', price: 4.49, category: 'Pantry', aisle: 'Aisle 4' },
  { id: '23', name: 'Olive Oil', brand: 'Mediterranean Gold', price: 12.99, category: 'Pantry', aisle: 'Aisle 4' },
  { id: '24', name: 'Basmati Rice', brand: 'Royal Grains', price: 8.99, category: 'Pantry', aisle: 'Aisle 4' },
  { id: '25', name: 'Black Beans', brand: 'Organic Choice', price: 2.49, category: 'Pantry', aisle: 'Aisle 4' },
  
  // Dairy - Aisle 5
  { id: '6', name: 'Whole Milk', brand: 'Dairy Best', price: 4.49, category: 'Dairy', aisle: 'Aisle 5' },
  { id: '7', name: 'Greek Yogurt', brand: 'Dairy Best', price: 3.99, category: 'Dairy', aisle: 'Aisle 5' },
  { id: '8', name: 'Cheddar Cheese', brand: 'Dairy Best', price: 6.49, category: 'Dairy', aisle: 'Aisle 5' },
  { id: '9', name: 'Unsalted Butter', brand: 'Creamery Gold', price: 5.29, category: 'Dairy', aisle: 'Aisle 5' },
  { id: '10', name: 'Cream Cheese', brand: 'Dairy Best', price: 4.79, category: 'Dairy', aisle: 'Aisle 5' },
  
  // Snacks - Aisle 6
  { id: '26', name: 'Potato Chips', brand: 'Crispy Snacks', price: 3.99, category: 'Snacks', aisle: 'Aisle 6' },
  { id: '27', name: 'Mixed Nuts', brand: 'Nutty Delights', price: 7.99, category: 'Snacks', aisle: 'Aisle 6' },
  { id: '28', name: 'Granola Bars', brand: 'Energy Boost', price: 5.49, category: 'Snacks', aisle: 'Aisle 6' },
  { id: '29', name: 'Pretzels', brand: 'Crispy Snacks', price: 3.49, category: 'Snacks', aisle: 'Aisle 6' },
  { id: '30', name: 'Dark Chocolate', brand: 'Swiss Premium', price: 4.99, category: 'Snacks', aisle: 'Aisle 6' },
  
  // Bakery - Aisle 7
  { id: '11', name: 'Sourdough Bread', brand: 'Artisan Bakery', price: 5.99, category: 'Bakery', aisle: 'Aisle 7' },
  { id: '12', name: 'Whole Wheat Bagels', brand: 'Bagel Bros', price: 4.49, category: 'Bakery', aisle: 'Aisle 7' },
  { id: '13', name: 'Croissants', brand: 'French Patisserie', price: 6.99, category: 'Bakery', aisle: 'Aisle 7' },
  { id: '14', name: 'Multigrain Rolls', brand: 'Artisan Bakery', price: 4.99, category: 'Bakery', aisle: 'Aisle 7' },
  { id: '15', name: 'Ciabatta Bread', brand: 'Italian Bakers', price: 5.49, category: 'Bakery', aisle: 'Aisle 7' },
  
  // Beverages - Aisle 8
  { id: '31', name: 'Orange Juice', brand: 'Fresh Squeeze', price: 4.99, category: 'Beverages', aisle: 'Aisle 8' },
  { id: '32', name: 'Sparkling Water', brand: 'Bubble Fresh', price: 3.99, category: 'Beverages', aisle: 'Aisle 8' },
  { id: '33', name: 'Green Tea', brand: 'Zen Leaf', price: 5.49, category: 'Beverages', aisle: 'Aisle 8' },
  { id: '34', name: 'Coffee Beans', brand: 'Morning Brew', price: 11.99, category: 'Beverages', aisle: 'Aisle 8' },
  { id: '35', name: 'Almond Milk', brand: 'Nut Harvest', price: 4.99, category: 'Beverages', aisle: 'Aisle 8' },
  
  // Frozen Foods - Aisle 2
  { id: '36', name: 'Frozen Pizza', brand: 'Pizza Heaven', price: 6.99, category: 'Frozen', aisle: 'Aisle 2' },
  { id: '37', name: 'Ice Cream', brand: 'Creamy Delight', price: 5.49, category: 'Frozen', aisle: 'Aisle 2' },
  { id: '38', name: 'Frozen Vegetables', brand: 'Farm Fresh', price: 3.99, category: 'Frozen', aisle: 'Aisle 2' },
  { id: '39', name: 'Frozen Berries', brand: 'Berry Best', price: 4.49, category: 'Frozen', aisle: 'Aisle 2' },
  { id: '40', name: 'Frozen Chicken Wings', brand: 'Wing Master', price: 9.99, category: 'Frozen', aisle: 'Aisle 2' },
];

export function ChatbotScreen({ onNavigate }: ChatbotScreenProps) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getTotalPrice } = useCart();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your smart shopping assistant. I can help you find products and check your cart total. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    }
  ]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick reply menu buttons
  const quickReplyButtons = [
    { id: 'find', text: 'Find an item', icon: Search },
    { id: 'total', text: 'Check my Total', icon: ShoppingCart },
  ];

  // Find product in database
  const findProduct = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return productDatabase.find(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  };

  // Process user message and generate appropriate bot response
  const processMessage = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for total/cart queries
    if (lowerMessage.includes('total') || lowerMessage.includes('cart') || 
        lowerMessage.includes('how much') || lowerMessage.includes('price')) {
      const cartTotal = getTotalPrice();
      return {
        id: (Date.now() + 1).toString(),
        content: cartTotal > 0 
          ? `Your current cart total is $${cartTotal.toFixed(2)}. You can view your full cart by tapping the Cart button below.`
          : `Your cart is currently empty. Start adding items to see your total!`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'total'
      };
    }
    
    // Check for product location queries
    if (lowerMessage.includes('where') || lowerMessage.includes('find') || 
        lowerMessage.includes('locate') || lowerMessage.includes('location')) {
      
      // Extract potential product name from query
      const words = lowerMessage.split(' ');
      let productQuery = '';
      
      // Common patterns: "where is the [product]", "find [product]", "where can i find [product]"
      const whereIndex = words.indexOf('where');
      const findIndex = words.indexOf('find');
      const isIndex = words.indexOf('is');
      const theIndex = words.indexOf('the');
      
      if (whereIndex !== -1 || findIndex !== -1) {
        // Get words after "where is the" or "find"
        const startIndex = Math.max(whereIndex, findIndex, isIndex, theIndex) + 1;
        productQuery = words.slice(startIndex).join(' ');
      } else {
        // Try to match any product in the message
        productQuery = lowerMessage;
      }
      
      const product = findProduct(productQuery);
      
      if (product) {
        return {
          id: (Date.now() + 1).toString(),
          content: `${product.name} is located in ${product.aisle} in the ${product.category} section. It's priced at $${product.price.toFixed(2)}.`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'product',
          productInfo: {
            name: product.name,
            price: product.price,
            aisle: product.aisle,
            category: product.category
          }
        };
      } else {
        return {
          id: (Date.now() + 1).toString(),
          content: `I couldn't find "${productQuery}" in our store database. Please try searching for a different product or check the spelling. You can also browse products using the Search button.`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
      }
    }
    
    // Default helpful response
    return {
      id: (Date.now() + 1).toString(),
      content: `I can help you with:\n• Finding products - Just ask "Where is [product name]?"\n• Checking your cart total - Ask "What's my total?"\n\nHow can I assist you?`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
  };

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = message.trim();
      setShowQuickReplies(false);
      
      const newMessage: Message = {
        id: Date.now().toString(),
        content: userMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      // Generate bot response
      setTimeout(() => {
        const botResponse = processMessage(userMessage);
        setMessages(prev => [...prev, botResponse]);
      }, 800);
    }
  };

  const handleQuickReply = (buttonId: string) => {
    setShowQuickReplies(false);
    
    if (buttonId === 'find') {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: 'Find an item',
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `Sure! What product are you looking for? You can ask me things like:\n• "Where is milk?"\n• "Find bananas"\n• "Where can I find bread?"`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 800);
    } else if (buttonId === 'total') {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: 'Check my Total',
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      setTimeout(() => {
        const botResponse = processMessage('total');
        setMessages(prev => [...prev, botResponse]);
      }, 800);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-smart-blue-light to-smart-green-light">
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
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-smart-blue rounded-full flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-smart-green rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'user' ? 'bg-smart-green' : 'bg-smart-blue'
              }`}>
                {msg.sender === 'user' ? 
                  <User className="text-white" size={16} /> : 
                  <Bot className="text-white" size={16} />
                }
              </div>
              <Card className={`${
                msg.sender === 'user' 
                  ? 'bg-smart-green text-white' 
                  : 'bg-white/70 backdrop-blur-sm'
              } border-0 shadow-lg`}>
                <div className="p-3">
                  <p className="text-sm">{msg.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {msg.timestamp}
                    </span>
                    {msg.type === 'location' && (
                      <Badge variant="secondary" className="text-xs ml-2">
                        <MapPin size={10} className="mr-1" />
                        Navigation
                      </Badge>
                    )}
                    {msg.type === 'product' && (
                      <Badge variant="secondary" className="text-xs ml-2">
                        <Info size={10} className="mr-1" />
                        Product Info
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isListening && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 bg-smart-blue rounded-full flex items-center justify-center">
                <Mic className="text-white animate-pulse" size={16} />
              </div>
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <div className="p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-smart-blue rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-smart-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-smart-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="ml-2 text-sm text-muted-foreground">Listening...</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {/* Quick Replies */}
        {showQuickReplies && (
          <div className="flex justify-center mt-4">
            {quickReplyButtons.map((button) => {
              const Icon = button.icon;
              return (
                <Button
                  key={button.id}
                  variant="outline"
                  onClick={() => handleQuickReply(button.id)}
                  className="flex-shrink-0 bg-white/70 backdrop-blur-sm border-smart-blue/30 hover:bg-smart-blue-light text-sm mx-2"
                >
                  <Icon size={14} className="mr-1" />
                  {button.text}
                </Button>
              );
            })}
          </div>
        )}
        
        {/* Reference point for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-white/70 backdrop-blur-lg border-t border-black/10 p-4">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Button
            onClick={toggleListening}
            variant="outline"
            size="sm"
            className={`p-3 ${
              isListening 
                ? 'bg-smart-blue text-white border-smart-blue' 
                : 'bg-white/50 border-smart-blue/30 hover:bg-smart-blue-light'
            }`}
          >
            <Mic size={16} className={isListening ? 'animate-pulse' : ''} />
          </Button>
          
          <Input
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-white/50 border-smart-green/30 focus:border-smart-green"
          />
          
          <Button
            onClick={sendMessage}
            className="bg-smart-green hover:bg-smart-green/90 text-white p-3"
            disabled={!message.trim()}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}