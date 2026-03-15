import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { FeatureHighlights } from "../FeatureHighlights";

interface FeatureGuideScreenProps {
  onNavigate: (screen: string) => void;
}

export function FeatureGuideScreen({ onNavigate }: FeatureGuideScreenProps) {
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
            <h1 className="text-2xl font-semibold text-gray-900">Feature Guide</h1>
            <p className="text-muted-foreground">Discover smart shopping features</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <FeatureHighlights />
      </div>
    </div>
  );
}