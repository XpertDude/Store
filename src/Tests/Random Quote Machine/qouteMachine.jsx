import { quotes } from "./quotes";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export default function QuoteMachine() {
    const [curQuote, setCurrentQuote] = useState({
        author: "Albert Einstein",
        quote: "Life is like riding a bicycle. To keep your balance, you must keep moving."
    });

    const [nextQuoteIndex, setNextQuoteIndex] = useState(0);
    const [bgColor, setBgColor] = useState("rgb(100, 100, 255)");

    function getRandomColor() {
        const r = Math.floor(Math.random() * 156) + 100;
        const g = Math.floor(Math.random() * 156) + 100;
        const b = Math.floor(Math.random() * 156) + 100;
        return `rgb(${r}, ${g}, ${b})`;
    }

    const handleNextQuote = useCallback(() => {
        const newColor = getRandomColor();
        setBgColor(newColor);

        setNextQuoteIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % quotes.length;
            setCurrentQuote(quotes[newIndex]);
            return newIndex;
        });
    }, []);

    useEffect(() => {
        document.body.style.transition = "background-color 1s ease-in-out";
        document.body.style.backgroundColor = bgColor;
    }, [bgColor]);
    return (
        <motion.section
            className="w-75 h-100 text-center p-3"
        >
            <motion.div
                id="quote-box"
                className="w-100 h-100 p-3"
                style={{ maxWidth: "700px", wordWrap: "break-word", backgroundColor: 'whitesmoke' }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={curQuote.quote}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.p id="text" className="fs-2">
                            <q>{curQuote.quote}</q>
                        </motion.p>
                        <p id="author" className="text-muted text-end">-{curQuote.author}</p>
                    </motion.div>
                </AnimatePresence>

                <div className="d-flex justify-content-between align-items-center p-3 mx-3">
                    <div className="d-flex gap-1">
                        <Link
                            id="tweet-quote"
                            target="_blank"
                            to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${curQuote.quote}" - ${curQuote.author}`)}`}
                            className="badge p-2"
                            style={{ backgroundColor: bgColor, transition: "background-color 1s ease-in-out" }}
                        >
                            <i className="bi bi-twitter-x text-white fs-5 p-1"></i>
                        </Link>
                        <Link
                            to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://yourwebsite.com")}`}
                            className="badge p-2"
                            style={{ backgroundColor: bgColor, transition: "background-color 1s ease-in-out" }}
                        >
                            <i className="bi bi-facebook text-white fs-5 p-1"></i>
                        </Link>
                    </div>

                    <button
                        id="new-quote"
                        className="btn text-white"
                        onClick={handleNextQuote}
                        style={{ backgroundColor: bgColor, border: "none", transition: "background-color 1s ease-in-out" }}
                    >
                        New Quote
                    </button>
                </div>
            </motion.div>
            <p className="mt-3">by Yassine</p>
        </motion.section>
    );
}
