
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Label } from "../../components/ui/label";

import { useUser } from "../../hooks/useUser";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";

export default function Profile() {

  const {user} = useUser()


  return (
    <div className="flex flex-col items-center justify-center  bg-muted max-h-fit md:max-h-[90vh]">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center gap-4 bg-gray-800 text-gray-100 py-8 rounded-t-lg">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.image} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground lowercase">
              @{user?.name.split(" ").join("")}
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <p>{user?.email}</p>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="address">Address</Label>
            <p>{user?.address ? user.address : "N/A"}</p>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="phone">Phone</Label>
            <p>{user?.phone ? user.phone : "N/A"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4">
          <EditProfileForm />
        </CardFooter>
      </Card>
    </div>
  );
}



