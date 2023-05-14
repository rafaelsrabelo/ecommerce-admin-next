import Layout from "@/components/Layout";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewProduct () {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function createProduct(event) {
        event.preventDefault();
        const data = {
            title,
            description,
            price
        };
        await axios.post('/api/products', data);
        setGoToProducts(true);
        alert('deu certo, chapa!');
    }
    useEffect(() => {
        if (goToProducts) {
          router.push('/products');
        }
      }, [goToProducts, router]);

    return (
        <Layout>
            <form onSubmit={createProduct}>
                <h1>New Product</h1>
                <label>Product name</label>
                <input type="text" value={title} placeholder="product name" onChange={event => setTitle(event.target.value)}/>
                <label>Description</label>
                <textarea value={description} placeholder="description" onChange={event => setDescription(event.target.value)}/>
                <label>Price (in USD)</label>
                <input type="number" value={price} placeholder="price" onChange={event => setPrice(event.target.value)}/>
                <button type="submit" className="btn-primary">Save</button>
            </form>
        </Layout>
    )
}