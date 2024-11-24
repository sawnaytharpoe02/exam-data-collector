import { useLoadingOverlay } from "@/store/loadingOverlayStore";
import { Loader2 } from "lucide-react";

export function LoadingOverlay() {
  const { isLoading } = useLoadingOverlay();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="rounded-md bg-primary p-4 text-primary-foreground shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </div>
  );
}
