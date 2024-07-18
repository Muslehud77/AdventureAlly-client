import { RiDeleteBin6Line } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";


type EditImageOfTheProductProps = {
  imageData: File[] | [];
  setImageData: (arr: File[]) => void;
  imageLinks: string[] | [];
  setImageLinks: (arr: string[]) => void;
  setMainImage: (arg: File | string) => void;
  mainImage: File | string;

};

const EditImageOfTheProduct = ({
  imageData,
  setImageData,
  imageLinks,
  setImageLinks,
  setMainImage,
  mainImage,
  
}: EditImageOfTheProductProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (imageData.length) {
        const fileArray = Array.from(files);
        setImageData([...fileArray, ...imageData]);
      } else {
        const fileArray = Array.from(files);
        setImageData(fileArray);
      }
    } else {
      setImageData([]);
    }
  };

  

  const handleDeleteImage = (image: File) => {
    if (image === mainImage) {
      setMainImage(imageData[1] || imageLinks[0]);
    }
    const filtered = imageData?.filter((img) => img !== image);
    setImageData(filtered as File[]);
  };

  const handleRemoveFromLinks = (image: string) => {
    if (image === mainImage) {
      setMainImage(imageLinks[1] || "");
    }
    setImageLinks(imageLinks.filter((i) => i !== image));
  };

  const handleMainImage = (image: File | string) => {
    if (image instanceof File) {
      setMainImage(image);
      const filtered = imageData?.filter((img) => img !== image);
      setImageData([image, ...filtered]);
    } else {
      setMainImage(image);
      const filtered = imageLinks.filter((img) => img !== image);
      setImageLinks([image, ...filtered]);
    }
  };

  return (
    <div className="grid gap-2">
      <Label>Product Image</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Label
          htmlFor="product-image"
          className="aspect-square bg-muted rounded-md flex items-center justify-center border-2 border-dashed border-muted-foreground hover:border-gray-500 cursor-pointer transition-colors"
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
                  className="hover:text-gray-500 animate-pulse cursor-pointer duration-900"
                  onClick={() => handleDeleteImage(image)}
                />
              </div>
              {image === mainImage && (
                <div className="absolute top-0 text-sm p-1 text-gray-100 bg-black/50 rounded">
                  <span>Main</span>
                </div>
              )}
              {image !== mainImage && (
                <div onClick={() => handleMainImage(image)} className="group">
                  <div className="group-hover:opacity-100 text-center transition-all duration-300 opacity-0 absolute w-full top-0 text-sm p-1 text-gray-200 bg-black/50 cursor-pointer">
                    <span>Make it main image</span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <></>
        )}

        {imageLinks ? (
          imageLinks.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt="Product image"
                width={150}
                height={150}
                className="aspect-square object-cover rounded-md"
              />
              <div className="absolute w-full h-full inset-0 flex justify-end items-end p-3 text-3xl text-black">
                <RiDeleteBin6Line
                  className="hover:text-gray-500 animate-pulse cursor-pointer duration-900"
                  onClick={() => handleRemoveFromLinks(image)}
                />
              </div>
            
              {image === mainImage && (
                <div className="absolute top-0 text-sm p-1 text-gray-100 bg-black/50 rounded">
                  <span>Main</span>
                </div>
              )}
              {image !== mainImage && (
                <div onClick={() => handleMainImage(image)} className="group">
                  <div className="group-hover:opacity-100 text-center transition-all duration-300 opacity-0 absolute w-full top-0 text-sm p-1 text-gray-200 bg-black/50 cursor-pointer">
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
  );
};

export default EditImageOfTheProduct;
