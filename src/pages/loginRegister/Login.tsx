/* eslint-disable @typescript-eslint/no-explicit-any */
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../redux/hooks";
import { signIn } from "../../redux/features/auth/authSlice";
import { Button } from "../../components/ui/button";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: "johndoe@example.com", password: "password123" },
  });



  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (loginData) => {
    setError("");
    toast.promise(login(loginData), {
      loading: "Logging in...",
      success: (res : any) => {
        if (res.error) {
          throw new Error(res?.error?.data?.message);
        }
        dispatch(signIn({ user: res?.data?.data, token: res?.data?.token }));
        
        return (
          <p className="font-bold text-gray-500">
            {res?.data?.data?.name} Welcome!
          </p>
        );
      },
      error: (err) => {
        setError(err.message)
        return <b>{err.message}</b>;
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-h-96 max-w-md transition-all duration-200">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <MdMailOutline className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <LockClosedIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("password", { required: "Password is required" })}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5 text-gray-400" />
              ) : (
                <FaEye className="w-5 h-5 text-gray-400" />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && (
            <p className="text-center text-red-500 font-semibold text-base">
              {error}
            </p>
          )}
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
           
            Sign In
          </Button>
          <div className="text-center">
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
