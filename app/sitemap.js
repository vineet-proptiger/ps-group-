import { SITE_URL } from '../lib/config'

const BASE_URL = SITE_URL || 'https://psgroupprojectsnewtown.com'

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // {
    //   url: `${BASE_URL}/privacy-policy`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
  ]
}
