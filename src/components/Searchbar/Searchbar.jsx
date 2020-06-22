import React from 'react';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const Searchbar = ({ searchOptions }) => {
  const theme = useTheme();
  const matchXs = useMediaQuery(theme.breakpoints.up('xs'));

  return (
    <Box>
      <Autocomplete
        multiple
        id="tags-standard"
        size={matchXs ? 'small' : 'medium'}
        options={searchOptions.sort((a, b) => b.type.localeCompare(a.type))}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => option.option}
        filterSelectedOptions
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              color={option.color}
              variant="outlined"
              key={index}
              label={option.option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Search module, location"
            placeholder="CS2030S, COM1"
          />
        )}
      />
    </Box>
  );
};