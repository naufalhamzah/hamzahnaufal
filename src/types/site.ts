/** Site-wide metadata (deployment/branding — not personal content). */
export interface SiteMeta {
  /** Absolute site URL, no trailing slash. */
  url: string;
  /** BCP-47 language tag used on <html lang> and Open Graph. */
  locale: string;
  /** Fallback social share image, relative to /public. */
  defaultOgImage: string;
}
