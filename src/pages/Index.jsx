import { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaPlus, FaTint } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  const addWater = (amount) => {
    const today = new Date().getDay();
    const updatedData = [...dailyIntakes.datasets[0].data];
    const newAmount = updatedData[today] + amount;
    updatedData[today] = newAmount;
    setDailyIntakes({
      ...dailyIntakes,
      datasets: [{
        ...dailyIntakes.datasets[0],
        data: updatedData
      }]
    });
    setWaterIntake(prev => prev + amount);
      ...dailyIntakes,
      datasets: [{
        ...dailyIntakes.datasets[0],
        data: updatedData
      }]
    });
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
      <Bar data={dailyIntakes} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Weekly Water Intake' } } }} />
      </VStack>
    </Flex>
  );
};

export default Index;