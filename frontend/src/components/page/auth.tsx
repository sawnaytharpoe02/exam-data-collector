import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCircle2, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAdminLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleGuestLogin = () => {
    console.log("Guest login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <CardTitle className="text-2xl font-bold text-center">
              Exam Data Collector
            </CardTitle>
          </div>
          <p className="text-center text-sm text-gray-500">
            Welcome back! Please sign in to continue.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleAdminLogin}>
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Admin Login"
            )}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase text-center">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Link to="/">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGuestLogin}>
              <UserCircle2 className="mr-2 h-4 w-4" />
              Continue as Guest
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <img
        src="/data_collector_guy.png"
        alt="Data Collector Guy"
        className="absolute bottom-3 right-4 h-48 w-48 animate-bounce"
      />
    </div>
  );
};

export default AuthPage;
