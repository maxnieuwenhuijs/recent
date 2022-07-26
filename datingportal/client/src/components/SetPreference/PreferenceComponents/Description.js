import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Race = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [age, setAge] = React.useState(profile.description);

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setAge(event.target.value);
    let x = event.target.value.toString()
    profile.description = x
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (

      <FormControl >
        <TextField id="description" label="Description" placeholder="Description" rows={4} value={age} onChange={handleChange} multiline/>
      </FormControl>

  );
} 


export default Race;