import { Request, Response, NextFunction } from 'express';
import { updateConversation } from '../../lib/cache/wsConversation';
import { Message } from '../../lib/interface/wsConversationInterface';

export const HandleIncome = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      const msg = req.body.entry[0].changes[0].value.messages[0] as Message
      updateConversation(msg.from, msg)
      // const phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id
      // axios({
      //   method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      //   url:
      //     `https://graph.facebook.com/v12.0/${phone_number_id}/messages?access_token=${token}`,
      //   data: {
      //     messaging_product: "whatsapp",
      //     to: msg.from,
      //     text: { body: ''},
      //   },
      //   headers: { "Content-Type": "application/json" },
      // });
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
};

export const HandleValidation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   console.log("🚀 ~ file: handler.ts ~ line 20 ~ HandleValidation ~ req.query", req.query)
   const verify_token = process.env.VERIFY_TOKEN;

   // Parse params from the webhook verification request
   let mode = req.query["hub.mode"];
   let token = req.query["hub.verify_token"];
   let challenge = req.query["hub.challenge"];
 
   // Check if a token and mode were sent
   if (mode && token) {
     // Check the mode and token sent are correct
     if (mode === "subscribe" && token === verify_token) {
       // Respond with 200 OK and challenge token from the request
       console.log("WEBHOOK_VERIFIED");
       res.status(200).send(challenge);
     } else {
       // Responds with '403 Forbidden' if verify tokens do not match
       res.sendStatus(403);
     }
   }
};