import {useEffect, useState} from 'react';
import {API, Storage} from 'aws-amplify';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  LinearProgress,
  Box,
  Typography,
  Modal
} from '@mui/material';
import {Preview} from '@mui/icons-material';
import * as moment from 'moment'
import Image from 'mui-image';

import './ItemsList.scss';
import config from '../../aws-exports';

function PreviewModal({item}) {
  const [fileUrl, setFileUrl] = useState(null);
  
  async function fetchImage(fileId) {
    return await Storage.get(fileId, {
      level: 'private',
      bucket: config.aws_user_files_s3_bucket,
      region: config.aws_user_files_s3_bucket_region,
    });
  }
  
  useEffect(() => {
    async function fetch() {
      const url = await fetchImage(item.original_file);
      setFileUrl(url);
    }
    
    fetch();
  }, []);
  
  
  return (
    <div className="preview-modal">
      <Box className="ModalBody">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {!!fileUrl ? <Image fit="scale-down" src={fileUrl}/> : 'Loading...'}
        </Typography>
      </Box>
    </div>
  )
}

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const [openedItem, setOpenedItem] = useState(null);
  
  const [open, setOpen] = useState(false);
  const handleOpen = (item) => {
    setOpen(true);
    setOpenedItem(item);
  };
  const handleClose = () => setOpen(false);
  
  
  useEffect(() => {
    async function fetchItems() {
      const resp = await API.get('apistage', '/requests', {
        response: false,
      });
      console.log('resp', resp);
      setItems(resp.body
        .map((item) => ({...item, is_processed: !!item.processed_file}))
        .sort((a, b) => getItemTimestamp(a) < getItemTimestamp(b) ? 1 : -1)
      );
    }
    
    setInterval(() => {
      setProgress((progress) => progress >= 99 ? 1 : ++progress);
    }, 1000);
    
    setInterval(() => {
      fetchItems();
    }, 10000);
    
    fetchItems();
  }, []);
  
  function getItemTimestamp(item) {
    const timestamp = item.original_file.split(':').pop();
    return Number(timestamp);
  }
  
  function formatItemName(item) {
    return moment(getItemTimestamp(item)).calendar();
  }
  
  return (
    <div className="ItemsList">
      <List>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding secondaryAction={
            <IconButton edge="end" aria-label="view" onClick={() => handleOpen(item)}>
              <Preview/>
            </IconButton>
          }>
            <ListItemButton>
              {item.is_processed ? <ListItemText primary={formatItemName(item)}/> : <>
                <ListItemText primary={formatItemName(item)}/>
                <LinearProgress sx={{width: '100%', height: '20px'}} variant="determinate" value={progress}/>
              </>
              }
            </ListItemButton>
          </ListItem>
        ))}
        <Divider/>
      </List>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PreviewModal item={openedItem}/>
      </Modal>
    </div>
  );
}
