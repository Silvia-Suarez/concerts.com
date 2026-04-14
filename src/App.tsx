import './App.css'
import ConcertList from './components/concerts/ConcertList'
import { concerts } from './data/concerts'
function App() {

  return (
    <>
    <div>
      <h1>
        Concerts.com
      </h1>
      <ConcertList concerts={concerts}></ConcertList>
    </div>
    </>
  )
}

export default App
