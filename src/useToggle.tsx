import { useState } from 'react'

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [isToggled, setToggle] = useState(initialValue)

  const toggle = () => setToggle(!isToggled)

  return [isToggled, toggle]
}
