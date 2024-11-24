import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function AuthLoader({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onHydrate(() =>
      setIsHydrated(false)
    );
    const unsubFinish = useAuthStore.persist.onFinishHydration(() =>
      setIsHydrated(true)
    );

    // Initial hydration check
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsubscribe();
      unsubFinish();
    };
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return <>{children}</>;
}
