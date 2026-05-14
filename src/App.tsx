import { Routes, Route } from "react-router-dom";

import Home from "./screens/home";
import DetallePokemon from "./screens/detallePokemon";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detalle/:id" element={<DetallePokemon />} />
    </Routes>
  );
}

export default App;