import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useLogin } from "@/hooks/useLogin";
import { authSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { LoaderCircle, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import ServiceCollectRobot from "../service-collect-robot";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: login, isPending: authPending } = useLogin();

  const [isExamerLoading, setIsExamerLoading] = useState<boolean>(false);


  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    login(payload, {
      onError: (error: any) => {
        setErrorMsg(error.response?.data?.error || "Invalid credentials.");
      },
    });
  };

  const handleExamerLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-md">
            <div className="mb-6 flex items-center justify-center flex-col">
              <div className="flex items-center justify-center space-x-2 mt-4 mb-2">
                <CardTitle className="text-2xl font-bold text-center">
                  Exam Data Collector
                </CardTitle>
              </div>
              <p className="text-center text-sm text-gray-500 px-5">
                We offer comprehensive services designed to make your
                preparation journey smooth and successful, helping you
                confidently prepare for and ace your exam.
              </p>
            </div>
            <CardContent className="space-y-4">
              {errorMsg && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <p>{errorMsg}</p>
                </div>
              )}

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="james@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={authPending}>
                {authPending ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}
                    <span>Logging In...</span>
                  </>
                ) : (
                  "Log In"
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
        </form>
      </Form>
      <ServiceCollectRobot />
    </div>
  );
};

export default LoginPage;
