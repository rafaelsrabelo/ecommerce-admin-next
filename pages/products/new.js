import Layout from "@/components/Layout";
import { useState } from "react";

export default function NewProduct () {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    function createProduct() {
    }
    return (
        <Layout>
            <form onSubmit={() => console.log(event.target)}>
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