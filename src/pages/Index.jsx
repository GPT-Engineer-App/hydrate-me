import { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { FaPlus, FaTint } from 'react-icons/fa';
import { addWeeks, startOfWeek, format } from 'date-fns';

const Index = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [selectedWeekStart, setSelectedWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [weeklyIntakes, setWeeklyIntakes] = useState([]);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    const data = Array(7).fill().map((_, i) => Math.floor(Math.random() * 500));
    setWeeklyIntakes(data);
  }, [selectedWeekStart]);

  const addWater = (amount) => {
    setWaterIntake(prev => prev + amount);
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
        <Button onClick={() => setSelectedWeekStart(addWeeks(selectedWeekStart, -1))}>Previous Week</Button>
        <Button onClick={() => setSelectedWeekStart(addWeeks(selectedWeekStart, 1))}>Next Week</Button>
        <Text>Week of {format(selectedWeekStart, 'MMM dd, yyyy')}</Text>
      </VStack>
      <svg width="100%" height="200" viewBox="0 0 100 100">
        {weeklyIntakes.map((intake, index) => (
          <rect key={index} x={index * 15} y={100 - intake} width="10" height={intake} fill="blue" />
        ))}
      </svg>
    </Flex>
  );
};

export default Index;