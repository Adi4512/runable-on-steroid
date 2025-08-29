import { useState, useEffect } from 'react';
import { AlertTriangle, Monitor, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MobileWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Check if screen width is less than 1024px (tablet/mobile)
      const isMobile = window.innerWidth < 1024;
      
      // Check if user has already dismissed the warning in this session
      const hasBeenDismissed = sessionStorage.getItem('mobile-warning-dismissed');
      
      if (isMobile && !hasBeenDismissed && !dismissed) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [dismissed]);

  const handleDismiss = () => {
    setShowWarning(false);
    setDismissed(true);
    // Remember dismissal for this session
    sessionStorage.setItem('mobile-warning-dismissed', 'true');
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(251, 191, 36, 0.3) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Warning content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div className="absolute inset-0 w-8 h-8 bg-yellow-400/30 rounded-full animate-ping"></div>
              </div>
              <h2 className="text-xl font-bold text-yellow-900">
                Mobile Device Detected
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-yellow-700 hover:text-yellow-900 hover:bg-yellow-200/50 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Warning message */}
          <div className="space-y-4">
            <div className="bg-yellow-100/80 border border-yellow-300 rounded-lg p-4">
              <p className="text-yellow-900 font-medium mb-2">
                ⚠️ This is a React Component Viewer & Editor
              </p>
              <p className="text-yellow-800 text-sm leading-relaxed">
                ReactRun AI is designed for desktop browsers with larger screens. 
                For the best experience and full functionality, please switch to:
              </p>
            </div>

            {/* Recommendations */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-100/50 to-amber-100/50 rounded-lg p-4 border border-yellow-200">
              <Monitor className="w-6 h-6 text-yellow-700 flex-shrink-0" />
              <div>
                <p className="font-semibold text-yellow-900 text-sm">Recommended:</p>
                <p className="text-yellow-800 text-xs">
                  Desktop browser • Chrome, Firefox, Safari • Min. 1024px width
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleDismiss}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue Anyway
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
