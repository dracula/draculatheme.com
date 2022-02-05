import { Octokit } from "@octokit/rest";
import Twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const fromPhone = process.env.TWILIO_FROM_PHONE;
const nettoPhone = process.env.TWILIO_NETTO_PHONE;
const zenoPhone = process.env.TWILIO_ZENO_PHONE;

const twilio = Twilio(accountSid, authToken);

async function fallback(to, github) {
	return Promise.all([
		twilio.messages.create({
			from: fromPhone,
			to,
			body: `Dracula UI: ${github}`,
		}),

		twilio.calls.create({
			from: fromPhone,
			to,
			twiml: `
      <Response>
        <Say>Dracula UI sale: ${github}</Say>
      </Response>
      `,
		}),
	]);
}

const octokit = new Octokit({
	auth: process.env.GITHUB_INVITATION_ACCESS_TOKEN,
});

export default async (req, res) => {
	console.log(req.body);

	try {
		const github = req.body["GitHub username"];

		if (!github) {
			res.status(422);
			res.end();
			return;
		}

		await octokit
			.request("PUT /repos/{owner}/{repo}/collaborators/{username}", {
				repo: "dracula-ui",
				username: github,
				permission: "triage",
				owner: "dracula",
			})
			.catch(async (err) => {
				console.error(err);

				await Promise.all([
					fallback(nettoPhone, github),
					fallback(zenoPhone, github),
				]);
			});

		res.status(200).json();
	} catch (e) {
		console.error(e);
		res.status(400);
		res.end();
	}
};
