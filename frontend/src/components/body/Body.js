import {useState} from 'react';
import {API, Storage} from 'aws-amplify';
import "./Body.scss";
import ProgressBar from '../progress-bar/ProgressBar';
import {Button, Input, Paper, Box} from '@mui/material';


export default function Body(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [progress, setProgress] = useState(0);
  
  async function fileHandler(event) {
    try {
      console.log('props.user', props.user);
      const {attributes} = props.user;
      let fileSelected = event.target.files[0]
      setFile(fileSelected);
      setFileName(`${attributes.email}:${Date.now()}`);
    } catch (err) {
      console.error(err, err.message)
    }
  }
  
  async function startUpload() {
    try {
      console.log('startUpload file', file);
      console.log('startUpload fileName', fileName);
      const response = await Storage.put(fileName, file, {
        contentType: file.type,
        level: 'private',
        resumable: true,
        completeCallback: async (event) => {
          const token = props.user.signInUserSession.idToken.jwtToken;
          console.log("token: ", token)
          const requestData = {
            headers: {
              Authorization: token
            },
            body: {
              id: event.key,
              uid: props.user.attributes.email,
            }
          };
          
          await API.put('uploadsapi', '/uploads', requestData)
          
          console.log('Successfully uploaded', event);
        },
        progressCallback: (progress) => {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          setProgress(progress.loaded / progress.total * 100);
        },
        errorCallback: (err) => {
          console.error('Unexpected error while uploading', err);
        }
      });
      console.log('upload response', response);
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="Body">
      <Paper sx={{p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1}}>
        <Box style={{display: 'flex', justifyContent: 'space-between'}}>
          <Input type='file' id='file' onChange={fileHandler}/>
          <Button variant="contained" type='submit' onClick={startUpload}>
            Upload
          </Button>
        </Box>
        
        <ProgressBar progress={progress}/>
      </Paper>
    
    </div>
  );
}
