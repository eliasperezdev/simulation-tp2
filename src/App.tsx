import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Generador from "./pages/Generador";
import Metodos from "./pages/Metodos";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Generador />} />
          <Route path="metodos" element={<Metodos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
