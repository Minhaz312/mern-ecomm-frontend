import LoadingSpinner from '@/components/common/LoadingSpinner'

export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoadingSpinner />
    </div>
  )
}
