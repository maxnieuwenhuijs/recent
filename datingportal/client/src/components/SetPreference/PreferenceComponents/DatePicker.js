

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';

const Datepicker = (props) => {

  const profileInStorage = localStorage.getItem(`userProfile`);
  const profile = JSON.parse(profileInStorage)

  const [value, setValue] = React.useState(new Date(profile.birthdate));

  const handleChange = (event) => {
    const profileInStorage = localStorage.getItem(`userProfile`);
    const profile = JSON.parse(profileInStorage)
    setValue(event);
    // let x = event.toString()
    profile.birthdate = event
    const upload = JSON.stringify(profile)
    localStorage.setItem(`userProfile`, upload);
  };
 
  return (

    <LocalizationProvider dateAdapter={DateAdapter}  >
        <DesktopDatePicker
          label="Birthdate"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} /> }
              />
    </LocalizationProvider>

  );
} 


export default Datepicker;