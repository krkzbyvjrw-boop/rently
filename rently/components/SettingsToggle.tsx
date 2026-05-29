type SettingsToggleProps = {
  on: boolean
  onChange: (value: boolean) => void
  ariaLabel: string
}

export function SettingsToggle({ on, onChange, ariaLabel }: SettingsToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="relative w-12 h-6 rounded-full transition-all shrink-0"
      style={{ background: on ? 'var(--accent)' : 'var(--border)' }}
      aria-pressed={on}
      aria-label={ariaLabel}
    >
      <div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
        style={{ left: on ? '26px' : '2px' }}
      />
    </button>
  )
}
