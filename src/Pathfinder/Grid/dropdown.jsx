import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const algorithms = [
  {
    key: 'Dijkstras Algorithm',
    text: 'Dijkstras Algorithm',
    value: 'Dijkstras Algorithm',
  },
  {
    key: 'A* Algorithm',
    text: 'A* Algorithm',
    value: 'A* Algorithm',
  },
  {
    key: 'Best-First-Search Algorithm',
    text: 'Best-First-Search Algorithm',
    value: 'Best-First-Search Algorithm',
  }
]

export const DropdownExampleSelection = () => {
    return (
        <Dropdown
            placeholder='Pick an algorithm!'
            fluid
            selection
            options={algorithms}
            
        />
    )
}

