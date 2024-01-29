import { NextApiRequest, NextApiResponse } from "next";


interface Item {
    description: string;
    price: number;
    title: string;
    image: string;
}


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest,  res: NextApiResponse) => {
    try {
    const { items, email } = req.body;

    const transformedItems = items.map((item: Item) => ({
        quantity: 1,
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
    }));

    transformedItems.push({
        price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Shipping',
                },
                unit_amount: 500,
            },
            quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["GB", "US", "CA"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item: { image: any; }) => item.image)),
        },
    });

    res.status(200).json({ id: session.id });
}

catch (error){
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error:'Failed to create Stripe checkout session'});
    }
}
