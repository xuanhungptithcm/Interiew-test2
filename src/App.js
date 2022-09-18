import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product/Product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />}></Route>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
