type Prop = {
    className: string;
    hover: boolean;
}

function SvgComponent({className, hover = false} : Prop) {
  return (
    <svg
      width={26}
      height={22}
      viewBox="0 0 26 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className= {className}
    >
      <path
        d="M23.313 2.378a6.416 6.416 0 00-9.076 0L13 3.615l-1.237-1.237a6.418 6.418 0 10-9.077 9.077l1.237 1.237L13 21.768l9.076-9.076 1.237-1.237a6.417 6.417 0 000-9.077z"
        fill={hover ? "#D9352B" : "#717171"}
      />
    </svg>
  )
}

export default SvgComponent
