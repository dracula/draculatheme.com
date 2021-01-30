import fs from 'fs';
import moment from 'moment';
import paths from './lib/paths.js';
import { getAllPosts } from './lib/blog.js';

function getBlog() {
  const allPosts = getAllPosts([
    'updatedAt',
    'slug',
  ]);

  return allPosts.map(post => {
    return `<url>
      <loc>https://draculatheme.com/blog/${post.slug}</loc>
      <lastmod>${post.updatedAt}</lastmod>
    </url>`;
  }).join(' ');
}

function getPages() {
  const pages = ['about', 'blog', 'contribute', 'ui', 'pro'];

  paths.forEach(path => {
    pages.push(path.params.theme);
  });

  return pages.map(page => {
    return `<url>
      <loc>https://draculatheme.com/${page}</loc>
      <lastmod>${moment().format('YYYY-MM-DD')}</lastmod>
    </url>`;
  }).join(' ');
}

async function generate() {
  try {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${getPages()}
        ${getBlog()}
      </urlset>`;

    fs.writeFileSync('public/sitemap.xml', xml);
  }
  catch (e) {
    console.error(e);
  }
}

generate();