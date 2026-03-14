export function SoldProperties() {
    return (
        <section id="sold" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">Historique</span>
                    <h2 className="font-serif text-3xl font-bold mt-2 text-gray-900">Vendus récemment</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { img: "https://www.immoba.fr/site/images/normal/Picture22824421jpg_5b8d2d020e852.jpg", tag: "Vendu 12j", loc: "Caudéran", title: "Maison d'architecte", price: "1 250 000 €" },
                        { img: "https://www.bordeauximmo9.com/medias/68b9b3ca36629-400.webp", tag: "Off-Market", loc: "Triangle d'Or", title: "Appartement Noble", price: "980 000 €" },
                        { img: "https://aquitaine-piscines.fr/wp-content/uploads/2024/06/construction-piscine-echoppe-bordeaux-chartrons-prunier-1.jpg", tag: "Au prix", loc: "Les Chartrons", title: "Échoppe + Jardin", price: "750 000 €" }
                    ].map((item, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4 shadow-md">
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase text-gray-900 z-10">{item.tag}</div>
                                <img src={item.img} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={item.title} />
                            </div>
                            <div className="px-2">
                                <p className="text-xs text-bordeaux font-bold uppercase mb-1">{item.loc}</p>
                                <h3 className="font-serif text-xl font-bold text-gray-900">{item.title}</h3>
                                <p className="text-gray-500 mt-2">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Team() {
    return (
        <section id="agency" className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <span className="text-bordeaux font-bold uppercase tracking-widest text-xs">Depuis 2025</span>
                <h2 className="font-serif text-4xl font-bold mt-2 mb-12 text-gray-900">L'Équipe du Projet</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { icon: "fa-crown", name: "Ayoub Idali", role: "Product Owner" },
                        { icon: "fa-people-arrows", name: "Omaima Rafia", role: "Scrum Master" },
                        { icon: "fa-code", name: "Mohammed Squalli H.", role: "Ingénieur Web", lead: true },
                        { icon: "fa-database", name: "Anas Lyoubi", role: "Data Analyst" }
                    ].map((m, i) => (
                        <div key={i} className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border ${m.lead ? 'ring-2 ring-bordeaux/20 relative' : 'border-gray-100'}`}>
                            {m.lead && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bordeaux text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">Lead Dev</span>}
                            <div className="w-14 h-14 mx-auto bg-bordeaux/5 text-bordeaux rounded-full flex items-center justify-center mb-4 text-2xl group-hover:bg-bordeaux group-hover:text-white transition-colors">
                                <i className={`fa-solid ${m.icon}`}></i>
                            </div>
                            <h3 className="font-serif text-lg font-bold text-gray-900">{m.name}</h3>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mt-2">{m.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Expertise() {
    return (
        <section id="expertise" className="py-20 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 text-center mb-10"><h2 className="font-serif text-3xl font-bold">Notre Méthodologie</h2></div>
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                <div className="p-6 text-center hover:bg-gray-50 rounded-xl transition"><i className="fa-solid fa-magnifying-glass-chart text-4xl text-blue-900 mb-4 opacity-80"></i><h3 className="font-bold mb-2">Audit de Données</h3><p className="text-sm text-gray-500">Analysé par nos experts data pour coller au marché réel.</p></div>
                <div className="p-6 text-center hover:bg-gray-50 rounded-xl transition"><i className="fa-solid fa-house-laptop text-4xl text-bordeaux mb-4 opacity-80"></i><h3 className="font-bold mb-2">Technologie Web</h3><p className="text-sm text-gray-500">Interface fluide pour une expérience optimale.</p></div>
                <div className="p-6 text-center hover:bg-gray-50 rounded-xl transition"><i className="fa-regular fa-handshake text-4xl text-gold mb-4 opacity-80"></i><h3 className="font-bold mb-2">Transparence</h3><p className="text-sm text-gray-500">Processus Agile garantissant des itérations rapides.</p></div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-600">
                &copy; 2026 Gironde Prestige. Tous droits réservés. Portfolio de Mohammed Squalli Houssaini (L3 MIAGE).
            </div>
        </footer>
    );
}