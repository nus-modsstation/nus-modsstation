import React, { useState } from 'react';

import { findUserByEmail } from '../../services/users';

import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import { FriendsList } from './FriendsList';

export const FriendsSearch = ({ isSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const searchUser = async () => {
    const userData = await findUserByEmail(query);
    setResults(userData);
  };

  return (
    <Box width={1}>
      <FormControl style={{ width: '100%' }}>
        <InputLabel>Search user (email)</InputLabel>
        <Input
          id="search-user"
          value={query}
          onChange={handleQuery}
          placeholder="Enter user email"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="search user" onClick={searchUser}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FriendsList isSearch={true} friendsData={results} />
    </Box>
  );
};
