import { HugeiconsIcon } from '@hugeicons/react'
import type { ComponentProps } from 'react'

export function Icon({ strokeWidth = 1.85, ...props }: ComponentProps<typeof HugeiconsIcon>) {
  return <HugeiconsIcon strokeWidth={strokeWidth} {...props} />
}
