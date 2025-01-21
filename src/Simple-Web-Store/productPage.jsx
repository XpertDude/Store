import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import './styles.css';
export default function ProductPage() {
    const { id } = useParams();
    const [dataById, setDataById] = useState(null);
    const [error, setError] = useState('');
    const [clicked, setClicked] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [cart, setCart] = useState([])
    const [isAdded, setIsAdded] = useState(false);


    const LoadingEffect = () => (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );


    const RatingStars = (rate) => {
        const fullStar = <i className="bi bi-star-fill text-warning"></i>;
        const halfStar = <i className="bi bi-star-half text-warning"></i>;
        const emptyStar = <i className="bi bi-star text-warning"></i>;
    
        const stars = [];
        const wholeStars = Math.floor(rate);
        const hasHalfStar = (rate - wholeStars) >= 0.5;
    
        for (let i = 0; i < wholeStars; i++) {
            stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>);
        }
    
        if (hasHalfStar) {
            stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
        }
    
        while (stars.length < 5) {
            stars.push(<i key={`empty-${stars.length}`} className="bi bi-star text-warning"></i>);
        }
    
        return <>{stars}</>;
    };

    const handleSelect = (e) => {
        setQuantity(e.target.value)
    }

    const addedToCart = () => {
        setCart({
                id: dataById.id,
                quantity: quantity,
                name: dataById.title.slice(0, 40),
                image: dataById.image
        });
        setIsAdded(true);
    }


    useEffect(() => {
        if (!id) {
            setError('No product ID provided');
            return;
        }

        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setDataById(data);
                setError('');
            })
            .catch((err) => {
                console.error('Error fetching product data:', err.message);
                setError('Failed to fetch product data');
                setDataById(null);
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!dataById) {
        return <div><LoadingEffect /></div>;
    }
    const ModalCart = () => {
        return <>
            <div className='shop border border-secondary bg-light p-2 w-50 h-50'>
                <h5 className='text-center'>Cart</h5>
                <hr />
                {isAdded ?
                    <div className='container-fluid d-flex gap-2 justify-content-start'>
                        <div className='d-flex flex-column gap-1'>
                            <img width={50} height={60} src={cart.image} alt={cart.name} />
                            <p>Q: <span className='text-danger fs-6'>{cart.quantity}</span></p>
                        </div>
                        <p>{cart.name.slice(0, 30)}...</p>
                    </div>
                    : <div>No Items</div>
                }
            </div>
        </>
    }
    return (
        <>
            <section className='d-flex flex-column border border-light m-2 p-5' key={dataById.id}>
                {clicked && <ModalCart />}
                <div className='back'><Link to='/' ><i className="bi bi-arrow-return-left fs-3"></i></Link></div>
                <div className='cart' onClick={() => setClicked(prevState => !prevState)}><i className="bi bi-cart4 fs-3 text-success"></i></div>
                <div className='container d-flex justify-content-around gap-5 '>
                    <div className='d-flex flex-column gap-2 align-items-center'>
                        <img width={250} height={150} className='img-fluid p-2 m-5' src={dataById.image} alt={dataById.title} />
                        <button onClick={addedToCart} className='btn btn-danger container-fluid'>Add To Cart</button>
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <select
                            className="form-select form-select-lg w-50"
                            name="quantity"
                            onChange={handleSelect}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className='m-5'>
                        <h2>{dataById.title}</h2>
                        <p className='text-danger fw-bolder fs-3'>${dataById.price}</p>
                        <p className='text-success fs-5'><span className='text-black'>Rate: </span>{dataById.rating.rate} <span>{RatingStars(dataById.rating.rate)}</span></p>
                    </div>
                </div>
                <div className='table'>
                    <div
                        className="table-responsive"
                    >
                        <table
                            className="table table-striped-columns table-hover table-borderless table-primary align-middle"
                        >
                            <thead className="table-light">
                                <tr>
                                    <th>Description</th>
                                    <th>in Stock</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider w-75">
                                <tr
                                    className="table-primary"
                                >
                                    <td scope="row-1">{dataById.description}</td>
                                    <td className='fs-3 text-success'>{dataById.rating.count}</td>
                                    <td className='fs-5'>{dataById.category}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </section >
        </>

    );
}
