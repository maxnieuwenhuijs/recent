import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Race = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [age, setAge] = React.useState();

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setAge(event.target.value);
    let x = event.target.value.toString()
    profile.race = x
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (

   <FormControl sx={{width: 200, textAlign: "left", marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Race</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Race"
          onChange={handleChange}
        >
          <MenuItem value={'Caucasian/White'}>Caucasian/White</MenuItem>
          <MenuItem value={'Asian'}>Asian</MenuItem>
          <MenuItem value={'Hispanic/Latino'}>Hispanic/Latino</MenuItem>
          <MenuItem value={'African/Black'}>African/Black</MenuItem>
          <MenuItem value={'Indian'}>Indian</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
      </FormControl>

  );
} 


export default Race;