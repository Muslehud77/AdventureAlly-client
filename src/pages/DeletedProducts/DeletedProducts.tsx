
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
import {  useGetDeletedProductsQuery } from "../../redux/features/product/productApi";
import SkeletonTable from "../../components/Skeleton/SkeletonTable";
import { TProduct } from "../AllProducts/AllProducts";
import { Link } from "react-router-dom";
import RecoverProduct from "../../components/RecoverProduct/RecoverProduct";

export default function DeletedProducts() {
  const deletedProducts = [
    {
      id: 1,
      image: "/placeholder.svg",
      name: "Laser Lemonade Machine",
      category: "Kitchen Appliances",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      name: "Hypernova Headphones",
      category: "Electronics",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      name: "AeroGlow Desk Lamp",
      category: "Lighting",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      name: "TechTonic Energy Drink",
      category: "Beverages",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      name: "Gamer Gear Pro Controller",
      category: "Gaming",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      name: "Luminous VR Headset",
      category: "Electronics",
    },
  ];

  const {data,isLoading,isFetching} = useGetDeletedProductsQuery()


  return (
    <Card>
      <CardHeader>
        <CardTitle>Deleted Products</CardTitle>
        <CardDescription>
          View and recover your deleted products.
        </CardDescription>
      </CardHeader>
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
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
                      src={(product.images as string[])[0]}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link to={`/product-details/${product._id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>

                      <RecoverProduct _id={product._id as string} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
}
