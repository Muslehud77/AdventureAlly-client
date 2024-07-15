
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import { useGetAllCartsQuery } from "../../redux/features/cart/cartApi";
import SkeletonTable from "../../components/Skeleton/SkeletonTable";
import ManageOrdersTable from "../../components/ManageOrders/ManageOrdersTable";

export default function Component() {
  const { data: orders, isLoading } = useGetAllCartsQuery(undefined);

  return (
    <Card >
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          Here you can manage your orders and update their status.
        </CardDescription>
      </CardHeader>

      {isLoading ? <SkeletonTable /> : <ManageOrdersTable orders={orders} />}
    </Card>
  );
}



