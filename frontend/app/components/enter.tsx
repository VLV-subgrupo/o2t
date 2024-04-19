type Prop = {
    className: string
}

function EnterSvg({className}:Prop) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-1/2"
    >
      <path
        d="M21 4a1 1 0 01.993.883L22 5v6.5a3.5 3.5 0 01-3.308 3.495L18.5 15H5.415l3.292 3.293a1 1 0 01.083 1.32l-.083.094a1 1 0 01-1.32.083l-.094-.083-5-5a1.008 1.008 0 01-.097-.112l-.071-.11-.054-.114-.035-.105-.025-.118-.007-.058L2 14l.003-.075.017-.126.03-.111.044-.111.052-.098.064-.092.083-.094 5-5a1 1 0 011.497 1.32l-.083.094L5.415 13H18.5a1.5 1.5 0 001.493-1.356L20 11.5V5a1 1 0 011-1z"
        className={className}
      />
    </svg>
  )
}

export default EnterSvg