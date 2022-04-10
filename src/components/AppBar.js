import AppBarMui from '@mui/material/AppBar';
import { Typography  } from '@mui/material';

import {format} from 'date-fns';

const AppBar = props => {
  const date = format(new Date(), 'H:mm dd/MM/yyyy');

  return (
    <AppBarMui >
      <div style={styles.root}>
        <Typography variant="h5">Homie</Typography>
        <Typography variant="h6">Dziś jest {date}</Typography>
      </div>
    </AppBarMui>
  )
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10,
  }
};
export default AppBar;
