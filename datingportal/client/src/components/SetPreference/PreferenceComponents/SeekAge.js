import * as React from 'react';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
function valuetext(value) {
  return `${value}`;
}

export default function Rangeslider() {
  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [value, setValue] = React.useState([profile.age_from, profile.age_to]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAge(newValue);

    setAge(event.target.value);
    let x1 = newValue[0];
    let x2 = newValue[1];
    profile.age_from = x1;
    profile.age_to = x2;
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };

  const setAge = (newValue) => {
     console.log(newValue)
  }

  const marks = [
  {
    value: 18,
    label: '18',
  },
  {
    value: 100,
    label: '100',
  },
];
  

  return (
 <FormControl sx={{width: 300, marginLeft: 10}}>
<Typography id="input-slider" gutterBottom>
        Preferred age
      </Typography>
    <Slider
      getAriaLabel={() => 'Age select'}
      value={value}
      min={18}
      max={100}
      onChange={handleChange}
      valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={marks}
      />
      
       </FormControl>
  );
}