import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
export default function Store() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('https://fakestoreapi.com/products')
            .then((response) =>
            response.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, []);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((err) => {
                console.error('Error loading categories:', err);
            });
    }, []);

    const handleSearchValue = (e) => {
        const input = e.target.value.toLowerCase().trim();
        if (!input) {
            setFilteredProducts(products);
            document.getElementById('category').selectedIndex = 0;
        } else {
            const filteredBySearch = filteredProducts.filter((product) =>
                product.title.toLowerCase().includes(input) ||
                product.description.toLowerCase().includes(input)
            );
            if (filteredBySearch.length > 0) {
                setFilteredProducts(filteredBySearch);
                }
        }
        };

    const filterByCategory = (category) => {
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.category === category);
            setFilteredProducts(filtered);
        }
    };

        const  LoadingEffect = () => (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <>
            <h1 className="text-center text-secondary">My Store</h1>
            {loading && <LoadingEffect />}
            <section className="container-fluid m-1">
                <div>
                    <div className='d-flex justify-content-end'>
                    <input
                        onChange={handleSearchValue}
                        className="form-control no-outline w-25 border border-secondary mx-2 p-1"
                        type="text"
                        placeholder="Search"
                    />
                    </div>
                    <hr />
                    <div className="table-responsive mx-2">
                        <div className="d-flex justify-content-left gap-3  align-items-center ">
                            <label className='fs-5' htmlFor="category"><span className="badge bg-secondary p-2">Categories :</span>
                            </label><select
                                className="form-select w-50"
                                name="category"
                                id="category"
                                onChange={(e) => filterByCategory(e.target.value)}>
                                <option  value='All'>All</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <table className="table table-white">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col" className='custom-style' >Description</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col" className='custom-style'>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <Link className='text-decoration-none product-link' to={`/product/${product.id}`}>{product.title.slice(0, 80)}...</Link>
                                        </td>
                                        <td className='custom-style'>{product.description.slice(0, 100)}...</td>
                                        <td>
                                            <img
                                                width={150}
                                                height={150}
                                                src={product.image}
                                                alt="product"
                                            />
                                        </td>
                                        <td style={{ color: 'red' }}><span
                                            className="badge bg-primary custom-style"
                                            >{product.rating.rate}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
