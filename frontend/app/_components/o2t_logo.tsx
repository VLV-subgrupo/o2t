import { cn } from "../_lib/utils";

type Props = {
    className?: string
}

const Logo = ({className} : Props) => {
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 674 532"
      className={cn("w-8 fill-light",className)}
    >
      <path
        fillRule="evenodd"
        d="M0 0h360v31h-91v492.1H89V31H0V0zm404.1 8h180v492.1h89v31h-360v-31h91V8z"
      />
    </svg>
    )
}

export default Logo;

