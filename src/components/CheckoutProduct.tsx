import { StarIcon } from "@heroicons/react/outline";
import accounting from "accounting"
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

interface CheckoutProductProps {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const CheckoutProduct = ({
    id,
    title,
    price,
    description,
    category,
    image,
}: CheckoutProductProps) => {
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
        };
        dispatch(addToBasket(product));
    };
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));
    };

    return (
        <div className="grid grid-cols-5">
            <div className='relative h-28 w-34'>
            <Image src={image}  alt="" className='object-cover' width={400} height={300}/>
            </div>
            <div className="col-span-2 mx-5">
                <p>{title}</p>
                <div className="flex">
                    <StarIcon className="h-5 text-yellow-500" />
                    <StarIcon className="h-5 text-yellow-500" />
                    <StarIcon className="h-5 text-yellow-500" />
                </div>
                <p className="text-xs mt-3 mb-3 line-clamp-3">{description}</p>
                <p className="mt-10 text-cutt_colors-light text-lg font-bold">
                    {accounting.formatMoney(price, "USD")}
                </p>
            </div>
            <div className="flex flex-col space-y-2 my-auto justify-self-start">
                <button className="button mt-auto" onClick={addItemToBasket}>
                    Add to Basket
                </button>
                <button className="button mt-auto" onClick={removeItemFromBasket}>
                    Remove from Basket
                </button>
            </div>
        </div>
    ); 
};

export default CheckoutProduct;
