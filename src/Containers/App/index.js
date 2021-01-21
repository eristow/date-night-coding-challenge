import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../../Components/ColorModeSwitcher';
import Cards from '../Cards';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Cards />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
