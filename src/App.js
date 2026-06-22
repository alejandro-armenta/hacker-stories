
/*
function getTitle(title){
  return title
}

const welcome = {
  greeting: "hello",
  title: "alejandro",
};
*/

const list=[
  {
    title:'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title:'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

function App() {
  return (

    <div>      
      <h1>My hacker stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text"/>

      <hr/>

      <ul>
        {
          list.map(
            function(item){
              return <li>{item.title}</li>
            }
          )
        }
      </ul>
    </div>
  )
}

export default App;
