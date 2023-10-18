import { BiSearch, BiUser } from "react-icons/bi"
import { LiaShoppingCartSolid } from "react-icons/lia"
import { HiOutlineHome } from "react-icons/hi"
export const navLinks = [
    {name:"Home",link:"/",icon:<HiOutlineHome size={20} />},
    {name:"Cart",link:"/user/profile/cart",icon:<LiaShoppingCartSolid size={18} />},
    {name:"Profile",link:"/user/profile",icon:<BiUser size={18} />},
]