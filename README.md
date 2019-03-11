# Iteam Hooks

[![npm version](https://badge.fury.io/js/%40iteam%2Fhooks.svg)](https://badge.fury.io/js/%40iteam%2Fhooks)
[![Build Status](https://travis-ci.com/Iteam1337/hooks.svg?branch=master)](https://travis-ci.com/Iteam1337/hooks)

This is a collection of hooks that we can reuse for any project that needs them. It's also a source of use cases of [React Hooks](https://reactjs.org/docs/hooks-reference.html) and how to test them using [react-testing-library](https://github.com/kentcdodds/react-testing-library/).

## Installation

```bash
npm install @iteam/hooks
```

## Available Hooks

- [useToggle](#useToggle)
- [useQueryParam](#useQueryParam)
- [useDebounce](#useDebounce)
- [useLocalStorage](#useLocalStorage)
- [useStorage](#useStorage)

----

### [useToggle](#useToggle)

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

### [useQueryParam](#useQueryParam)

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

### [useDebounce](#useDebounce)

Debounce the updating of a value

```js
useDebounce<ValueType>(value: ValueType, duration: number): ValueType
```

#### Example

```js
import React from 'react'
import { useDebounce } from '@iteam/hooks'

export const Debounced = () => {
  const [inputValue, setInputValue] = React.useState('')
  const debouncedValue = useDebounce(inputValue, 300)

  const handleChange = e => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <div>
      <label htmlFor="test-input">Best field ever</label>
      <input id="test-input" onChange={handleChange} value={debouncedValue} />
      {debouncedValue}
    </div>
  )
}
```

### [useLocalStorage](#useLocalStorage)

Get and set values in `localStorage`. Uses `useStorage` under the hood.

```js
useLocalStorage(key: string, initialValue?: any): [string, (newValue: string) => void]
```

#### Example

```js
import React from 'react'
import { useLocalStorage } from '@iteam/hooks'

export const Storage = ({ initialValue }) => {
  const [value, setValue] = useLocalStorage('storedValue', initialValue)

  return (
    <div>
      {value ? value : 'no value ;('}
      <label htmlFor="store">Update store value</label>
      <input
        id="store"
        onChange={e => setValue(e.currentTarget.value)}
        type="text"
        value={value}
      />
    </div>
  )
}
```

### [useStorage](#useStorage)

Get and set values in any store with a `getItem` or `setItem`. Defaults to
`localStorage`. Useful if you want to add something to for example `sessionStorage`.

```js
useStorage(key: string, options?: { initialValue?: any, store?: Storage }): [string, (newValue: string) => void]
```

#### Example

```js
import React from 'react'
import { useStorage } from '@iteam/hooks'

export const Storage = ({ initialValue }) => {
  const [value, setValue] = useStorage('storedValue', {
    initialValue,
    store: sessionStorage,
  })

  return (
    <div>
      {value ? value : 'no value ;('}
      <label htmlFor="store">Update store value</label>
      <input
        id="store"
        onChange={e => setValue(e.currentTarget.value)}
        type="text"
        value={value}
      />
    </div>
  )
}
```
