import {useState, useEffect} from 'react';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import NewClient from './NewClient';

const HEADS = ['Nr.','Name', 'Price', 'Time', ''];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const URL = 'http://localhost:1234/';

const createEmptyClient = () => ({
  'name': '',
  'surname': '',
  'price': '',
  'start': '',
  'time': '',
  'week_day': '',
});

const Clients = props => {
  const [clients, setClients] = useState();
  const [client, setClient] = useState(createEmptyClient());
  const [add, setAdd] = useState(false);
  const [download, setDownload] = useState(true);

  const fetchData = () => {
    fetch(URL + 'ini')
      .then(res => res.json())
      .then(res => setClients(res))
    setDownload(false)
  };

  useEffect(() => {
    if(download) fetchData();
  },[download])

  const handleDelete = id => () => {
    fetch(URL + 'patient/' + id, {
      method: 'DELETE',
    }).then(res => res.json()).then(res => console.log(res));
    setDownload(true)
  }

  const handleAddClient = () => setAdd(true);
  const handleAddClientChange = key => e => {
    setClient({...client, [key]: e.target.value});
  };


  return(
    <div style={{maxWidth: 600, margin: 'auto'}}>
      <Button onClick={handleAddClient}>
        Add new Client
      </Button>
      {add && (
        <NewClient
          client={client}
          setAdd={setAdd}
          setClient={setClient}
          setDownload={setDownload}
          handleAddClientChange={handleAddClientChange}
          createEmptyClient={createEmptyClient}
          URL={URL}
        />
      )}
      <Table >
        <TableHead>
          <TableRow>
            {HEADS.map(h => (
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {clients?.map((c, idx)=> (
          <TableRow key={c._id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell> {c.name} {c.surname} </TableCell>
            <TableCell> {c.price + 'zł'} </TableCell>
            <TableCell> {DAYS[c.week_day] + ' ' +  c.time + ':00'} </TableCell>
            <TableCell>
              <IconButton disabled>
                <VisibilityIcon />
              </IconButton>
              <IconButton disabled>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete(c._id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </div>
  )
};

const styles = {
  root: {},
}

export default Clients;
