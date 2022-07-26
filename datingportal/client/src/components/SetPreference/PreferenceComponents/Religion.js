import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Religion = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [age, setAge] = React.useState(profile.religion);

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setAge(event.target.value);
    let x = event.target.value.toString()
    profile.religion = x
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (

  <FormControl sx={{width: 200, textAlign: "left", marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Religion</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Religion"
          onChange={handleChange}
        >
         <MenuItem value={'Christian'}>Christian</MenuItem>
          <MenuItem value={'Catholic'}>Catholic</MenuItem>
          <MenuItem value={'Muslim'}>Muslim</MenuItem>
          <MenuItem value={'Buddhist'}>Buddhist</MenuItem>
          <MenuItem value={'Agnostic'}>Agnostic</MenuItem>
          <MenuItem value={'Atheist'}>Atheist</MenuItem>
          <MenuItem value={'Spiritual'}>Spiritual</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
      </FormControl>

  );
} 


export default Religion;