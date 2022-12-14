import React, { useEffect, useState } from "react"
import Client from "./components/Client"

const App = () => {
  const [search, setSearch] = useState("")
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const handleSearch = () => {
    setLoading(true)

    fetch(`https://demoapi.com/api/vet/clients?search=${search}`)
      .then(response => response.json())
      .then(response => {
        console.log('response here', response)
        setClients(response)
        setLoading(false)
        
        if (response.length === 0) {
          setMessage(`Sorry there is no result for '${search}'`)
        } else {
          setMessage("")
        }
      })
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <button disabled={search.length < 3} onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {clients.map(client => <Client key={client.id} client={client} />)}
      {message.length > 0 && <p>{message}</p>}
    </div>
  )
}

export default App