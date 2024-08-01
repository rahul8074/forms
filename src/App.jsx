import { useEffect, useState } from 'react'
import './App.css'
import Form from './component/Form'
import DisplayForm from './component/DisplayForm'

function App() {

const [data,setData] = useState()

useEffect(() => {
  
},[])

  return (
    <>
      <Form />
      {data && <DisplayForm/>}
    </>
  )
}

export default App
