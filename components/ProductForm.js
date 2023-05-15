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
            <label>Nome do produto</label>
            <input 
                type="text" 
                value={title} 
                placeholder="Nome do produto" 
                onChange={event => setTitle(event.target.value)}
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            <label>Descrição</label>
            <textarea value={description} placeholder="Descrição" onChange={event => setDescription(event.target.value)
            }
            className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label>Preço</label>
            <input type="number" value={price} placeholder="Preço" onChange={event => setPrice(event.target.value)} 
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label>Quantidade</label>
            <input type="number" value={amount} placeholder="Quantidade" onChange={event => setAmount(event.target.value)}
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button type="submit" className="btn-primary">Salvar</button>
        </form>
    )
}