type PricePropsType = {
  val: number
  currency: string
}

function Price({ val, currency }: PricePropsType) {
  return (
    <p className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
        rounded-tl-sm triangle">
      {`${currency} ${val.toLocaleString()}`}
    </p>
  )
}

export default Price