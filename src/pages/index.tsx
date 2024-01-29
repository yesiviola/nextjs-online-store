import {getSession, GetSessionParams } from "next-auth/react";
import {Session } from "next-auth";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductStore from "../components/ProductStore";


interface HomeProps {
  products: any[];
  session: Session | null;
}

export default function Home ({products, session}: HomeProps) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>NextJS e-commerce</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductStore products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return {
    props: {
      products,
      session,
    },
  };
}