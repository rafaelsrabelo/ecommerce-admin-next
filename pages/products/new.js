import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function NewProduct () {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    async function createProduct() {
        const data = {
            title,
            description,
            price
        };
        console.log(data);
        await axios.post('/api/products', data)
    }
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