import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";
import { LoaderCircle, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceCollectRobot from "./service-collect-robot";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isExamerLoading, setIsExamerLoading] = useState<boolean>(false);

  const { mutate: login, isPending: isAdminPending, error } = useLogin();

  const handleAdminLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    login({ email, password });
  };

  const handleExamerLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsExamerLoading(true);
    try {
      // Simulate fetching data from backend (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/");
    } catch (error) {
      // error handling
    } finally {
      setIsExamerLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gradient-to-r from-pink-100 to-blue-100 p-5 md:p-0">
      <Card className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center flex-col">
          <div className="flex items-center justify-center space-x-2 mt-4 mb-2">
            <CardTitle className="text-2xl font-bold text-center">
              Exam Data Collector
            </CardTitle>
          </div>
          <p className="text-center text-sm text-gray-500 px-5">
            We offer comprehensive services designed to make your preparation
            journey smooth and successful, helping you confidently prepare for
            and ace your exam.
          </p>
        </div>
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
          <Button
            className="w-full"
            onClick={handleAdminLogin}
            disabled={isAdminPending || !email || !password}>
            {isAdminPending ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Logging In...</span>
              </>
            ) : (
              "Log In"
            )}
          </Button>
          {error && (
            <p className="text-sm text-destructive">Error: {error?.message}</p>
          )}

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
          <Button
            className="w-full"
            variant="outline"
            onClick={handleExamerLogin}
            disabled={isExamerLoading}>
            {isExamerLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Loading...</span>
              </>
            ) : (
              <>
                <UserCircle2 className="mr-2 h-4 w-4" />{" "}
                <span>Continue as examer</span>
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      <ServiceCollectRobot />
    </div>
  );
};

export default AuthPage;
