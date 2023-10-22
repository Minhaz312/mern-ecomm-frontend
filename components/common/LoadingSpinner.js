import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <Image src="/images/loading-spinner.svg" height={70} width={70} alt="loading..." />
  )
}
