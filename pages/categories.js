import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';
import { toast } from 'react-toastify';

function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories() {
        setLoading(true);
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
            setLoading(false);
        })
    }
    async function saveCategory(ev) {
        ev.preventDefault();
        const data = {
            name, parentCategory
        }
        if(editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
            toast.success('Categoria editada!');
        } else {
            await axios.post('/api/categories', data);
            toast.success('Categoria criada!');
        }
        setName('');
        fetchCategories();
    }

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category?.parent?._id);
    }

    function deleteCategory(category) {
        swal.fire({
            title: 'Voce tem ceretza?',
            text: `Deletar a categoria ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Sim, deletar!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if(result.isConfirmed) {
                const {_id} = category;
                await axios.delete('/api/categories?_id='+ _id);
                fetchCategories();
                toast.success('Categoria deletada!');
            }
        }).catch(error => {
            console.log(error)
        });
    } 

    return (
        <Layout>
            <h1>Categorias</h1>
            <label>{editedCategory ? `Editar categoria: ${editedCategory.name}` : 'Criar categoria'}</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input value={name} onChange={ev => setName(ev.target.value)} placeholder="Nome da categoria" type="text" className="mb-0" />
                <select className="mb-0"  value={parentCategory} onChange={ev => setParentCategory(ev.target.value)}>
                    <option value=''>Categoria parente</option>
                    {
                        categories.length > 0 && categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                    }
                </select>
                <button className="btn-primary">Salvar</button>
            </form>

            <div className="bg-blue-200 text-black px-2 py-4 my-4 rounded-lg">
                Você pode criar categorias para organizar seus itens de forma mais eficiente. Ao 
                criar uma categoria, você pode optar por associá-la a uma categoria parente 
                existente, o que ajuda a estabelecer uma hierarquia e relacionamentos entre as 
                categorias.
            </div>

            <div className="flex justify-between ps-2 pe-4">
                <p>Nome da categoria</p>
                <p></p>
                <p></p>
            </div>
            <hr className="mb-4" />
            {
                categories.length > 0 && !loading && categories.map(category => (
                    <div className="flex justify-between ps-2 pe-4 mb-2" key={category._id}>
                        <h4>{category.name}</h4>
                        <h4>{category?.parent?.name}</h4>
                        <div className="flex align-center">
                                <button
                                    onClick={() => editCategory(category)} 
                                    className="flex align-center text-white rounded-lg p-2 bg-gray-500"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 me-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteCategory(category)}
                                    className="flex align-center text-white rounded-lg p-2 ms-4 bg-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 me-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    Deletar
                                </button>
                            </div>
                    </div>
                ))
            }
                        {loading && (
                <div className="h-24 p-1 flex items-center justify-center">
                    <Spinner />
                </div>
            )} 
        </Layout>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));