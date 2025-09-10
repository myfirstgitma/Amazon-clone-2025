 import Header from './components/Header/Header'
 import Footer from "./components/Footer/Footer"
import './App.css'
import LowerHeader from './components/Header/LowerHeader'
import Carousal from './components/carasoul/Carousal'
import Catagory from './components/category/Category'

function App() {
   

  return (
    <>
       <Header />
       <LowerHeader/>
       <Carousal />
       <Catagory/>
       <Footer />
    </>
  )
}

export default App
