export default function Navbar() {
  return (
    <header className="flex justify-between align-center p-4">
      <h1>HeadlineWise</h1>
      <nav>
        <ul className="flex justify-end align-center space-x-4">
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  )
}