import './svg.css'

export type SvgProps = {
  icon: React.ReactElement
  tooltipText: string
  className?: string
}

export const Svg = ({ icon, tooltipText, className }: SvgProps) => (
  <div className={`svg ${className}`}>
    <span className="svg__tooltip">{tooltipText}</span>
    <div className="svg__icon">{icon}</div>
  </div>
)
