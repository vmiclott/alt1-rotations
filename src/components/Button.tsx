import React from 'react'
import './button.css'

type ButtonProps = {
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children }, ref) => {
    return (
      <button
        ref={ref}
        className={`button${className ? ` ${className}` : ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
)
