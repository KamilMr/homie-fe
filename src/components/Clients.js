import {useState, useEffect} from 'react';
import {
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

  const fetchData = () => {
    fetch(URL + 'ini')
      .then(res => res.json())
      .then(res => setClients(res))
  };

  useEffect(() => {
    fetchData();
  },[])

  const handleDelete = id => () => {
    fetch(URL + 'patient/' + id, {
      method: 'DELETE',
    }).then(res => res.json()).then(res => console.log(res));
  }

  return(
    <Table style={{maxWidth: 600, margin: 'auto'}}>
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
  )
};

const styles = {
  root: {},
}

export default Clients;
