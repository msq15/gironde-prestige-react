import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ZONE_DB = {
    "Bordeaux Triangle": { lat: 44.842, lng: -0.575, price: 6800 },
    "Chartrons": { lat: 44.852, lng: -0.570, price: 5900 },
    "Cauderan": { lat: 44.848, lng: -0.608, price: 4500 },
    "Bastide": { lat: 44.841, lng: -0.552, price: 4200 },
    "Pessac": { lat: 44.806, lng: -0.628, price: 3800 },
    "Bassin": { lat: 44.661, lng: -1.168, price: 8500 },
    "Vignobles": { lat: 44.894, lng: -0.158, price: 3200 }
};

export default function EstimatorForm({ onComplete }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ type: 'Maison', zone: '', area: 85, rooms: 3, bonus: [] });
    const [error, setError] = useState(false);
    const [loadingStage, setLoadingStage] = useState(0); // 0: None, 1: Loader, 2: EmailGate

    const titles = ["Type de bien", "Localisation", "Caractéristiques", "Les plus"];
    const subs = ["Type de propriété ?", "L'emplacement est clé.", "Détails du bien.", "Atouts valorisants."];

    const moveStep = (dir) => {
        if (dir > 0 && step === 2 && !formData.zone) {
            setError(true);
            return;
        }
        setError(false);
        if (step + dir > 4) runSimulation();
        else setStep(prev => prev + dir);
    };

    const handleCheck = (id) => {
        setFormData(prev => ({
            ...prev,
            bonus: prev.bonus.includes(id) ? prev.bonus.filter(b => b !== id) : [...prev.bonus, id]
        }));
    };

    const runSimulation = () => {
        setLoadingStage(1);
        setTimeout(() => setLoadingStage(2), 3000);
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        const zoneInfo = ZONE_DB[formData.zone] || ZONE_DB["Bordeaux Triangle"];
        let basePrice = zoneInfo.price * formData.area;
        if (formData.type === 'Appartement') basePrice *= 0.95;
        const bonusMult = 1 + (formData.bonus.length * 0.05);
        const finalPrice = Math.round((basePrice * bonusMult) / 1000) * 1000;

        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#800020', '#D4AF37'] });

        onComplete({ ...formData, finalPrice, zoneInfo });

        // Scroll to results automatically
        setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    return (
        <div className="glass rounded-2xl shadow-glass overflow-hidden relative min-h-[580px] flex flex-col bg-white">
            <div className="h-1.5 w-full bg-gray-100">
                <div className="h-full bg-bordeaux transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>

            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center h-full relative">

                {loadingStage === 0 ? (
                    <>
                        <div className="mb-6 text-center">
                            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">{titles[step - 1]}</h2>
                            <p className="text-gray-500 font-light">{subs[step - 1]}</p>
                        </div>

                        <div className="flex-1 w-full">
                            {/* STEP 1 */}
                            {step === 1 && (
                                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                                    {['Maison', 'Appartement'].map(type => (
                                        <div key={type} onClick={() => { setFormData({ ...formData, type }); setTimeout(() => moveStep(1), 300); }}
                                            className={`h-40 border cursor-pointer rounded-xl flex flex-col items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1 ${formData.type === type ? 'border-bordeaux bg-bordeaux/5' : 'border-gray-200 bg-gray-50'}`}>
                                            <i className={`fa-solid ${type === 'Maison' ? 'fa-house-chimney' : 'fa-building'} text-3xl mb-4 ${formData.type === type ? 'text-bordeaux' : 'text-gray-400'}`}></i>
                                            <span className={`font-serif font-bold ${formData.type === type ? 'text-bordeaux' : 'text-gray-700'}`}>{type}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="space-y-4 animate-fade-in">
                                    <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">Secteur / Quartier</label>
                                    <div className="relative">
                                        <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-bordeaux z-10"></i>
                                        <select value={formData.zone} onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                                            className={`w-full pl-12 pr-10 py-4 bg-gray-50 border rounded-lg text-gray-700 font-medium outline-none appearance-none cursor-pointer ${error ? 'ring-2 ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-bordeaux/20 focus:border-bordeaux'}`}>
                                            <option value="" disabled>Choisir un secteur...</option>
                                            {Object.keys(ZONE_DB).map(z => <option key={z} value={z}>{z}</option>)}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <div className="space-y-8 animate-fade-in">
                                    <div>
                                        <div className="flex justify-between mb-4"><label className="text-gray-500 font-medium uppercase text-xs">Surface</label><div className="font-serif text-2xl font-bold">{formData.area} m²</div></div>
                                        <input type="range" min="15" max="300" value={formData.area} onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-4"><label className="text-gray-500 font-medium uppercase text-xs">Pièces</label><div className="font-serif text-2xl font-bold">{formData.rooms} p.</div></div>
                                        <input type="range" min="1" max="8" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })} />
                                    </div>
                                </div>
                            )}

                            {/* STEP 4 */}
                            {step === 4 && (
                                <div className="grid grid-cols-2 gap-3 h-full animate-fade-in">
                                    {[
                                        { id: 'pierre', icon: 'fa-building', label: 'Pierre de Taille' },
                                        { id: 'ext', icon: 'fa-tree', label: 'Jardin / Terrasse' },
                                        { id: 'parking', icon: 'fa-car', label: 'Parking / Garage' },
                                        { id: 'piscine', icon: 'fa-water-ladder', label: 'Piscine' }
                                    ].map(feat => (
                                        <div key={feat.id} onClick={() => handleCheck(feat.id)}
                                            className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-center items-center text-center gap-2 transition-all ${formData.bonus.includes(feat.id) ? 'bg-bordeaux text-white border-bordeaux' : 'border-gray-200 hover:border-bordeaux/50'}`}>
                                            <i className={`fa-solid ${feat.icon} text-2xl opacity-50`}></i>
                                            <span className="text-sm font-semibold">{feat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-between items-center z-10">
                            <button onClick={() => moveStep(-1)} className={`text-gray-400 font-medium px-4 py-2 transition ${step === 1 ? 'opacity-0 cursor-default' : 'hover:text-gray-800'}`}>
                                <i className="fa-solid fa-arrow-left mr-2"></i> Retour
                            </button>
                            <button onClick={() => moveStep(1)} className={`text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:-translate-y-1 ${step === 4 ? 'bg-bordeaux' : 'bg-gray-900 hover:bg-black'}`}>
                                {step === 4 ? "Calculer l'estimation" : "Suivant"}
                            </button>
                        </div>
                    </>
                ) : loadingStage === 1 ? (
                    <div className="flex-col items-center justify-center flex h-full">
                        <div className="loader-spin mx-auto mb-6"></div>
                        <h3 className="font-serif text-xl font-bold mb-2 text-gray-800 text-center">Analyse en cours...</h3>
                        <p className="text-sm text-bordeaux font-medium text-center">Connexion à la base de données</p>
                    </div>
                ) : (
                    <div className="text-center w-full px-4 animate-fade-in flex flex-col justify-center h-full">
                        <div className="mb-4 text-green-500 text-5xl"><i className="fa-regular fa-circle-check"></i></div>
                        <h3 className="font-serif text-2xl font-bold mb-2">Estimation prête !</h3>
                        <p className="text-gray-500 mb-6 text-sm">Recevez votre fourchette de prix instantanément.</p>
                        <form onSubmit={handleFinalSubmit} className="space-y-3">
                            <input type="email" required placeholder="votre@email.com" className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux outline-none text-center" />
                            <button type="submit" className="w-full bg-bordeaux text-white py-4 rounded-lg font-bold text-lg hover:bg-bordeaux-dark transition-transform hover:-translate-y-1 shadow-lg">VOIR MON PRIX</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}