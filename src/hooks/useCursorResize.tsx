import { controlSize } from "../redux/features/cursor/cursorSlice";
import { useAppDispatch } from "../redux/hooks";

const useCursorResize = () => {
    const dispatch = useAppDispatch();

      const mouseEnterCursorResize = () => {
        dispatch(controlSize(true));
      };
      const mouseLeaveCursorResize = () => {
        dispatch(controlSize(false));
      };
  


  return { mouseEnterCursorResize, mouseLeaveCursorResize };
};

export default useCursorResize;