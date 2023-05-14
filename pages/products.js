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
    }, [products]);
    return (
        <Layout>
            <Link className="bg-gray-900 text-white py-1 px-2 rounded-md" href='/products/new'>Add new product</Link>
            {
                products.map(product => (
                    <div key={product._id} className="border border-gray-300 rounded-md p-4 m-4">
                        <h2 className="text-lg font-bold">{product.title}</h2>
                    </div>
                ))
            }
        </Layout>
    )
}