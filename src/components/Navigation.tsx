import { Home, List, Bot, ShoppingCart, GitCompare } from "lucide-react";
import { useCart } from "./CartContext";

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export function Navigation({ activeScreen, onScreenChange }: NavigationProps) {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'list', icon: List, label: 'List' },
    { id: 'compare', icon: GitCompare, label: 'Compare' },
    { id: 'checkout', icon: ShoppingCart, label: 'Cart', badge: cartItemCount },
    { id: 'chat', icon: Bot, label: 'AI' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-black/10 px-4 py-2 safe-area-pb-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-smart-green text-white transform scale-110' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="relative">
                <Icon size={20} className="mb-1" />
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{item.badge > 9 ? '9+' : item.badge}</span>
                  </div>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}