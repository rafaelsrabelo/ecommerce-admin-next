import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import empty from "./../public/empty.svg";
import Image from "next/image";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        });
    }, [setProducts]);
    return (
        <Layout>
            <Link className="bg-blue-700 text-white py-1 px-2 rounded-md" href='/products/new'>
                Adicionar produto
            </Link>
            {
                products.length === 0 ? (
                    <h1 className="flex items-center h-screen justify-center">
                            <div className="text-center items-center justify-center">
                                <Image src={empty} alt="empty" className="object-contain h-48 w-96 mb-5" />
                                <p className="">Não há produtos cadastrados, adicione um produto!</p>
                            </div>
                    </h1>
                ) : (
                    products.map(product => (
                        <div key={product._id} className="flex items-center border border-gray-300 rounded-md p-4 mt-4">
                            {/* <img src={product.images[0]} className="object-fill h-24 w-24 rounded"/> */}
                            <h4 className="text-lg font-bold p-0">{product.title}</h4>
                            <div className="flex align-center ms-auto">
                                <Link href={'/products/edit/' + product._id} className="flex align-center text-white rounded-lg p-2 bg-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 me-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    Editar
                                </Link>
                                <Link href={'/products/delete/' + product._id} className="flex align-center text-white rounded-lg p-2 ms-4 bg-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 me-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    Deletar
                                </Link>
                            </div>
                        </div>
                    ))
                )
            }
        </Layout>
    )
}