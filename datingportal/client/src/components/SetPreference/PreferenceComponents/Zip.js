import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Zip = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [age, setAge] = React.useState(profile.zip);

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setAge(event.target.value);
    let x = event.target.value.toString()
    profile.zip = x
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (


        <TextField fullWidth id="zip" label="Zip" placeholder="Zip" value={age} onChange={handleChange} multiline/>


  );
} 


export default Zip;