const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us4",
});

export default async (req, res) => {
  try {
    const { stats } = await mailchimp.lists.getList("05d188e2db");

    return res.status(200).json({
      total: stats.member_count + stats.unsubscribe_count
    });
  } catch (error) {
    return res.status(error.status).json({
      total: 0,
      error: JSON.parse(error.response.text).title
    });
  }
};
