// This is an example callback file for Mailgun.
import type { NextApiRequest, NextApiResponse } from "next";

interface MailgunWebhookBody {
  event: string;
  recipient: string;
  url: string;
}

const mailgunWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as MailgunWebhookBody;

  if (body.event === "delivered") {
    console.log("Email delivered to", body.recipient);
    // e.g. Update database that email was sent
  }

  if (body.event === "opened") {
    const email: string = body.recipient;

    console.log("Email opened by", email);
    // e.g. Log open event to analytics
  }

  if (body.event === "clicked") {
    const url: string = body.url;

    console.log("Email clicked on", url);
    // e.g. Increment click count
  }

  if (body.event === "bounced") {
    const email: string = body.recipient;

    // e.g. Update subscriber status
  }

  res.status(200).json({ message: "Callback for Mailgun received" });
};

export default mailgunWebhook;
