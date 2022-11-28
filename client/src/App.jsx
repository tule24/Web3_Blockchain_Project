import './App.css'
import { Welcome, Navbar, Services, Transactions, Footer } from "./components"
function App() {
  return (
    <div className="min-h-screen gradient-bg-welcome ">
      <div className="w-full">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
