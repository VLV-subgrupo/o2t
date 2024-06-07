type Prop = {
  className: string;
  hover: boolean;
}

function DashBoardIcon({className, hover = false} : Prop) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className= {className}
    >
      <rect x={0} width={10} height={10} rx={2} fill={hover ? "#2A2A2A" : "#717171"} />
      <rect x={14} width={10} height={10} rx={2} fill="#717171" />
      <rect x={0} y={14} width={10} height={10} rx={2} fill="#717171" />
      <rect x={14} y={14} width={10} height={10} rx={2} fill={hover ? "#2A2A2A" : "#717171"} />
    </svg>
  )
}

export default DashBoardIcon
