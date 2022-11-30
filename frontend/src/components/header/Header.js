import './Header.scss';
import {Button, Box} from '@mui/material';

export default function Header(props) {
  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between' }} className="Header">
      <div sx={{ width: '100%' }}>
        Hello {props.user.attributes.email}
      </div>
      <div sx={{ flexShrink: 0 }}>
        <Button variant="outlined" onClick={props.signOut}>Sign out</Button>
      </div>
    </Box>
  );
}
