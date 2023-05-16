import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    amount: existingAmount,
    images: existingImages,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [amount, setAmount] = useState(existingAmount || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    async function saveProduct(event) {
        event.preventDefault();
        const data = { title, description, price, amount, images };
        if (_id) {
            // update
            await axios.put(`/api/products/`, { ...data, _id });
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

    async function uploadImages(event) {
        const files = event.target?.files;
        if(files?.length >  0) {
            const data = new FormData();
            for (const file of files ) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
            // const images = res.data.map((image) => image.url);
        }
    }

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
            <label>Fotos</label>
            <div className="mb-2 flex flex-wrap gap-2">
                {!!images?.length && images.map(link => (
                        <div key={link} className="h-24">
                          <img src={link}  className="rounded-lg"/> 
                        </div>
                    ))}
                <label className="w-24 h-24 border text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input onChange={uploadImages} type="file" className="hidden" />
                </label>
                {!images?.lenght && (
                    <div>Não há fotos deste produto</div>
                )}
            </div>
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