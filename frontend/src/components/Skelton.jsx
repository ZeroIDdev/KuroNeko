/* eslint-disable no-unused-vars */
import SkeletonCard from "./SkeletonCard"
const Skelton = () => {
    const array = '123456'.split('')
  return (
    <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 auto-cols-fr grid-flow-row w-full">
        {array.map(e=><SkeletonCard key={e}/>)}
    </div>
  )
}

export default Skelton