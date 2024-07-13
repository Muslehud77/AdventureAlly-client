import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { useChangeStatusMutation } from "../../redux/features/cart/cartApi";

type ManageOrderDropDownProps = {
  _id: string;
  status: string;
};

const ManageOrderDropDown = ({ _id, status }: ManageOrderDropDownProps) => {
  const [changeStatus] = useChangeStatusMutation();

  const handleStatusChange = async (_id: string, status: string) => {
   await changeStatus({_id,status})
  };

  return (
    <DropdownMenu>
      {status === "delivered" ? (
        <IoCheckmarkDoneCircleOutline className="size-8 text-green-500" />
      ) : (
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="outline">
            <IoIosArrowDown className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent align="end">
        {status === "pending" ? (
          <>
            {" "}
            <DropdownMenuItem
              onSelect={() => handleStatusChange(_id, "delivering")}
            >
              Mark as Delivering
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleStatusChange(_id, "delivered")}
            >
              Mark as Delivered
            </DropdownMenuItem>
          </>
        ) : status === "delivering" ? (
          <>
            {" "}
            <DropdownMenuItem
              onSelect={() => handleStatusChange(_id, "delivered")}
            >
              Mark as Delivered
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ManageOrderDropDown;
