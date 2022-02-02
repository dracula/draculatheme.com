const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us4",
});

export default async (req, res) => {
  try {
    const response = await mailchimp.ping.get();

    console.log(process.env.MAILCHIMP_API_KEY);
    console.log(response);

    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};
