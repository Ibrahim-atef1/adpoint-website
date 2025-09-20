export interface ClientData {
  name: string
  slug: string
  logo?: string
  heroImage?: string
  description: string
  whatWeDid: string
  images: string[]
  videos: string[]
}

export const clientConfigs = {
  'dreams-reality': {
    name: 'Dreams Reality',
    slug: 'dreams-reality',
    description: 'Dreams Reality is a construction and finishing company.',
    whatWeDid: 'We built a complete online platform, designed their company profile, created website visuals, and produced business card designs.',
    heroImage: 'company-profile/company-profile.jpeg',
    logo: 'logo/logo.png',
    images: [
      'company-profile/company-profile.jpeg',
      'website/contact.png',
      'website/elegant.png',
      'website/home.jpeg',
      'website/services.jpeg',
      'business-card.png'
    ],
    videos: ['website/video1.mp4']
  },
  'house-of-toast': {
    name: 'House of Toast',
    slug: 'house-of-toast',
    description: 'A restaurant brand.',
    whatWeDid: 'Designed and executed Ramadan-themed Instagram posts for their social media.',
    heroImage: 'instagram/image1.png',
    logo: 'logo/logo.png',
    images: [
      'instagram/image1.png',
      'instagram/image2.png'
    ],
    videos: []
  },
  'palme': {
    name: 'Palmé',
    slug: 'palme',
    description: 'Palmé is a fashion footwear brand inspired by Birkenstock, targeting Egypt & UAE.',
    whatWeDid: 'Delivered full branding (from logo to visuals), built their website, created Instagram ads, and ran ad campaigns achieving an ROAS of 14 EGP.',
    heroImage: 'intagram/image1.jpg',
    logo: 'logo/logo.png',
    images: [
      'intagram/image1.jpg',
      'intagram/image2.jpg',
      'intagram/image3.jpg',
      'intagram/image4.jpg',
      'intagram/ad.png',
      'website/quick-add.png',
      'website/easy-checkout.png'
    ],
    videos: ['website/website.mp4']
  },
  'peefree': {
    name: 'Peefree',
    slug: 'peefree',
    description: 'A consumer goods brand.',
    whatWeDid: 'Designed creative Instagram posts to boost brand presence and engagement.',
    heroImage: 'image1.jpg',
    images: [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      'image4.jpg',
      'image5.jpg'
    ],
    videos: []
  },
  'zenachii': {
    name: 'Zenachii',
    slug: 'zenachii',
    description: 'Zenachii is a fashion/lifestyle ecommerce brand.',
    whatWeDid: 'Built and launched their ecommerce website, produced product visuals, and created brand content.',
    heroImage: 'image1.jpg',
    logo: 'logo/logo.jpeg',
    images: [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      'website/website1.png',
      'website/website2.png'
    ],
    videos: ['website/video1.mp4']
  }
}

export function getAllClients(): ClientData[] {
  return Object.values(clientConfigs).map(config => ({
    ...config,
    logo: config.logo ? `/clients/${config.slug}/${config.logo}` : undefined,
    heroImage: config.heroImage ? `/clients/${config.slug}/${config.heroImage}` : undefined,
    images: config.images.map(img => `/clients/${config.slug}/${img}`),
    videos: config.videos.map(vid => `/clients/${config.slug}/${vid}`)
  }))
}

export function getClientBySlug(slug: string): ClientData | null {
  const config = clientConfigs[slug as keyof typeof clientConfigs]
  if (!config) return null

  return {
    ...config,
    logo: config.logo ? `/clients/${config.slug}/${config.logo}` : undefined,
    heroImage: config.heroImage ? `/clients/${config.slug}/${config.heroImage}` : undefined,
    images: config.images.map(img => `/clients/${config.slug}/${img}`),
    videos: config.videos.map(vid => `/clients/${config.slug}/${vid}`)
  }
}
