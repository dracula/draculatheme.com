const fs = require('fs');
const moment = require('moment');
const paths = require('./lib/paths');

async function generate() {
  try {
    const pages = ['about', 'contribute', 'pro'];

    paths.forEach(path => {
      pages.push(path.params.theme);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.map(page => {
          return `<url>
            <loc>https://draculatheme.com/${page}</loc>
            <lastmod>${moment().format('YYYY-MM-DD')}</lastmod>
          </url>`;
        }).join(' ')}
      </urlset>`;

    fs.writeFileSync('public/sitemap.xml', xml);
  }
  catch(e) {
    console.error(e);
  }
}

generate();