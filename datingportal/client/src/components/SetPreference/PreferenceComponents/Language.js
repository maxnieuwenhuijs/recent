import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Language = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [age, setAge] = React.useState(profile.language);

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setAge(event.target.value);
    let x = event.target.value.toString()
    profile.language = x
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (

  <FormControl sx={{width: 200, textAlign: "left", marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={'English'}>English</MenuItem>
          <MenuItem value={'Spanish'}>Spanish</MenuItem>
          <MenuItem value={'French'}>French</MenuItem>
          <MenuItem value={'German'}>German</MenuItem>
          <MenuItem value={'Italian'}>Italian</MenuItem>
          <MenuItem value={'Russian'}>Russian</MenuItem>
          <MenuItem value={'Portuguese'}>Portuguese</MenuItem>
          <MenuItem value={'Turkish'}>Turkish</MenuItem>
          <MenuItem value={'Czech'}>Czech</MenuItem>
          <MenuItem value={'Greek'}>Greek</MenuItem>
          <MenuItem value={'Malay'}>Malay</MenuItem>
          <MenuItem value={'Arabic'}>Arabic</MenuItem>
          <MenuItem value={'Dutch'}>Dutch</MenuItem>
          <MenuItem value={'Chinese'}>Chinese</MenuItem>

      </Select>
      </FormControl>

  );
} 


export default Language;