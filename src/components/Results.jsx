import { MapContainer, TileLayer, Circle, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for React-Leaflet icons
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function Results({ data }) {
    const { type, area, rooms, zone, finalPrice, zoneInfo } = data;
    const low = Math.round(finalPrice * 0.94);
    const high = Math.round(finalPrice * 1.06);

    return (
        <section id="results" className="py-20 bg-sand border-t border-gray-200 animate-slide-up">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-bordeaux text-sm font-bold uppercase tracking-widest">Rapport d'estimation</span>
                    <h2 className="font-serif text-4xl font-bold mt-3 text-gray-900">Valeur de marché estimée</h2>
                    <div className="w-24 h-1 bg-bordeaux mx-auto mt-6"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    <div className="bg-white p-3 rounded-2xl shadow-xl h-[400px] lg:h-auto relative z-10 ring-1 ring-gray-100 flex flex-col">
                        <div className="w-full flex-1 rounded-xl z-0 bg-gray-100 overflow-hidden">
                            <MapContainer center={[zoneInfo.lat, zoneInfo.lng]} zoom={15} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                                <Circle center={[zoneInfo.lat, zoneInfo.lng]} pathOptions={{ color: '#800020', fillColor: '#800020', fillOpacity: 0.15 }} radius={400} />
                                <Marker position={[zoneInfo.lat, zoneInfo.lng]} />
                            </MapContainer>
                        </div>
                        <div className="mt-4 px-2 flex items-center gap-3 text-gray-600">
                            <div className="bg-bordeaux/10 text-bordeaux p-2 rounded-full"><i className="fa-solid fa-location-dot"></i></div>
                            <span className="font-serif font-bold text-lg">{zone}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col ring-1 ring-gray-100">
                        <div className="bg-gray-50 border-b border-gray-200 p-6">
                            <h4 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">Compte rendu du bien</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex flex-col"><span className="text-gray-500 text-xs">Type</span><span className="font-bold">{type}</span></div>
                                <div className="flex flex-col"><span className="text-gray-500 text-xs">Surface</span><span className="font-bold">{area} m²</span></div>
                                <div className="flex flex-col"><span className="text-gray-500 text-xs">Pièces</span><span className="font-bold">{rooms}</span></div>
                                <div className="flex flex-col"><span className="text-gray-500 text-xs">Secteur</span><span className="font-bold truncate">{zone}</span></div>
                            </div>
                        </div>

                        <div className="bg-gray-900 text-white p-10 relative overflow-hidden flex-1 flex flex-col justify-center">
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Net Vendeur Estimé</p>
                            <div className="flex items-baseline gap-2 z-10 relative">
                                <span className="font-serif text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                    {finalPrice.toLocaleString('fr-FR')}
                                </span>
                                <span className="text-3xl text-gray-400">€</span>
                            </div>
                        </div>

                        <div className="p-8 bg-white">
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                                    <span className="text-gray-500">Fourchette Basse</span><span className="font-bold">{low.toLocaleString('fr-FR')} €</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                                    <span className="text-gray-500">Fourchette Haute</span><span className="font-bold">{high.toLocaleString('fr-FR')} €</span>
                                </div>
                            </div>
                            <div className="mt-8 text-center">
                                <a href="#contact" className="inline-block w-full bg-bordeaux hover:bg-bordeaux-dark text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-[1.01] uppercase tracking-wide text-sm">
                                    Confirmer ce prix avec un expert
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}