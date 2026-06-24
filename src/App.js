
import React from "react"

const useSemiPersistentState = (key, initialState) => {

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )

  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]

}

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]

//se espera y resuelve y lo guarda en esa estructura
const getAsyncStories = () => new Promise(
  (resolve) => setTimeout(
    () => resolve({ data: { stories: initialStories } }), 
    2000
  )
)

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React',
  )

  const [stories, setStories] = React.useState([])

  //will be called once first render y ya
  React.useEffect(() => {
    //esta esperando a que llegue y cuando llega se guarda en result y despues tu la guardas en una variable statuful stories
    getAsyncStories().then(result => {
      setStories(result.data.stories)
    })
  }, [])

  const handleRemoveStories = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    )
    setStories(newStories)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>

      <h1>My hacker stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        //esto es un booleano
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <List list={searchedStories} onRemoveItem={handleRemoveStories} />

    </div>
  )
}

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
)

const Item = ({ item, onRemoveItem }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>

      <span>
        <button type="button" onClick={() => {
          onRemoveItem(item)
        }}>
          Dismiss
        </button>
      </span>

    </li>
  )
}

const InputWithLabel = (
  {
    id,
    value,
    type = 'text',
    onInputChange,
    isFocused,
    children,
  }) => {

  const inputRef = React.useRef()

  //este se llama despues de la asignacion del puntero
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      console.log("alejandro")
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    //fragment
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  )

}


export default App
