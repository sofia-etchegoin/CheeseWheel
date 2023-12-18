import { useFruits } from '../hooks/useFruits.ts'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1>Havarti Your Say</h1>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div>
    </>
  )
}

export default App
