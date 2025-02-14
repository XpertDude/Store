import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './store';
import ProductPage from './productPage';

function App() {
    return (
        <Router basename="Store">
            <Routes>
                <Route path="/" element={<Store />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
