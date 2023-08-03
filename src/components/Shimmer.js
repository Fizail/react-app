const Shimmer = () => {
    return   <div className="p-11 m-11 bg-slate-300 ">
    {Array(20).fill("").map((e , index)=>(<div key ={index} className="w-[200px] h-[300px ] bg-gray-400 flex-wrap shadow-xl border-red-200"></div>))}
   </div>
}

export default Shimmer;