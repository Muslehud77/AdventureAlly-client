import { Label } from "../../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { ReactNode, useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";

import { sendImageToBB } from "../../utils/sendImageToBB";
import EditProductSkeleton from "../../components/Skeleton/EditProductSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProduct from "../../components/DeleteProduct/DeleteProduct";
import EditImageOfTheProduct from "./EditImageOfTheProduct";
import { TProduct } from "../AllProducts/AllProducts";
import updateProductFunc from "../../utils/updateProductFunc";
import RecoverProduct from "../../components/RecoverProduct/RecoverProduct";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetSingleProductQuery(id);
  const [imageData, setImageData] = useState<File[] | []>([]);
  const [imageLinks, setImageLinks] = useState<string[] | []>([]);
  const [mainImage, setMainImage] = useState<File | string>("");
  const [mainImageType, setMainImageType] = useState<"link" | "file">("link");
  const product = data?.data as TProduct;

  // console.log(product);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const categories = ["Backpack", "Cloth", "Footwear", "Kitchen", "Tents"];

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setImageLinks(product?.images as string[]);
      setMainImage((product?.images as string[])[0]);
    }
  }, [product]);

  useEffect(() => {
    if (mainImage) {
      if (mainImage instanceof File) {
        setMainImageType("file");
      } else {
        setMainImageType("link");
      }
    }
  }, [mainImage]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const { name, details, price, quantity, category } = data;

    let images = [...imageLinks] as string[];

    if (imageData.length) {
      const links = await sendImageToBB(imageData);
      if (mainImageType === "file") {
        images = [...links, ...images];
        setImageLinks(images);
      } else {
        images = [...images, ...links];
        setImageLinks(images);
      }
    }

    const productData = {
      name,
      price: Number(price),
      stock: Number(quantity),
      description: details,

      images,
      category,
    };

    const res = await updateProductFunc({
      _id: id as string,
      data: productData,
      isUpdating: true,
      updateProduct,
    });

   

    if (res) {
      navigate("/dashboard/manage-products");
      setImageData([]);
      setImageLinks([]);
    }
  };

  return (
    <div className="container mx-auto px-10 rounded-xl mb-10 py-8 max-w-3xl text-foreground bg-secondary ">
      <h1 className="text-3xl font-bold mb-6 ">Edit Product</h1>
      {isFetching || isLoading ? (
        <EditProductSkeleton />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              defaultValue={product?.category}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message as ReactNode}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
            className=""
              id="name"
              type="text"
              defaultValue={product?.name}
              placeholder="Enter product name"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message as ReactNode}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">Product Details</Label>
            <Textarea
              id="details"
              rows={4}
              defaultValue={product.description}
              placeholder="Describe the product"
              {...register("details", {
                required: "Product details are required",
              })}
            />
            {errors.details && (
              <p className="text-red-500 text-sm mt-1">
                {errors.details.message as ReactNode}
              </p>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
              className=""
                id="price"
                type="number"
                defaultValue={product.price}
                placeholder="Enter price"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message as ReactNode}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
              className=""
                id="quantity"
                type="number"
                defaultValue={product.stock}
                placeholder="Enter quantity"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 0, message: "Quantity cannot be negative" },
                  validate: (value) =>
                    Number.isInteger(parseFloat(value)) ||
                    "Quantity must be an integer",
                })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.quantity?.message as ReactNode}
                </p>
              )}
            </div>
          </div>
          <EditImageOfTheProduct
            imageData={imageData}
            setImageData={setImageData}
            imageLinks={imageLinks}
            setImageLinks={setImageLinks}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />
          <div className="flex justify-end gap-2">
            {product.isDeleted ? (
              <RecoverProduct _id={product._id as string} />
            ) : (
              <DeleteProduct id={id as string} />
            )}

            <Button type="submit">Save Product</Button>
          </div>
        </form>
      )}
    </div>
  );
}
