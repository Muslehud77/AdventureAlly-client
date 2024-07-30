import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { useGetDeletedProductsQuery } from "../../redux/features/product/productApi";
import SkeletonTable from "../../components/Skeleton/SkeletonTable";
import { TProduct } from "../AllProducts/AllProducts";
import { Link } from "react-router-dom";
import RecoverProduct from "../../components/RecoverProduct/RecoverProduct";
import defaultImg from '../../assets/default.webp'
import { Helmet } from "react-helmet-async";


export default function DeletedProducts() {
  const { data, isLoading, isError } = useGetDeletedProductsQuery(undefined);

  return (
    <Card className="!bg-secondary">
      <Helmet>
        <title>Dashboard | Deleted Products</title>
      </Helmet>
      <CardHeader>
        <CardTitle className="text-2xl">Deleted Products</CardTitle>
        <CardDescription>
          View and recover your deleted products.
        </CardDescription>
      </CardHeader>
      {isLoading || isError || !data ? (
        <SkeletonTable />
      ) : (
        <CardContent className="p-0">
          {data?.data.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-lg font-medium">No deleted products found.</p>
            </div>
          ) : (
            <Table className="bg-background ">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sale</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((product: TProduct) => (
                  <TableRow key={product._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={
                          product.images?.length
                            ? product?.images[0]
                            : defaultImg
                        }
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-medium">
                      {product.stock}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.sales}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Link to={`/product-details/${product._id}`}>
                        <Button variant="default">View</Button>
                      </Link>
                      <RecoverProduct _id={product._id as string} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      )}
    </Card>
  );
}
