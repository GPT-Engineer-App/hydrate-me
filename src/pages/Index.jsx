import { useState } from 'react';
import { Box, Button, Flex, Heading, Input, Text, VStack, Select } from '@chakra-ui/react';
import { FaPlus, FaTint } from 'react-icons/fa';

const Index = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyIntakes, setDailyIntakes] = useState({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Water Intake (ml)',
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }]
  });
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const addWater = (amount) => {
    const updatedData = [...dailyIntakes.datasets[0].data];
    updatedData[selectedDay] += amount;
    setDailyIntakes({
      ...dailyIntakes,
      datasets: [{
        ...dailyIntakes.datasets[0],
        data: updatedData
      }]
    });
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

  const handleDayChange = (e) => {
    setSelectedDay(parseInt(e.target.value, 10));
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" p={4}>
      <Heading mb={6}>Track Your Water Intake</Heading>
      <Text fontSize="2xl" mb={4}>
        Total Water Intake: {waterIntake} ml
      </Text>
      <Select placeholder="Select day" value={selectedDay} onChange={handleDayChange} mb={4}>
        {dailyIntakes.labels.map((day, index) => (
          <option key={day} value={index}>{day}</option>
        ))}
      </Select>
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
      <svg width="100%" height="200" viewBox="0 0 100 100">
        {dailyIntakes.datasets[0].data.map((intake, index) => (
          <rect key={index} x={index * 15} y={100 - intake} width="10" height={intake} fill="blue" />
        ))}
      </svg>
    </Flex>
  );
};

export default Index;