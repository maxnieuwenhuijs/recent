import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Race = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [age, setAge] = React.useState(profile.headline);

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setAge(event.target.value);
    let x = event.target.value.toString()
    profile.headline = x
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (

      <FormControl >
        <TextField id="headline" label="Headline" placeholder="Headline" value={age} onChange={handleChange} multiline/>
      </FormControl>

  );
} 


export default Race;