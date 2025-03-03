import type { ComputedRef } from 'vue'
import { computed, onScopeDispose, watch } from 'vue'
import type { PinceauRuntimeIds } from '../../types'
import type { PinceauRuntimeSheet } from './stylesheet'

export function usePinceauCssProp(
  ids: ComputedRef<PinceauRuntimeIds>,
  props: any,
  sheet: PinceauRuntimeSheet,
  loc: any,
) {
  let rule: CSSRule = sheet.hydratableRules?.[ids.value.uid]?.p
  const css = computed(() => props?.css)

  watch(
    css,
    (newCss) => {
      newCss = transformCssPropToDeclaration(ids.value, newCss)
      if (rule) { sheet.deleteRule(rule) }
      rule = sheet.pushDeclaration(
        ids.value.uid,
        'p',
        newCss,
        rule,
        { ...loc, type: 'c' },
      )
    },
    {
      immediate: !(rule),
    },
  )

  onScopeDispose(() => rule && sheet.deleteRule(rule))
}

/**
 * Transform CSS Prop to stringifiable object.
 */
export function transformCssPropToDeclaration(
  ids: PinceauRuntimeIds,
  css: any,
) {
  const declaration = {}

  if (css) {
    const targetId = `.${ids.uniqueClassName}${ids.componentId}`
    declaration[targetId] = Object.assign(declaration[targetId] || {}, css)
  }

  return declaration
}
