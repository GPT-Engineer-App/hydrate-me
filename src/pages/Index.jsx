import { useState } from 'react';
import { Box, Button, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { FaPlus, FaTint } from 'react-icons/fa';

const Index = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [customAmount, setCustomAmount] = useState('');

  const addWater = (amount) => {
    setWaterIntake(waterIntake + amount);
  };

  const handleCustomInput = (e) => {
    setCustomAmount(e.target.value);
  };

  const addCustomWater = () => {
    const amount = parseInt(customAmount, 10);
    if (!isNaN(amount)) {
      addWater(amount);
      setCustomAmount('');
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" p={4}>
      <Heading mb={6}>Track Your Water Intake</Heading>
      <Text fontSize="2xl" mb={4}>
        Total Water Intake: {waterIntake} ml
      </Text>
      <VStack spacing={4}>
        <Button leftIcon={<FaTint />} colorScheme="blue" onClick={() => addWater(250)}>
          Add 250ml
        </Button>
        <Button leftIcon={<FaTint />} colorScheme="blue" onClick={() => addWater(500)}>
          Add 500ml
        </Button>
        <Flex>
          <Input
            placeholder="Enter custom amount (ml)"
            value={customAmount}
            onChange={handleCustomInput}
            mr={2}
          />
          <Button leftIcon={<FaPlus />} colorScheme="green" onClick={addCustomWater}>
            Add
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Index;