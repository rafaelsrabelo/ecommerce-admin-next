import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductForm ({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice,
    amount: existingAmount
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [amount, setAmount] = useState(existingAmount || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    console.log({_id});
    async function saveProduct(event) {
        event.preventDefault();
        const data = {title,description,price, amount};
        if(_id) {
            // update
            await axios.put(`/api/products/`, {...data, _id});
        } else {
            // create
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }
    useEffect(() => {
        if (goToProducts) {
          router.push('/products');
        }
      }, [goToProducts, router]);
    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input type="text" value={title} placeholder="product name" onChange={event => setTitle(event.target.value)}/>
            <label>Description</label>
            <textarea value={description} placeholder="description" onChange={event => setDescription(event.target.value)}/>
            <label>Price (in USD)</label>
            <input type="number" value={price} placeholder="price" onChange={event => setPrice(event.target.value)}/>
            <label>Amount</label>
            <input type="number" value={amount} placeholder="amount" onChange={event => setAmount(event.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}