import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Results from './components/Results';
import { SoldProperties, Team, Expertise, Footer } from './components/StaticSections';

function App() {
  const [estimationData, setEstimationData] = useState(null);

  return (
    <>
      <Navbar />
      <Hero onComplete={(data) => setEstimationData(data)} />
      {estimationData && <Results data={estimationData} />}
      <SoldProperties />
      <Team />
      <Expertise />
      <Footer />
    </>
  );
}

export default App;