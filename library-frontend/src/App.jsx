import { useState } from 'react'
import { useApolloClient } from '@apollo/client/react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const onLogin = (token) => {
    setToken(token)
    setPage('authors')
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={onLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      {token && <NewBook show={page === 'add'} />}
      {!token && page === 'login' && (
        <LoginForm setToken={onLogin} setError={notify} />
      )}
    </div>
  )
}

export default App
