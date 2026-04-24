import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={scrollToTop}
                    className="fixed bottom-[100px] right-6 md:bottom-[120px] md:right-10 z-[45] flex items-center justify-center w-12 h-12 bg-charcoal text-white rounded-full shadow-lg hover:shadow-xl hover:bg-muted-gold hover:-translate-y-1 transition-all duration-300 group"
                    aria-label="Back to top"
                >
                    <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
