import * as React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import styles from './PlatformToggle.module.css'

export default function PlatformToggle({ filter, onFilter }) {
  const options = [
    { label: 'All', value: 'all' },
    { label: 'Mac', value: 'mac' },
    { label: 'Linux', value: 'linux' },
    { label: 'Windows', value: 'windows' },
  ]

  return (
    <ToggleGroup.Root
      type="single"
      className={styles.buttonGroup}
      value={filter}
      aria-label="Platform Toggle"
      onValueChange={selected => {
        if (selected) onFilter(selected)
      }}
    >
      {options.map(({ label, value }) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          className={filter === value ? styles.buttonSelected : styles.button}
        >
          {label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
