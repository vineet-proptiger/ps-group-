import { SITE_URL } from '../lib/config'

export default function robots() {
  const baseUrl = SITE_URL || 'https://psgroupprojectsnewtown.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
