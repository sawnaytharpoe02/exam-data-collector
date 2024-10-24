import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="relative w-full h-64">
          <img
            src="/404.png"
            alt="404 Illustration"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground">
          We couldn't find the page you're looking for. It might have been moved
          or doesn't exist.
        </p>
        <Button asChild className="mt-8">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
