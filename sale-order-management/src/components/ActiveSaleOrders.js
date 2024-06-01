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
  Input,
} from '@chakra-ui/react';
import Select from 'react-select';

const productOptions = [
  { value: 'product1', label: 'Product 1' },
  { value: 'product2', label: 'Product 2' },
  { value: 'product3', label: 'Product 3' },
];

const ActiveSaleOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, products: [{ value: 'product1', label: 'Product 1' }], customerName: 'John Doe', price: 100, lastModified: '2024-05-30' },
    { id: 2, products: [{ value: 'product2', label: 'Product 2' }], customerName: 'Jane Smith', price: 200, lastModified: '2024-05-29' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isNewOrder, setIsNewOrder] = useState(false);


  const handleEditClick = (order) => {
    setCurrentOrder(order);
    setIsNewOrder(false);
    setIsModalOpen(true);
  };

  const handleProductChange = (selectedOptions, order) => {
    const updatedOrders = orders.map(o =>
      o.id === order.id ? { ...o, products: selectedOptions } : o
    );
    setOrders(updatedOrders);
  };

  const handleAddOrderClick = () => {
    setCurrentOrder({ id: null, products: [], customerName: '', price: '', lastModified: '' });
    setIsNewOrder(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (isNewOrder) {
      const newOrder = {
        ...currentOrder,
        id: orders.length + 1,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setOrders([...orders, newOrder]);
    } else {
      const updatedOrders = orders.map(o =>
        o.id === currentOrder.id ? { ...currentOrder, lastModified: new Date().toISOString().split('T')[0] } : o
      );
      setOrders(updatedOrders);
    }
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Button colorScheme="teal" onClick={handleAddOrderClick} mb={4}>+Sale Order</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Products</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Last Modified</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>
                <Select
                  isMulti
                  options={productOptions}
                  value={order.products}
                  onChange={(selectedOptions) => handleProductChange(selectedOptions, order)}
                />
              </Td>
              <Td>{order.customerName}</Td>
              <Td>{order.price}</Td>
              <Td>{order.lastModified}</Td>
              <Td>
                <Button onClick={() => handleEditClick(order)}>Edit</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isNewOrder ? 'Add New Order' : 'Edit Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentOrder && (
              <form>
                <FormControl id="products" isRequired>
                  <FormLabel>Products</FormLabel>
                  <Select
                    isMulti
                    options={productOptions}
                    value={currentOrder.products}
                    onChange={(selectedOptions) => setCurrentOrder({ ...currentOrder, products: selectedOptions })}
                  />
                </FormControl>
                <FormControl id="customerName" isRequired mt={4}>
                  <FormLabel>Customer Name</FormLabel>
                  <Input
                    type="text"
                    value={currentOrder.customerName}
                    onChange={(e) =>
                      setCurrentOrder({ ...currentOrder, customerName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="price" isRequired mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    value={currentOrder.price}
                    onChange={(e) =>
                      setCurrentOrder({ ...currentOrder, price: e.target.value })
                    }
                  />
                </FormControl>
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActiveSaleOrders;
