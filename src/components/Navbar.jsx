import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-[100] top-0 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <a href="#" onClick={() => window.location.reload()} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-bordeaux rounded-full flex items-center justify-center text-white text-lg transition-transform group-hover:scale-105">
                        <i className="fa-solid fa-gem"></i>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-2xl font-bold leading-none text-gray-900 tracking-tight">Gironde<span className="text-bordeaux">Prestige</span></span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Depuis 2025</span>
                    </div>
                </a>

                <div className="hidden md:flex gap-8 items-center">
                    <a href="#agency" className="text-sm font-medium text-gray-600 hover:text-bordeaux uppercase tracking-wide">L'Agence</a>
                    <a href="#sold" className="text-sm font-medium text-gray-600 hover:text-bordeaux uppercase tracking-wide">Biens vendus</a>
                    <a href="#hero" className="bg-bordeaux hover:bg-bordeaux-light text-white px-6 py-2.5 rounded-md font-sans font-bold shadow-lg uppercase text-sm">Estimer mon bien</a>
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800 focus:outline-none">
                    <i className="fa-solid fa-bars text-2xl"></i>
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden fixed inset-x-0 top-[76px] bg-white border-b border-gray-100 shadow-xl flex flex-col py-4 px-6 gap-4 z-40">
                    <a href="#agency" onClick={() => setIsOpen(false)} className="py-2 text-lg font-serif border-b border-gray-50">L'Agence</a>
                    <a href="#sold" onClick={() => setIsOpen(false)} className="py-2 text-lg font-serif border-b border-gray-50">Biens Vendus</a>
                    <a href="#hero" onClick={() => setIsOpen(false)} className="w-full text-center bg-bordeaux text-white py-3 rounded mt-2 font-bold uppercase">Estimation Gratuite</a>
                </div>
            )}
        </nav>
    );
}