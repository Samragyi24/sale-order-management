import React from 'react';
import { Switch, useColorMode } from '@chakra-ui/react';

const DarkThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      isChecked={colorMode === 'dark'}
      onChange={toggleColorMode}
      size="lg"
      colorScheme="teal"
    />
  );
};

export default DarkThemeToggle;
