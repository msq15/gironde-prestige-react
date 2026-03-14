import EstimatorForm from './EstimatorForm';

export default function Hero({ onComplete }) {
    return (
        <section id="hero" className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1594833919427-04664db80f4f?q=80&w=2000&auto=format&fit=crop" alt="Bordeaux" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/80 to-bordeaux/30"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-white lg:text-left text-center animate-slide-up">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">
                        L'Art d'estimer <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">l'exception.</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 font-light leading-relaxed max-w-lg lg:mx-0 mx-auto">
                        Obtenez une évaluation fiable de votre patrimoine immobilier à Bordeaux et ses alentours.
                    </p>
                </div>

                <div className="w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <EstimatorForm onComplete={onComplete} />
                </div>
            </div>
        </section>
    );
}