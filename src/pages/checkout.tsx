import Image from "next/image";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import accounting from "accounting";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import  {RootState} from '../store';

const stripePromise = loadStripe(process.env.stripe_public_key || '');

const Checkout = () => {
    const items = useSelector((state: RootState) => state.basket.items);
    const total = useSelector((state: RootState) => state.basket.total);
    const  { data:  session }= useSession();

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        //Call the backend to create a chekout session

        const checkoutSession = await axios.post("/api/create-checkout-session", {
            items: items,
            email: session?.user?.email,
        });
        //Redirect the customer to stripe's checkout page
        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });
        if (result?.error) alert(result.error.message);
    };
    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src='/publicidad.jpg'
                        width={2000}
                        height={1200}
                        objectFit='cover'
                        alt=''
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0
                                ? "Your Basket is empty"
                                : "Your Shopping basket"}
                        </h1>
                        {items?.map((item) => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items?.length} items):
                                <span className='font-bold ml-2'>
                                    {accounting.formatMoney(total, { symbol: "USD", format: "%v %s"})}
                                </span>
                            </h2>
                            <button
                                role='link'
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 ${
                                    !session &&
                                    "from-gray-300 to-gray-600 border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                            >
                                {!session ? "Sign in to checkout" : "Proceed to checkout"}
                                </button>
                         </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Checkout;