import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Smoke = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [age, setAge] = React.useState(profile.smoke);

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setAge(event.target.value);
    let x = event.target.value.toString()
    profile.smoke = x
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (

  <FormControl sx={{width: 200, textAlign: "left", marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Smoke</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value={'Trying to quit'}>Trying to quit</MenuItem>
          <MenuItem value={'Never'}>Never</MenuItem>
          <MenuItem value={'Socially'}>Socially</MenuItem>
          <MenuItem value={'Rarely'}>Rarely</MenuItem>
          <MenuItem value={'Often'}>Often</MenuItem>
          <MenuItem value={'Often'}>Very often</MenuItem>
 
        </Select>
      </FormControl>

  );
} 


export default Smoke;