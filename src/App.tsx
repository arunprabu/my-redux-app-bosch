import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import Home from "./features/home/Home"

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </main>

      <footer className="text-center">
        <hr />
        <p>Copyright 2024 | Arun</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
