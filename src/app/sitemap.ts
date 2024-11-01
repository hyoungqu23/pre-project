import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: 'www.example.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'www.example.com/es',
          de: 'www.example.com/de',
        },
      },
    },
  ];
};

export default sitemap;
