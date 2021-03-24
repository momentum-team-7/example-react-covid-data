const ButtonLink = ({ onClick, text, className = '' }) => (
  <button
    className={`pa0 bw0 bg-white blue pointer underline-hover ${className}`}
    onClick={onClick}
  >
    {text}
  </button>
)

export default ButtonLink
