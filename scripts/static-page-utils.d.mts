export interface StaticPageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

export const SITE_URL: string;
export const STATIC_PAGE_META: StaticPageMeta[];
export const NOT_FOUND_META: StaticPageMeta & { noindex: true };

export function renderStaticPage(template: string, meta: StaticPageMeta): string;
