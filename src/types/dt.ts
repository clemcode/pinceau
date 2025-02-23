import type { PinceauTokensPaths } from './theme'
import type { DesignToken, DesignTokens } from './tokens'

export interface TokensFunctionOptions {
  /**
   * The key that will be unwrapped from the design token object.
   * @default variable
   */
  key?: 'variable' | 'value' | string
  /**
   * Called on missing tokens.
   * @default false
   */
  onNotFound?: false | ((path: string, options: TokensFunctionOptions) => void)
  /**
   * The location of the resolved token.
   * Can be useful for logging purposes.
   * @default false
   */
  loc?: any
}

/**
 * $dt function
 */
export type DtFunction = (
  path: PinceauTokensPaths | (string & {}),
  key?: 'variable' | 'value'
) => string

/**
 * $tokens function
 */
export type TokensFunction = (
  path?: PinceauTokensPaths | (string & {}),
  options?: TokensFunctionOptions,
  theme?: any
) => DesignTokens | DesignToken | number | string
