
const SkeletonCard = () => {
  return (
    <div className="flex flex-col gap-4 w-full mx-auto mb-11 flex-shrink-0 snap-center h-5/6">
    <div className="skeleton rounded w-full  aspect-[3/4]"></div>
    <div className="skeleton h-8 w-full rounded"></div>
  </div>
  )
}

export default SkeletonCard 