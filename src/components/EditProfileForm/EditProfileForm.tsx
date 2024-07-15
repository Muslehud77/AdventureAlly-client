import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useUser } from "../../hooks/useUser";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TUser } from "../../redux/features/auth/authSlice";

type ProfileFormValues = {
  username?: string;
  address?: string;
  phone?: string;
  image?: FileList;
};

const EditProfileForm = () => {
  const initialRender = useRef(true);
  const { user } = useUser();
  const [imageData, setImageData] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormValues>();


  const watchedFields = watch(["username", "address", "phone"]);

  useEffect(() => {
    

    console.log(watchedFields);
    const [username, address, phone] = watchedFields;
    if (
      username !== user?.name ||
      address !== user?.address ||
      phone !== user?.phone ||
      imageData
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [watchedFields, imageData]);


  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log(data);
    // Handle form submission here

    const updatedDataForUser = {} as Partial<TUser>;

    if (data.username) {
      updatedDataForUser["name"] = data.username;
    }

    if (data.address) {
      updatedDataForUser["address"] = data.address;
    }

    if (data.phone) {
      updatedDataForUser["phone"] = data.phone;
    }

    if (imageLink) {
      updatedDataForUser["image"] = imageLink;
    }

    console.log(updatedDataForUser);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageData(file);
      setSubmitDisabled(false);
    } else {
      setImageData(null);
      setSubmitDisabled(true);
    }
  };


  const handleSubmitter = ()=>{
    
  }

  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue={user?.name}
              className="col-span-3"
              {...register("username")}
            />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Textarea
              id="address"
              defaultValue={user?.address}
              className="col-span-3"
              {...register("address")}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              defaultValue={user?.phone}
              className="col-span-3"
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must be exactly 11 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="col-span-4 text-right text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="avatar" className="text-right">
              Avatar
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    imageData
                      ? URL.createObjectURL(imageData as Blob)
                      : user?.image
                  }
                />
              </Avatar>
              <Button variant="outline" size="sm">
                <Label htmlFor="profile-image" className="cursor-pointer">
                  Change
                </Label>
              </Button>
              <Input
                type="file"
                accept="image/*"
                id="profile-image"
                className="hidden h-1"
                {...register("image")}
                onChange={handleImageChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={submitDisabled} type="submit" className="ml-auto">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileForm;
