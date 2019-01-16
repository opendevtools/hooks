# Iteam Hooks

This is a collection of hooks that we can reuse for any project that needs them. It's also a source of use cases of [React Hooks](https://reactjs.org/docs/hooks-reference.html) and how to test them using [react-testing-library](https://github.com/kentcdodds/react-testing-library/).

## Installation

```bash
npm install @iteam/hooks
```

## Features

### useToggle

Uses `useState` but returns a setter function that toggles the value.

```js
useToggle(initialValue: boolean): [boolean, () => void]
```

#### Example

```js
import React from 'react'
import { useToggle } from '@iteam/hooks'

export const ToggleComponent = () => {
  const [isAlive, toggleValue] = useToggle(false)

  return <button onClick={toggleValue}>{isAlive ? '🚀' : '😴'}</button>
}
```

### useQueryParam

Gets a value from a specified query param

```js
useQueryParam(param: string): string | string[]
```

#### Example

```js
import React from 'react'
import { useQueryParam } from '@iteam/hooks'

export const NeedsAParam = () => {
  const param = useQueryParam('sweetParam')

  return (
    <div>
      {typeof param === 'string'
        ? `That's a nice query param with the value ${param}`
        : `Woah! A bunch of params ${param.join(',')}`}
    </div>
  )
}
```
