'use client'

import { useLocale } from '@/app/LocaleProvider'
import { BIKE_TAGS } from '@/lib/bikes'
import { bikeTypeLabel as translateTag } from '@/lib/i18n'

type TagPickerProps = {
  selected: string[]
  onChange: (tags: string[]) => void
  hint?: string
}

export function TagPicker({ selected, onChange, hint }: TagPickerProps) {
  const { t, locale } = useLocale()
  const hintText = hint ?? t('tagPicker.hint')
  const toggle = (tag: string) => {
    onChange(
      selected.includes(tag) ? selected.filter(t => t !== tag) : [...selected, tag]
    )
  }

  return (
    <div>
      <p className="text-xs text-muted mb-2">{hintText}</p>
      <div className="flex flex-wrap gap-2">
        {BIKE_TAGS.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className="px-4 py-1.5 rounded-full text-sm border transition-opacity hover:opacity-90"
            style={
              selected.includes(tag)
                ? { background: 'var(--accent)', color: 'var(--bg)', borderColor: 'var(--accent)' }
                : { borderColor: 'var(--border)', color: 'var(--fg-muted)' }
            }
          >
            {translateTag(locale, tag)}
          </button>
        ))}
      </div>
    </div>
  )
}
