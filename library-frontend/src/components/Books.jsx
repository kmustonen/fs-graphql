import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {  
  const [genre, setGenre] = useState(null)
  const all = useQuery(ALL_BOOKS)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: 'cache-and-network',
  })

  if (!props.show) {
    return null
  }

  if (all.loading || !result.data) {
    return <div>loading...</div>
  }

  const genres = [...new Set(all.data.allBooks.flatMap((b) => b.genres))]

  return (
    <div>
      <h2>books</h2>
      {genre && <div>in genre <b>{genre}</b></div>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
