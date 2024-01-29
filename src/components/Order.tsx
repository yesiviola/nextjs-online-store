/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import accounting from "accounting";
import Image from "next/image";


interface orderProps {
    id: string;
    amount: number;
    amountShipping: number;
    items: any[];
    timestamp: number;
    images: string[];
}

const Order = ({ id, amount, amountShipping, items, timestamp, images }: orderProps) => {
    return (
        <div className='relative border rounded-md'>
            <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
                <div>
                    <p className='font-bold text-xs'>Order placed</p>
                    <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
                </div>
                <div>
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p>
                        {accounting.formatMoney(amount, "USD")} - Next Day Delivery{" "}
                        {accounting.formatMoney(amountShipping, "USD")}
                    </p>
            </div>
            <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
                {items.length} items
            </p>
            <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
                ORDER # {id}
            </p>
        </div>
        <div className='p-5 sm:p-10'>
            <div className='flex space-x-6 overflow-x-auto'>
                {images.map((image, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div key={index} className='relative h-20 sm:h-32'>
                    <Image src={image} alt={`Product ${index + 1}`} width={600} height={400} className='object-contain sm:h-32'/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default Order
