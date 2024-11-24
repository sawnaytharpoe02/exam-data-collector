import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorFallbackProps {
  error?: Error | null;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const errorMessage = error?.message || "An unexpected error occurred.";

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Alert variant="destructive" className="max-w-md w-full">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="mb-2">Oops! Something went wrong</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-4">{errorMessage}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => window.location.reload()}>
              Try again
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorFallback;
