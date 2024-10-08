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
import { ReactNode, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";
import { useForm, Controller } from "react-hook-form";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import toast from "react-hot-toast";
import { sendImageToBB } from "../../utils/sendImageToBB";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AddProduct() {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<File[] | []>([]);
  const [imageLinks, setImageLinks] = useState<string[] | []>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      if (imageData.length) {
        if (!mainImage) {
          setMainImage(fileArray[0]);
        }
        setImageData([...imageData, ...fileArray]);
      } else {
        setMainImage(fileArray[0]);
        setImageData(fileArray);
      }
    } else {
      setImageData([]);
    }
  };

  const handleDeleteImage = (image: File) => {
    const filtered = imageData?.filter((img) => img !== image);
    setImageData(filtered as File[]);
    if (filtered.length) {
      setMainImage(filtered[0]);
    }
  };

  const categories = ["Backpack", "Cloth", "Footwear", "Kitchen", "Tents"];

  const [createProduct] = useCreateProductMutation();

  const onSubmit = async (data: Record<string, unknown>) => {
    const { name, details, price, quantity, category } = data;

    let images = imageLinks as string[] | [];

    if (imageData.length && !imageLinks.length) {
      images = await sendImageToBB(imageData);

      setImageLinks(images);
    }

    const formData = {
      name,
      price: Number(price),
      stock: Number(quantity),
      description: details,
      ratings: 4,
      images,
      category,
    };

    await toast.promise(createProduct(formData), {
      loading: "Saving...",
      success: (res) => {
        if (res?.error) {
          throw new Error("Could not save!");
        }
        navigate("/dashboard/manage-products");
        return <p>{res.data.message}</p>;
      },
      error: <b>Could not save!</b>,
    });
  };

  const handleMainImage = (image: File) => {
    setMainImage(image);
    const filtered = imageData?.filter((img) => img !== image);
    setImageData([image, ...filtered] as File[]);
  };

  return (
    <div className="container mx-auto px-10 rounded-xl mb-10 py-8 max-w-3xl text-foreground bg-secondary">
      <Helmet>
        <title>Dashboard | Add Product</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            defaultValue=""
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
            id="name"
            type="text"
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
              id="price"
              type="number"
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
              id="quantity"
              type="number"
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
        <div className="grid gap-2">
          <Label>Product Image</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Label
              htmlFor="product-image"
              className="aspect-square bg-muted rounded-md flex items-center justify-center border-2 border-dashed border-muted-foreground hover:border-gray-500 cursor-pointer md:cursor-none md:cursor-none transition-colors"
            >
              <LuUpload className="w-6 h-6 text-muted-foreground" />
            </Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              id="product-image"
              className="hidden h-1"
              onChange={handleImageChange}
            />

            {imageData ? (
              imageData.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image as Blob)}
                    alt="Product image"
                    width={150}
                    height={150}
                    className="aspect-square object-cover rounded-md"
                  />

                  <div className="absolute w-full h-full inset-0 flex justify-end items-end p-3 text-3xl text-black">
                    <RiDeleteBin6Line
                      className="hover:text-gray-500 animate-pulse cursor-pointer md:cursor-none duration-900"
                      onClick={() => handleDeleteImage(image)}
                    />
                  </div>
                  {image === mainImage && (
                    <div className="absolute top-0 text-sm p-1 text-gray-100 bg-black/50 rounded">
                      <span>Main</span>
                    </div>
                  )}
                  {image !== mainImage && (
                    <div
                      onClick={() => handleMainImage(image)}
                      className="group"
                    >
                      <div className="group-hover:opacity-100 text-center transition-all duration-300 opacity-0 absolute w-full top-0 text-sm p-1 text-gray-200 bg-black/50 cursor-pointer md:cursor-none">
                        <span>Make it main image</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </div>
  );
}
