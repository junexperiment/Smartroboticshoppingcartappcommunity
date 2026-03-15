import { useState } from "react";
import { CartProvider } from "./components/CartContext";
import { Navigation } from "./components/Navigation";
import { Toaster } from "./components/ui/sonner";
import { HomeScreen } from "./components/screens/HomeScreen";
import { ShoppingListScreen } from "./components/screens/ShoppingListScreen";
import { CartControlScreen } from "./components/screens/CartControlScreen";
import { ChatbotScreen } from "./components/screens/ChatbotScreen";
import { ProductDetailsScreen } from "./components/screens/ProductDetailsScreen";
import { ScanProductScreen } from "./components/screens/ScanProductScreen";
import { SearchScreen } from "./components/screens/SearchScreen";
import { ProductComparisonScreen } from "./components/screens/ProductComparisonScreen";
import { CheckoutScreen } from "./components/screens/CheckoutScreen";
import { FeatureGuideScreen } from "./components/screens/FeatureGuideScreen";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [screenData, setScreenData] = useState<any>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(["home"]);

  const renderScreen = () => {
    const handleNavigate = (screen: string, data?: any) => {
      // Handle back navigation
      if (screen === 'back') {
        if (navigationHistory.length > 1) {
          const newHistory = [...navigationHistory];
          newHistory.pop();
          const previousScreen = newHistory[newHistory.length - 1];
          setNavigationHistory(newHistory);
          setActiveScreen(previousScreen);
        } else {
          setActiveScreen("home");
        }
        return;
      }
      
      setActiveScreen(screen);
      if (data) setScreenData(data);
      // Add to navigation history
      setNavigationHistory(prev => [...prev, screen]);
    };

    switch (activeScreen) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "list":
        return <ShoppingListScreen onNavigate={handleNavigate} />;
      case "cart":
        return <CartControlScreen onNavigate={handleNavigate} />;
      case "chat":
        return <ChatbotScreen onNavigate={handleNavigate} />;
      case "product":
        return <ProductDetailsScreen onNavigate={handleNavigate} productData={screenData} />;
      case "scan":
        return <ScanProductScreen onNavigate={handleNavigate} />;
      case "search":
        return <SearchScreen onNavigate={handleNavigate} />;
      case "compare":
        return <ProductComparisonScreen onNavigate={handleNavigate} />;
      case "checkout":
        return <CheckoutScreen onNavigate={handleNavigate} />;
      case "features":
        return <FeatureGuideScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="size-full bg-background min-h-screen relative">
        {renderScreen()}
        <Navigation 
          activeScreen={activeScreen} 
          onScreenChange={setActiveScreen} 
        />
        <Toaster />
      </div>
    </CartProvider>
  );
}