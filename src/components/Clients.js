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

const HEADS = ['Nr.','Name', 'Price', 'Time', ''];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const URL = 'http://localhost:1234/';

const Clients = props => {
  const [client, setClients] = useState();
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

  const addNewClient = () => {
    fetch(URL + 'patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        'name': 'Joanna',
        'surname': 'Kowalska',
        'price': 140,
        'start': Date.now(),
        'time': 19,
        'week_day': 1,
      })
    })
      .then(res => res.json())
      .then(res => console.log(res))
    setDownload(true);
  };

  return(
    <div style={{maxWidth: 600, margin: 'auto'}}>
      <Button onClick={addNewClient}>
        Add new Client
      </Button>
      <Table >
        <TableHead>
          <TableRow>
            {HEADS.map(h => (
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {client?.map((c, idx)=> (
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
