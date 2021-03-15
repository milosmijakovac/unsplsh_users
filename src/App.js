import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESS_KEY;

    // axios.get(`${apiRoot}/search/users?client_id=${accessKey}&page=1`).then(res => console.log(res.data))

    axios
      .get(`${apiRoot}/search/users?page=1&per_page=20&query=${searchTerm}`, {
        headers: {
          Authorization: `Client-ID ${accessKey}`
        }
      })
      .then(res => setUsers(res.data));
  }, [searchTerm]);

  const filterNames = ({ name }) => {
    return name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  };

  return (
    <div className="pera">
      <Header />
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <h1>cao cao</h1>
      {searchTerm.length !==0 ? users.results.filter(filterNames).map(user => {
        return (
          <div>
            <h1>
              {user.name}
            </h1>
          </div>
        );
      }) : ''}
    </div>
  );
}

export default App;
