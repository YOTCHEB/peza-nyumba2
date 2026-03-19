import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HiOutlineDownload } from "react-icons/hi";

export function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW: (swUrl, r) => {
      if (r?.active?.state === "activated") {
        console.log("Service Worker active");
      }
    },
    onRegisterError: (error) => {
      console.error("Service Worker registration error:", error);
    },
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after 30 seconds or on second visit
      const hasInstalled = localStorage.getItem("pwa-installed");
      const visitCount = parseInt(localStorage.getItem("visit-count") || "0", 10);
      
      if (!hasInstalled && visitCount >= 1) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 5000);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Track visits
    const visitCount = parseInt(localStorage.getItem("visit-count") || "0", 10);
    localStorage.setItem("visit-count", String(visitCount + 1));

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      localStorage.setItem("pwa-installed", "true");
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-dismissed", "true");
  };

  const handleRefresh = () => {
    updateServiceWorker(true);
    window.location.reload();
  };

  // Show update prompt
  if (needRefresh) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Available</DialogTitle>
            <DialogDescription>
              A new version of Peza Nyumba is available. Refresh to get the latest features.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => updateServiceWorker(false)}>
              Later
            </Button>
            <Button onClick={handleRefresh}>
              Refresh
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Show install prompt
  if (showPrompt && deferredPrompt) {
    return (
      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HiOutlineDownload className="text-primary" />
              Install Peza Nyumba
            </DialogTitle>
            <DialogDescription>
              Install our app for quick access to rental listings. Get a native app experience right from your browser.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleDismiss}>
              Not Now
            </Button>
            <Button onClick={handleInstall}>
              <HiOutlineDownload className="mr-2" />
              Install
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
