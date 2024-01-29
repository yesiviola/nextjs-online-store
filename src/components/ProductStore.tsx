import Product from "./Product";
import Image from 'next/image';


interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const ProductStore = ({ products }: { products: ProductProps[]}) => {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
        {products
            .slice(0, 4)
            .map(({ id, title, price, description, category, image }: ProductProps) => (
            <Product
                key={id}
                id={id.toString()}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
         />
     ))}
        <div className="md:col-span-2">
            { products
            .slice(4, 5)
            .map(({ id, title, price, description, category, image }) => (
                <Product
                key={id}
                id={id.toString()}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                />
            ))}
        </div>
        <Image
        className='md:col-span-full mx-auto'
        src='https://hips.hearstapps.com/hmg-prod/images/los-centros-comerciales-ma-s-espectaculares-del-mundo-que-no-te-puedes-perder-1533719426.jpg?resize=2048:*'
        alt=''
        width={800}
        height={400}
        />

    
        {products
           .slice(5, 7)
            .map(({ id, title, price, description, category, image}) => (
            <Product
                key={id}
                id={id.toString()}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
            />
            ))}
            { products
            ?.slice(7, products.length)
            .map(({id, title, price, description, category, image}) => (
            <Product
                key={id}
                id={id.toString()}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
            />
            ))}
        </div>
    );
}

export default ProductStore;
