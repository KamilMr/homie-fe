import {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [client, setClients] = useState();

  const fetchData = () => {
    fetch('http://localhost:1234/ini')
      .then(res => res.json())
      .then(res => setClients(res))
  };

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="Homie">
      {client?.map(c => (
        <div>{c.name} {c.surname} {c.price + 'zł'} {c.time + ':00'}</div>
      ))}
    </div>
  );
}

export default App;
