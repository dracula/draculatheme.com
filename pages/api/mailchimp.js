const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us4",
});

export default async (req, res) => {
  try {
    const { stats } = await mailchimp.lists.getList("05d188e2db");

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    )
    return res.status(200).json({
      total: stats.member_count + stats.unsubscribe_count,
    });
  } catch (error) {
    return res.status(400).json({ total: 0 });
  }
};
