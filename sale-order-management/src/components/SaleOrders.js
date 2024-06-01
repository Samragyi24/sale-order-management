import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import ActiveSaleOrders from './ActiveSaleOrders';
import CompletedSaleOrders from './CompletedSaleOrders';

const SaleOrders = () => {
  return (
    <Box p={4}>
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ActiveSaleOrders />
          </TabPanel>
          <TabPanel>
            <CompletedSaleOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SaleOrders;
