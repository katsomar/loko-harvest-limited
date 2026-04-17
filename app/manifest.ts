import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Loko Harvest Limited',
    short_name: 'Loko Harvest',
    description: 'Experience the finest organic, farm-to-table poultry with Loko Harvest Limited.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFCF8',
    theme_color: '#C18D4D',
    icons: [
      {
        src: '/logos/loko.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
