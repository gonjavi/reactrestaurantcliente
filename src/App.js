import { Routes, Route } from 'react-router';
import Ordenes  from './components/paginas/Ordenes';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Ordenes />} />
      </Routes>
    </div>
  );
}

export default App;
