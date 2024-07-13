import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

import { Badge } from "../ui/badge";

import { CardContent } from "../ui/card";

import { TUser } from "../../redux/features/auth/authSlice";
import ManageOrderDropDown from "./ManageOrderDropDown";

type ManageOrdersTableProps = {
  orders: {
    data: { _id: string; user: TUser; status: string; address?: string }[];
  };
};

const ManageOrdersTable = ({ orders }: ManageOrdersTableProps) => {
  const data = orders?.data;

  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="font-medium">{order?.user?.name}</div>
                </div>
              </TableCell>
              <TableCell>{order?.address}</TableCell>
              <TableCell>
                <Badge
                  className="capitalize"
                  variant={
                    order.status === "pending"
                      ? "outline"
                      : order.status === "delivering"
                      ? "secondary"
                      : "success"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <ManageOrderDropDown _id={order?._id} status={order?.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default ManageOrdersTable;
