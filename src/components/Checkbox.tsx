import './checkbox.css'

type CheckboxProps = {
  labelText: string
  setChecked: (checked: boolean) => void
  checked: boolean
}

export const Checkbox = ({ labelText, setChecked, checked }: CheckboxProps) => {
  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        {labelText}
      </label>
    </div>
  )
}
