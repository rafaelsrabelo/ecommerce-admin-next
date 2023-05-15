import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        });
    }, [setProducts]);
    return (
        <Layout>
            <Link className="bg-gray-900 text-white py-1 px-2 rounded-md" href='/products/new'>Add new product</Link>
            {
                products.map(product => (
                    <div key={product._id} className="flex items-center border border-gray-300 rounded-md p-4 mt-4">
                        <h4 className="text-lg font-bold p-0">{product.title}</h4>
                        <div className="ms-auto">
                            <Link className="flex align-center text-white rounded-lg p-2 bg-yellow-600" href={'/products/edit/'+product._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 me-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                            Edit
                            </Link>
                        </div>
                    </div>
                ))
            }
        </Layout>
    )
}