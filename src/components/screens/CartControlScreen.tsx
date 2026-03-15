import { 
  Play, 
  Square, 
  RotateCcw, 
  MapPin, 
  Battery, 
  Wifi, 
  AlertTriangle, 
  ArrowLeft,
  Volume2,
  VolumeX
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { useState } from "react";

interface CartControlScreenProps {
  onNavigate: (screen: string) => void;
}

export function CartControlScreen({ onNavigate }: CartControlScreenProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [cartDistance, setCartDistance] = useState(3.5);
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [followSpeed, setFollowSpeed] = useState([2]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-smart-blue-light to-smart-green-light pb-20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-black/10 p-6 pt-12">
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
            <h1 className="text-2xl font-semibold text-gray-900">Cart Control</h1>
            <p className="text-muted-foreground">
              Control your smart shopping cart
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isFollowing ? 'bg-smart-green animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm">{isFollowing ? 'Following' : 'Idle'}</span>
          </div>
        </div>
      </div>

      {/* Cart Status */}
      <div className="p-6">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
          <div className="p-6">
            <h3 className="font-medium mb-4">Cart Status</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Battery className={`mx-auto mb-2 ${batteryLevel > 20 ? 'text-smart-green' : 'text-red-500'}`} size={24} />
                <p className="text-sm font-medium">{batteryLevel}%</p>
                <p className="text-xs text-muted-foreground">Battery</p>
              </div>
              <div className="text-center">
                <Wifi className="text-smart-blue mx-auto mb-2" size={24} />
                <p className="text-sm font-medium">Strong</p>
                <p className="text-xs text-muted-foreground">Signal</p>
              </div>
              <div className="text-center">
                <MapPin className="text-smart-green mx-auto mb-2" size={24} />
                <p className="text-sm font-medium">{cartDistance}m</p>
                <p className="text-xs text-muted-foreground">Distance</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Controls */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
          <div className="p-6">
            <h3 className="font-medium mb-4">Cart Controls</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleFollowToggle}
                className={`h-24 ${
                  isFollowing 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'bg-smart-green hover:bg-smart-green/90'
                } text-white rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105`}
              >
                {isFollowing ? <Square size={28} /> : <Play size={28} />}
                <span>{isFollowing ? 'Stop' : 'Follow Me'}</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 bg-white/70 backdrop-blur-sm border-smart-blue/30 hover:bg-smart-blue-light rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105"
              >
                <RotateCcw className="text-smart-blue" size={28} />
                <span className="text-smart-blue">Return to Start</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
          <div className="p-6">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-16 bg-white/50 border-smart-green/30 hover:bg-smart-green-light rounded-xl flex flex-col items-center justify-center gap-1"
              >
                <MapPin className="text-smart-green" size={20} />
                <span className="text-smart-green text-sm">Find Me</span>
              </Button>

              <Button
                onClick={() => setSoundEnabled(!soundEnabled)}
                variant="outline"
                className="h-16 bg-white/50 border-gray-300 hover:bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-1"
              >
                {soundEnabled ? 
                  <Volume2 className="text-gray-600" size={20} /> : 
                  <VolumeX className="text-gray-600" size={20} />
                }
                <span className="text-gray-600 text-sm">
                  {soundEnabled ? 'Sound On' : 'Sound Off'}
                </span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Speed Control */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-6">
          <div className="p-6">
            <h3 className="font-medium mb-4">Follow Speed</h3>
            <div className="space-y-4">
              <Slider
                value={followSpeed}
                onValueChange={setFollowSpeed}
                max={5}
                min={1}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Slow</span>
                <span className="font-medium">{followSpeed[0]}x</span>
                <span>Fast</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Alerts */}
        {cartDistance > 5 && (
          <Card className="bg-orange-50 border-orange-200 shadow-lg">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-orange-500" size={24} />
                <div>
                  <h4 className="font-medium text-orange-800">Cart Too Far</h4>
                  <p className="text-sm text-orange-600">
                    Your cart is {cartDistance}m away. Consider using "Find Me" feature.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {batteryLevel < 25 && (
          <Card className="bg-red-50 border-red-200 shadow-lg mt-4">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <Battery className="text-red-500" size={24} />
                <div>
                  <h4 className="font-medium text-red-800">Low Battery</h4>
                  <p className="text-sm text-red-600">
                    Cart battery is at {batteryLevel}%. Please return to charging station.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}