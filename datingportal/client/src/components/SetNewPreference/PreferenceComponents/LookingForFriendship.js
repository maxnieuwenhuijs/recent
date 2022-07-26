import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const LookingForFriend = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [age, setAge] = React.useState();

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setAge(event.target.value);
    let x = event.target.value.toString()
    profile.looking_for = x
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (

  <FormControl sx={{width: 200, textAlign: "left", marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Looking for"
          onChange={handleChange}
        >
          <MenuItem value={'Friendship'}>Friendship</MenuItem>
          <MenuItem value={'Interests'}>Interests</MenuItem>
          <MenuItem value={'Share'}>Share</MenuItem>
          <MenuItem value={'Marriage'}>Marriage</MenuItem>
          <MenuItem value={'PenPal'}>PenPal</MenuItem>
 
        </Select>
      </FormControl>

  );
} 


export default LookingForFriend;