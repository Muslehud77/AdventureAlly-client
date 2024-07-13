import { useAppSelector } from "../redux/hooks"

export const useCart = ()=>{
    const cart = useAppSelector(state=> state.cart)

    return cart
}