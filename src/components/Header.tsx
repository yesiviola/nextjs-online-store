import Image from "next/image";
import {SearchIcon, ShoppingCartIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);

    const breadCrumbs = [
        "Lo mas demandado",
        "Lista de Deseos",
        "Sugerencias",
        "Tendencias",
        "Descarga el App",
        "Proteccion del comprador",
    ];

    const handleAuthClick = () => {
        if (session) {
            signOut();
        } else {
            signIn();
        }
    };
  return (
    <header>
   <div className='flex  items-center bg-cutt_colors p-1 flex-grow py-2' >
    <div className='mr-2 flex items-center sm:flex-grow-0'>
        <Image
        src='/Black And White Simple Y2K Fashion logo.png'
        width={120}
        height={50}
        className='object-contain cursor-pointer'
        onClick={() => router.push('/')}
        alt='logo'
        priority
        />
   </div>
    <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-gray-400 hover:bg-gray-500'>
         <input 
         type='text'
         className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4'
            />
            <SearchIcon className='h-12 p-4'/>
    </div>

    <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
        <div onClick={handleAuthClick} className='link'>
            <p className='text-gray-500'>{session && session.user ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className='font-extrabold md:text-sm text-gray-500'>Account</p>
        </div>
        <div className='link' onClick={() => router.push("/orders")}>
            <p className='text-gray-500'>Returns</p>
            <p className='font-extrabold md:text-sm text-gray-500'>& Orders</p>
        </div>
        <div
            className='relative link flex items-center'
            onClick={() => router.push("/checkout")}
        >
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-gray-900 text-center rounded-full text-white font-bold'>
                {items?.length}
            </span>
            <ShoppingCartIcon className='h-10'/>
        </div>
    </div>
    </div>
        <div className='flex items-center bg-cutt_colors-light text-white font-semibold text-sm space-x-3 h-15 p-2 pl-3'>
            {breadCrumbs.slice(0, 3).map((breadCrumb) => (
                <div key={breadCrumb} className='flex items-center content-start'>
                    <p className='link text-gray-500'>{breadCrumb}</p>
                    <ChevronRightIcon className='h-5 font-bold text-gray-500'/>
                </div>
            ))}
            {breadCrumbs.slice(3, breadCrumbs.length).map((breadCrumb) => (
                <div key={breadCrumb } className='flex items-center content-start'>
                    <p className='link hidden lg:inline-flex  text-gray-500'>{breadCrumb}</p>
                    <ChevronRightIcon className='hidden lg:inline-flex h-5 font-bold text-gray-500'/>
                </div>
            ))}
        </div>
    </header>
  );
};

export default Header;
