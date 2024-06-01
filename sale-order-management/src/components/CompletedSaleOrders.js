import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';

const CompletedSaleOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'Alice Johnson', price: 300, lastModified: '2024-05-28' },
    { id: 2, customerName: 'Bob Brown', price: 400, lastModified: '2024-05-27' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleViewClick = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Last Modified</Th>
            <Th>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customerName}</Td>
              <Td>{order.price}</Td>
              <Td>{order.lastModified}</Td>
              <Td>
                <Button onClick={() => handleViewClick(order)}>View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentOrder && (
              <form>
                <FormControl id="customerName">
                  <FormLabel>Customer Name</FormLabel>
                  <Input
                    type="text"
                    value={currentOrder.customerName}
                    isReadOnly
                  />
                </FormControl>
                <FormControl id="price" mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    value={currentOrder.price}
                    isReadOnly
                  />
                </FormControl>
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CompletedSaleOrders;
