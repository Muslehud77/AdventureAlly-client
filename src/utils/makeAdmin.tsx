import toast from "react-hot-toast";

type TPromoteToAdmin = (arg:{_id:string,password:string})=>Promise<any>



export const makeAdmin = async (_id: string, promoteToAdmin: TPromoteToAdmin) => {
 
 
    toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {`Are you sure you want to ${
                  status === "in-progress" ? "Unblock" : "Block"
                } the user?`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              toast.promise(promoteToAdmin({ _id, status }), {
                loading: "Saving...",
                success: <p>Status updated!</p>,
                error: <p>Could not update the status!</p>,
              });
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    { duration: 1000000 }
  );
};
