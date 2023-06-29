import React from 'react'
import { TextField, Grid } from '@material-ui/core';
import { useFormContext,Controller } from 'react-hook-form';
import { ContactsOutlined } from '@material-ui/icons';
const CustomTextField = ({name,label}) => {
    const { control } = useFormContext();
    // console.log(control, Controller);
  return (
      <>
          <Grid item xs={12} sm={6}>
              <Controller
                  control={control}
                  defaultValue=''
                  name={name}
                  render = {({ field})=> (
                <TextField
                    fullWidth
                    {...field}
                    label={label}
                    required
                />
            )}
              />
          </Grid>
      </>
  )
}

export default CustomTextField