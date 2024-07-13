/**
 * v0 by Vercel.
 * @see https://v0.dev/t/piX8carW9mF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
    <Card>
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

function DotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12.1" cy="12.1" r="1" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
