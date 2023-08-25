export default async ({ query: { product } }, res) => {
  try {
    const gumroadReq = await fetch(
      `https://api.gumroad.com/v2/products/${product}?access_token=${process.env.GUMROAD_ACCESS_TOKEN}`
    );
    const gumroadRes = await gumroadReq.json();
    const count = gumroadRes.product.sales_count.toLocaleString();
    const total = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(gumroadRes.product.sales_usd_cents / 100);

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1200, stale-while-revalidate=600"
    );
    return res.status(200).json({ count, total });
  } catch (error) {
    return res.status(400).json({ count: 0, total: 0 });
  }
};
