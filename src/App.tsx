import { gql, useQuery } from "@apollo/client"

import { client } from "./lib/apollo"

interface Lesson{
  id:string;
  title:string;
}

const GET_LESSONS_QUERY = gql`
  query{
    lessons{
      id
      title
      teacher{
        name
      }
    }
  }
`
function App() {
  const {data }= useQuery<{lessons:Lesson[]}>(GET_LESSONS_QUERY)
  console.log(data)

  return (
    <ul>
      {
        data?.lessons.map((lesson)=>{
          return(
            <li key={lesson.id}>{lesson.title}</li>
          )
        })
      }
    </ul>
  )
}

export default App
