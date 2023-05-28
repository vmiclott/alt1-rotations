import './svg.css'

export type SvgProps = {
  icon: React.ReactElement
  tooltipText: string
  className?: string
}

export const Svg = ({ icon, tooltipText, className }: SvgProps) => (
  <div className={`tooltip ${className}`}>
    <span className="tooltiptext">{tooltipText}</span>
    {icon}
  </div>
)
