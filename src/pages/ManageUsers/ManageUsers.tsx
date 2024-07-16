
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";


import ManageUsersSkeleton from "../../components/Skeleton/ManageUserSkeleton";
import { useGetAllUsersQuery } from "../../redux/features/user/userApi";
import ManageUsersTable from "./ManageUsersTable";
export default function Component() {

  const {data,isLoading} = useGetAllUsersQuery(undefined)


  console.log(data);

const users = data?.data

  return (
    <>
      {isLoading  ? (
        <ManageUsersSkeleton />
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage all users on your platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ManageUsersTable users={users} />
          </CardContent>
        </Card>
      )}
    </>
  );
}


