import { SITE_URL } from '../lib/config'

export default function robots() {
  const baseUrl = SITE_URL || 'https://psgroupprojectsNewtown Action Area II.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
