import { useProduct } from "@/store/productContext"

export const HEIGHEST_RATING = 'HEIGHEST_RATING'
export const HEIGHEST_PRICE = 'HEIGHEST_PRICE'
export const LOWEST_PRICE = 'LOWEST_PRICE'

export const SORT_OPTIONS: { [key: string]: string } = {
  [HEIGHEST_PRICE]: 'Heighest price',
  [LOWEST_PRICE]: 'Lowest price',
}

function SortProduct() {
  const { setSortOption } = useProduct()
  function handleSortOptionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortOption(e.target.value)
  }
  return (
    <div>
      <span className="mr-2">Sort by:</span>
      <select className="border border-palette-lighter" onChange={handleSortOptionChange}>
        <option value=""></option>
        {Object.keys(SORT_OPTIONS).map(opt => (
          <option key={opt} value={opt}>{SORT_OPTIONS[opt]}</option>
        ))}
      </select>
    </div>
  )
}

export default SortProduct