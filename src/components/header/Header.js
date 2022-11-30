import './Header.scss';
import {Button, Box, Typography} from '@mui/material';

export default function Header(props) {
  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between' }} className="Header">
      <Typography sx={{ alignSelf: 'center'}}>{props.user.attributes.email}</Typography>
      <Box sx={{ flexShrink: 0 }}>
        <Button variant="primary" onClick={props.signOut}>Sign out</Button>
      </Box>
    </Box>
  );
}
