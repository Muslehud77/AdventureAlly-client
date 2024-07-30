
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import { useGetAllCartsQuery } from "../../redux/features/cart/cartApi";
import SkeletonTable from "../../components/Skeleton/SkeletonTable";
import ManageOrdersTable from "../../components/ManageOrders/ManageOrdersTable";
import { Helmet } from "react-helmet-async";

export default function Component() {
  const { data: orders, isLoading, isError } = useGetAllCartsQuery(undefined);

  return (
    <Card className="!bg-secondary">
      <Helmet>
        <title>Dashboard | Manage Orders</title>
      </Helmet>
      <CardHeader>
        <CardTitle className="text-2xl">Orders</CardTitle>
        <CardDescription>
          Here you can manage your orders and update their status.
        </CardDescription>
      </CardHeader>

      {isLoading || isError || !orders ? (
        <SkeletonTable />
      ) : (
        <ManageOrdersTable orders={orders} />
      )}
    </Card>
  );
}



