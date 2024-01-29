import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { collection, doc, getDocs, orderBy, query} from "firebase/firestore";
import {QueryDocumentSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import moment from "moment";
import db from "../../firebase";
import OrderComponent from "../components/Order";


interface orderType {
    id: string;
    amount: number;
    amountShipping: number;
    image: string[];
    timestamp: number;
    items: any;
}


interface Props {
    orders: orderType[];
}


const OrdersPage: React.FC<Props> = ({ orders }) => {
    const { data: session }= useSession();
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
                    Your Orders
                </h1>
                {session ? <h2>{orders?.length} Orders</h2>: <h2>Please sign in</h2>}
                <div className='mt-5 space-y-4'>
                    {orders?.map(
                        ({ id, amount, amountShipping, items, timestamp, image }) => (
                            <OrderComponent
                                key={id}
                                id={id}
                                amount={amount}
                                amountShipping={amountShipping}
                                items={items}
                                timestamp={timestamp}
                                images={image}
                            />
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default OrdersPage;

export  const getServerSideProps: GetServerSideProps = async (context)  => {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Get the users logged in credentials...
    const session = await getSession(context);

    if (!session || !session.user) {
        return {
            props: {},
        };
    }

    // Firebase DB
    const usersCollection = collection(db, "users");
    const userDoc = doc( usersCollection, session.user.email as string);
    const ordersCollection = collection(userDoc, "orders");
    const ordersQuery = query(ordersCollection, orderBy("timestamp", "desc"));
    const stripeOrders = await getDocs(ordersQuery)

    // Stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order: QueryDocumentSnapshot) => {
            const data = order.data();
            return {
            id: order.id,
            amount: data.amount,
            amountShipping: data.amount_shipping,
            images: data.images,
            timestamp: moment(data.timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
            };
        })
        );

    return {
        props: {
            orders,
        },
    };
}