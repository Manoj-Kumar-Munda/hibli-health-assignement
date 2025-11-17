import { extendTailwindMerge } from 'tailwind-merge'
import clsx from 'clsx'
import type { ClassValue } from 'clsx'

const twMergeWithPrefix = extendTailwindMerge({
  prefix: 'tw',
})

export function cn(...inputs: Array<ClassValue>) {
  return twMergeWithPrefix(clsx(inputs))
}
