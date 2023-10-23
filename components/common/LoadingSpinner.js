import Image from "next/image";

export default function LoadingSpinner({size=70,light=false,className=""}) {
  if(light){
    return (
      <Image src="/images/white-loading-spinner.svg" className={className} height={size} width={size} alt="loading..." />
    )
  }else{
    return (
      <Image src="/images/loading-spinner.svg" className={className} height={size} width={size} alt="loading..." />
    )
  }
}
