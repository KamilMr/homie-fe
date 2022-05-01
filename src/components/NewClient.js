import {
  Button,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const NewClient = ({
    handleAddClientChange,
    client,
    setAdd,
    setClient,
    setDownload,
    createEmptyClient,
    URL,
  }) => {

  const handleCancelAdd = () => setAdd(false);

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
    setClient(createEmptyClient())
    setAdd(false)
  };

    return (
        <div>
          {['name', 'surname', 'price', 'time'].map(t => (
            <TextField
              key={t}
              label={t}
              size="small"
              value={client && client[t]}
              onChange={handleAddClientChange(t)}
            />
          ))}
          <Select
            style={{width: '60%'}}
            value={client?.week_day}
            onChange={handleAddClientChange('week_day')}
          >
            {DAYS.map((d, idx) => (
              <MenuItem key={d} value={idx}>{d}</MenuItem>
            ))}
          </Select>
          <div>
            <Button onClick={handleCancelAdd}>
              Cancel
            </Button>
            <Button onClick={addNewClient}>
             Save
            </Button>
          </div>
        </div>
    );
  };

export default NewClient;
