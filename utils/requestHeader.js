import { AUTH_TOKEN_NAME } from "./constants"

export default function requestHeader(type="json",options) {
  if(type==="json"){
    return {
        ...options,
        headers:{
            "Content-Type":"application/json",
            "Authentication":localStorage.getItem(AUTH_TOKEN_NAME)
        }
    }
  }else if(type==="form-data"){
    return {
        ...options,
        headers:{
            "Content-Type":"multipart/form-data",
            "Authentication":localStorage.getItem(AUTH_TOKEN_NAME)
        }
    }
  }
}
