import './App.css'

import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

function App() {
  return (
    <div className="app-shell">
      <div className="pixel-cloud pixel-cloud--left" aria-hidden="true" />
      <div className="pixel-cloud pixel-cloud--right" aria-hidden="true" />

      <header className="app-header">
        <p className="app-kicker">POCKET CONTACT SYSTEM</p>
        <h1>
          <span>PIXEL</span> PHONE BOOK
        </h1>
        <p className="app-description">
          번호를 톡톡 눌러 나만의 작은 연락처를 채워보세요.
        </p>
        <div className="header-hearts" aria-hidden="true">
          <span>♥</span><span>♥</span><span>♥</span>
        </div>
      </header>

      <main className="phone-grid">
        <ContactForm />
        <ContactList />
      </main>

      <footer className="app-footer">
        <span aria-hidden="true">✦</span> SAVE YOUR FAVORITE PEOPLE <span aria-hidden="true">✦</span>
      </footer>
    </div>
  )
}

export default App
