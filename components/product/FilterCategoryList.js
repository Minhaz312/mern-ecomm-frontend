'use client'

export default function FilterCategoryList({handleGetSelectedCat}) {
    const category = [
        {id:"aeka43",name:"cat 1"},
        {id:"aeka43",name:"cat 1"},
        {id:"aeka43",name:"cat 1"},
        {id:"aeka43",name:"cat 1"},
        {id:"aeka43",name:"cat 1"},
        {id:"aeka43",name:"cat 1"},
      ]  
    const handleFilterByCategory = cat => {
        console.log("cat: ",cat)
    }
    return category.map((cat,i)=><div key={i} className="flex items-center mb-2 gap-x-2">
        <input type="checkbox" className="h-4 w-4" onChange={handleFilterByCategory.bind(this,cat)} />
        <p className="text-md text-slate-500">{cat.name}</p>
    </div>)
}