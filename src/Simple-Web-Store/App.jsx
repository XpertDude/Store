import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './store';
import ProductPage from './productPage';

function App() {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<Store />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
        </Router>
    );
}

export default App;
