"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { AuthSocialButton } from "./AuthSocialButton";
import { Facebook, GithubIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(4, {
      message: "Email must be at least 4 characters.",
    })
    .max(50, {
      message: "Email must be at maximum 50 characters.",
    }),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters.",
    })
    .max(50, {
      message: "Password must be at maximum 50 characters.",
    }),
});
const registerFormSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Email must be at least 4 characters.",
    })
    .max(50, {
      message: "Email must be at maximum 50 characters.",
    }),
  email: z
    .string()
    .email()
    .min(4, {
      message: "Email must be at least 4 characters.",
    })
    .max(50, {
      message: "Email must be at maximum 50 characters.",
    }),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters.",
    })
    .max(50, {
      message: "Password must be at maximum 50 characters.",
    }),
});

export const AuthForm = () => {
  const router = useRouter();
  const session = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState("LOGIN");

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
      console.log(`authenticated`);
    }
  }, [session?.status, router]);

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmitLogin(values: z.infer<typeof loginFormSchema>) {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending information...", {
      duration: 100000,
    });
    setIsSubmitting(true);
    const promise = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    toast.dismiss(loadingToast);
    if (promise?.error) {
      toast.error(`${promise.error}`);
    }
    if (promise?.status === 500) {
      toast.error("Something went wrong");
    }

    if (promise?.status === 200) {
      toast.success("Signed in!");
    }
    setIsSubmitting(false);
  }

  async function onSubmitRegister(values: z.infer<typeof registerFormSchema>) {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending information...", {
      duration: 100000,
    });
    const promise = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(values),
    });
    toast.dismiss(loadingToast);
    const data = await promise.text();
    console.log(data);
    if (promise.status === 500) {
      toast.error(`Registration failed.`);
    }
    if (promise.status === 400) {
      toast.error(data);
    }
    if (promise?.status === 200) {
      // setPage("LOGIN");
      toast.success(`User is registered!`);
    }
    setIsSubmitting(false);
  }

  const socialSignIn = (social: string) => {
    setIsSubmitting(true);
    const promise = signIn(social, {
      redirect: false,
    });
    // toast.promise(promise, {
    //   loading: "Sending information...",
    //   success: (data) => {
    //     setIsSubmitting(false);
    //     if (data?.error) {
    //       return "Something went wrong";
    //     }
    //     if (data?.status === 200) {
    //       return "Logged in!";
    //     }
    //   },
    //   error: "Something went wrong!",
    // });
  };

  const togglePage = useCallback(() => {
    setIsSubmitting(true);
    if (page === "LOGIN") {
      setPage("REGISTER");
    } else {
      setPage("LOGIN");
    }
    setIsSubmitting(false);
  }, [page]);

  return (
    <>
      {page === "LOGIN" && (
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmitLogin)}
            className="space-y-4 w-full p-4"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="blue-ring"
                      type="email"
                      placeholder="Enter your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting}
              className="w-full bg-sky-500 hover:bg-sky-800"
              type="submit"
            >
              Sign in
            </Button>
          </form>
        </Form>
      )}
      {page === "REGISTER" && (
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmitRegister)}
            className="space-y-4 w-full p-4"
          >
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="blue-ring"
                      type="email"
                      placeholder="Enter your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting}
              className="w-full bg-sky-500 hover:bg-sky-800"
              type="submit"
            >
              Sign up
            </Button>
          </form>
        </Form>
      )}
      <div className="relative w-full flex justify-center items-center">
        <div className="absolute w-full border-t border-gray-500" />
        <span className="relative bg-white px-1 text-muted-foreground text-sm">
          Or continue with
        </span>
      </div>
      <div className="w-full flex justify-between items-center gap-x-3">
        <AuthSocialButton
          Icon={Facebook}
          onClick={() => socialSignIn("facebook")}
          disabled={isSubmitting}
        />
        <AuthSocialButton
          Icon={GithubIcon}
          onClick={() => socialSignIn("github")}
          disabled={isSubmitting}
        />
      </div>
      {page === "LOGIN" ? (
        <p className="text-muted-foreground">
          New to Messenger ?{" "}
          <span onClick={togglePage} className=" underline cursor-pointer">
            Create an account
          </span>
        </p>
      ) : (
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <span onClick={togglePage} className="underline cursor-pointer  ">
            Login
          </span>
        </p>
      )}
    </>
  );
};
