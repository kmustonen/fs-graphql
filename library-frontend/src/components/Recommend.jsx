import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const me = useQuery(ME)
  const favorite = me.data?.me?.favoriteGenre
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: favorite },
    skip: !favorite,
    fetchPolicy: 'cache-and-network',
  })

  if (!props.show) {
    return null
  }

  if (me.loading || books.loading || !books.data) {
    return <div>loading...</div>
  }

  const shown = books.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{favorite}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {shown.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
