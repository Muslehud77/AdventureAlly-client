import { TUser } from "../../redux/features/auth/authSlice";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/ui/tooltip";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { CiLock, CiUnlock } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

type ManageUsersTableProps = {
  users:TUser[]
};

const ManageUsersTable = ({users}:ManageUsersTableProps) => {


    

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        
        {users.map((user) => (
          <TableRow key={user?._id}>
            <TableCell>
              <Avatar className="w-10 h-10 border">
                <AvatarImage src={user?.image} className="object-cover" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{user?.name}</TableCell>
            <TableCell>{user?.phone ? user.phone : "N/A"}</TableCell>
            <TableCell>{user?.address ? user.address : "N/A"}</TableCell>
            <TableCell>
              <Badge
                variant={user.role==="admin" ? "default" : "outline"}
                className="capitalize"
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-green-500 text-green-50">
                Active
              </Badge>
            </TableCell>
            <TableCell>2023-01-01 12:00 AM</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" disabled>
                        <MdOutlineAdminPanelSettings className="h-4 w-4" />
                        <span className="sr-only">Make Admin</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Make Admin</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" disabled>
                        <CiLock className="h-4 w-4" />
                        <span className="sr-only">Block User</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Block User</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" disabled>
                        <CiUnlock className="h-4 w-4" />
                        <span className="sr-only">Block User</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Block User</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageUsersTable;