//App.tsx
import CheeseList from './CheeseList'
import AddCheese from './AddCheese'

export default function App() {
  return (
    <>
      <header className="header">
        <h1>Havarti Your Say</h1>
      </header>
      <CheeseList />
      <AddCheese />
    </>
  )
}
