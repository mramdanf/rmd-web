import { useProduct } from "@/store/productContext";
import { useCallback } from "react"

function SearchProduct() {
  let searchTimeout: ReturnType<typeof setTimeout>
  const { setFilterText } = useProduct()
  function handleOnSearch(e: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      setFilterText(e.target.value)
    }, 1000)
  }
  return (
    <div className="max-w-6xl mx-auto pt-5">
      <span className="mr-2 ml-4">Search product name:</span>
      <input 
        type="text"
        className="border border-palette-lighter"
        onChange={handleOnSearch}
      />
    </div>
  )
}

export default SearchProduct