import { UserIcon } from "@heroicons/react/16/solid";
import { LockClosedIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiMailLine } from "react-icons/ri";
import { Input } from "../../components/ui/input";
import { sendImageToBB } from "../../utils/sendImageToBB";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [imageData, setImageData] = useState<File | null>(null);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    console.log(data);

    const imageUrl = await sendImageToBB(imageData as File);

    console.log(imageUrl);

    // Handle registration logic here
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageData(file);
    } else {
      setImageData(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="relative">
            <RiMailLine className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
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
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              multiple
              className="w-full py-2 h-11"
              {...register("image", { required: "Image is required" })}
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
          {imageData && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(imageData)}
                alt="Selected"
                className="w-32 h-32 object-cover mx-auto mt-4 rounded-full"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
