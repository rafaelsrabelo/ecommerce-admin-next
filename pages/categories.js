import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function CategoriesPage() {
    const [name, setName] = useState('');
    
    async function saveCategory() {
        await axios.post('/api/categories', {name});
        setName('')
    }

    return (
        <Layout>
            <h1>Categorias</h1>
            <label>Nova categoria</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input value={name} onChange={ev => setName(ev.target.value)} placeholder="Nome da categoria" type="text" className="mb-0"/>
                <button className="btn-primary">Salvar</button>
            </form>
        </Layout>
    )
}