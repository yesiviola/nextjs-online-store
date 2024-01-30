import {buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import {initializeApp, getApps, getApp} from "firebase/app";
import  {getFirestore } from "firebase/firestore";
import {doc, setDoc, serverTimestamp } from "firebase/firestore";

 

const firebaseConfig = {
    apiKey: "AIzaSyAxanSNwqJ8lyaeeqCCGY4KyaoG7n3rffw",
    authDomain: "next-ecomerce-en-linea.firebaseapp.com",
    projectId: "next-ecomerce-en-linea",
    storageBucket: "next-ecomerce-en-linea.appspot.com",
    messagingSenderId: "739384182976",
    appId: "1:739384182976:web:e5474a5b32da75ef594525",
    measurementId: "G-T4050KMSE0"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
}else {
    app = getApp();
}
const db = getFirestore(app);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session: any) => {
    console.log("Fulfilling order", session);


 return setDoc(doc(db, "users", session.metadata.email, "orders", session.id), {
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: serverTimestamp(),
    })
    .then(() => {
        console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
    });
 };
   
    // eslint-disable-next-line import/no-anonymous-default-export
    export default async (req: NextApiRequest,  res: NextApiResponse) => {
        if (req.method === "POST") {
            const requestBuffer = await buffer(req);
            const payload = requestBuffer.toString();
            const sig = req.headers["stripe-signature"];
        
            let event;
        
            // Verify that the EVENT posted came from stripe
            try {
                event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
            } catch (err) {
                if (err instanceof Error){
                console.log("ERROR", err.message);
                return res.status(400).send(`Webhook error: ${err.message}`);
            }
        }
    
            // Handle the checkout.session.completed event
            if (event.type === "checkout.session.completed") {
                const session = event.data.object;
            
                return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) => {
               if (err instanceof Error) {
                    return res.status(400).send(`Webhook error: ${err.message}`);
               }
            });
        }
    }
    };
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
};


