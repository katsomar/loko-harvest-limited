import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Loko Harvest Limited',
    short_name: 'Loko Harvest',
    description: 'Experience the finest organic, farm-to-table poultry with Loko Harvest Limited.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFCF7',
    theme_color: '#E6B94D',
    icons: [
      {
        src: '/logos/loko.png',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logos/loko.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logos/loko.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
