import './ItemsList.scss';
import {API} from "aws-amplify";

export default function ItemsList(props) {
  async function getItems() {
    const token = props.user.signInUserSession.idToken.jwtToken;
  
    console.log('token: ', token);
    const resp = await API.get('uploadsapi', '/uploads/:id', {
      headers: {
        Authorization: token
      },
      response: false,
      // queryStringParameters: {
      //   'uid': props.user.attributes.email
      // }
    });
    console.log('resp', resp);
  }
  
  return (
    <div className="ItemsList">
      <div onClick={getItems}>menu</div>
    </div>
  );
}
