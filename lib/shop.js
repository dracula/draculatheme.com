const products = [
  {
    params: {
      slug: 'periodic-table-shirt',
      gumroadId: 'qyxgtx',
      images: [
        'periodic-table-shirt-1.png',
        'periodic-table-shirt-2.png',
        'periodic-table-shirt-3.png',
      ],
      size: '#shirts',
      defaultVariant: 2,
      variants: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      category: 'shirts',
      color: 'cyan',
    },
  },
  {
    params: {
      slug: 'dracula-hoodie',
      gumroadId: 'jeaaum',
      images: [
        'dracula-hoodie-1.png',
        'dracula-hoodie-2.png',
        'dracula-hoodie-3.png',
        'dracula-hoodie-4.png',
      ],
      size: '#hoodies',
      defaultVariant: 1,
      variants: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      category: 'other',
      color: 'green',
    },
  },
  {
    params: {
      slug: 'purple-pocket-shirt',
      gumroadId: 'wbkfo',
      images: [
        'purple-pocket-shirt-1.png',
        'purple-pocket-shirt-2.png',
        'purple-pocket-shirt-3.png',
      ],
      size: '#shirts',
      defaultVariant: 2,
      variants: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      category: 'shirts',
      color: 'purple',
    },
  },
  {
    params: {
      slug: 'dracula-beanie',
      gumroadId: 'tolzmb',
      images: [
        'dracula-beanie-1.png',
        'dracula-beanie-2.png',
        'dracula-beanie-3.png',
        'dracula-beanie-4.png',
      ],
      category: 'other',
      color: 'orange',
    },
  },
  {
    params: {
      slug: 'dracula-sticker-pack-n2',
      gumroadId: 'wlajj',
      images: [
        'dracula-sticker-pack-n2-1.png',
        'dracula-sticker-pack-n2-2.png',
        'dracula-sticker-pack-n2-3.png',
        'dracula-sticker-pack-n2-4.png',
        'dracula-sticker-pack-n2-5.png',
        'dracula-sticker-pack-n2-6.png',
      ],
      category: 'stickers',
      color: 'pink',
    },
  },
  {
    params: {
      slug: 'dracula-castle-poster',
      gumroadId: 'jbtvt',
      images: [
        'dracula-castle-poster-1.png',
        'dracula-castle-poster-2.png',
      ],
      category: 'other',
      color: 'yellow',
    },
  },
  {
    params: {
      slug: 'hexadecimal-shirt',
      gumroadId: 'qfbzl',
      images: ['hexadecimal-shirt-1.png'],
      size: '#shirts',
      defaultVariant: 2,
      variants: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      category: 'shirts',
      color: 'purple',
    },
  },
  {
    params: {
      slug: 'ascii-shirt',
      gumroadId: 'hjppo',
      images: ['ascii-shirt-1.png'],
      size: '#shirts',
      defaultVariant: 2,
      variants: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      category: 'shirts',
      color: 'green',
    },
  },
  {
    params: {
      slug: 'love-wins-shirt',
      gumroadId: 'tjqktv',
      images: ['love-wins-shirt-1.png'],
      size: '#shirts',
      defaultVariant: 2,
      variants: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      category: 'shirts',
      color: 'cyan',
    },
  },
  {
    params: {
      slug: 'vampire-slayers-shirt',
      gumroadId: 'dphwp',
      images: ['vampire-slayers-shirt-1.png'],
      size: '#shirts',
      defaultVariant: 2,
      variants: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      category: 'shirts',
      color: 'orange',
    },
  },
  {
    params: {
      slug: 'minimalist-pullover',
      gumroadId: 'syitd',
      images: ['minimalist-pullover-1.png', 'minimalist-pullover-2.png'],
      size: '#pullovers',
      defaultVariant: 1,
      variants: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      category: 'other',
      color: 'green',
    },
  },
  {
    params: {
      slug: 'little-vampire-onesie',
      gumroadId: 'fuoifx',
      images: ['little-vampire-onesie-1.png', 'little-vampire-onesie-2.png'],
      size: '#onesies',
      defaultVariant: 0,
      variants: ['3-6m', '6-12m', '12-18m', '18-24m'],
      category: 'other',
      color: 'pink',
    },
  },
  {
    params: {
      slug: 'dark-mode-hoodie',
      gumroadId: 'vuine',
      images: [
        'dark-mode-hoodie-1.png',
        'dark-mode-hoodie-2.png',
        'dark-mode-hoodie-3.png',
      ],
      size: '#hoodies',
      defaultVariant: 1,
      variants: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      category: 'other',
      color: 'yellow',
    },
  },
  {
    params: {
      slug: 'dracula-snapback-hat',
      gumroadId: 'oihca',
      images: [
        'dracula-snapback-hat-1.png',
        'dracula-snapback-hat-2.png',
        'dracula-snapback-hat-3.png',
      ],
      defaultVariant: 0,
      category: 'other',
      color: 'purple',
    },
  },
  {
    params: {
      slug: 'dracula-jogger',
      gumroadId: 'vmywr',
      images: ['dracula-jogger-1.png'],
      size: '#joggers',
      defaultVariant: 2,
      variants: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      category: 'other',
      color: 'cyan',
    },
  },
  {
    params: {
      slug: 'dracula-stickers',
      gumroadId: 'oujmc',
      images: ['dracula-stickers-1.png'],
      category: 'stickers',
      color: 'pink',
    },
  },
  {
    params: {
      slug: 'dracula-sticker-pack-n1',
      gumroadId: 'cntzy',
      images: [
        'dracula-sticker-pack-n1-1.png',
        'dracula-sticker-pack-n1-2.png',
        'dracula-sticker-pack-n1-3.png',
        'dracula-sticker-pack-n1-4.png',
        'dracula-sticker-pack-n1-5.png',
        'dracula-sticker-pack-n1-6.png',
      ],
      category: 'stickers',
      color: 'orange',
    },
  },
  {
    params: {
      slug: 'dracula-pin-n1',
      gumroadId: 'iyyzn',
      images: ['dracula-pin-n1-1.png'],
      category: 'other',
      color: 'purple',
    },
  },
]

export default products
