import { AUTH_TOKEN_NAME } from "./constants"

export default function isLoggedIn() {
    if(localStorage.getItem(AUTH_TOKEN_NAME)===null){
        return false
    }else return true
}
