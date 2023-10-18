import { BiChevronDown } from "react-icons/bi";
import apiUrl from "./../../app/apiUrl"
import AdList from "./AdList";
import CategoryList from "./CategoryList";
import MobileCategory from "./MobileCategory";

export default async function Hero() {
    const catRes = await fetch(`${apiUrl}/category/get/all`);
    const adsListRes = await fetch(`${apiUrl}/ads/get/all`);
    const catJson = await catRes.json();
    const categoryList = catJson.categories
    const adsList = await adsListRes.json();
  return (
    <div className="overflow-hidden">
        <div className='grid grid-cols-12 gap-3 bg-white p-1.5 md:p-5 my-2 sm:my-3 rounded-xl md:rounded-md'>
            <div className='relative hidden md:block col-span-3'>
                <CategoryList categoryList={categoryList} />
            </div>
            <div className='col-span-12 md:col-span-9'>
                <AdList adsList={adsList.data} />
            </div>
        </div>
    </div>
  )
}

