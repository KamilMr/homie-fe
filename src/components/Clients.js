import {useState, useEffect} from 'react';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const HEADS = ['Nr.','Name', 'Price', 'Time', ''];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const URL = 'http://localhost:1234/';

const createEmptyClient = () => ({
  'name': '',
  'surname': '',
  'price': null,
  'start': null,
  'time': null,
  'week_day': null,
});

const Clients = props => {
  const [clients, setClients] = useState();
  const [client, setClient] = useState();
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
  const handleCancelAdd = () => setAdd(false);
  const handleAddClientChange = key => e => {
    setClient({...client, [key]: e.target.value});
  };

  const addNewClient = () => {

    fetch(URL + 'patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(client)
    })
      .then(res => res.json())
      .then(res => console.log(res))
    setDownload(true);
    setClient(null)
    setAdd(false)
  };

  return(
    <div style={{maxWidth: 600, margin: 'auto'}}>
      <Button onClick={handleAddClient}>
        Add new Client
      </Button>
      {add && (
        <div>
          {['name', 'surname', 'price', 'time'].map(t => (
            <TextField
              label={t}
              size="small"
              value={client && client[t]}
              onChange={handleAddClientChange(t)}
            />
          ))}
          <div>
            <Button onClick={handleCancelAdd}>
              Cancel
            </Button>
            <Button onClick={addNewClient}>
             Save
            </Button>
          </div>
        </div>
      ) }
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
