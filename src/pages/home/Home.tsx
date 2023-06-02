import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useBoolean,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ViteIcon from './vite.svg';

const MotionBox = motion(Box);

const Home = () => {
  const [message, setMessage] = useState('');
  const [isSending, { on: onStartSending, off: onSent }] = useBoolean();

  return (
    <Flex alignItems="center" direction="column" height="100%">
      <Box as="header" padding="4" alignSelf="start">
        Web application template
      </Box>
      <VStack flex="1" justifyContent="center" gap="10">
        <Card borderRadius="xl">
          <CardBody>
            <Heading>Hello world!</Heading>
          </CardBody>
        </Card>
        <MotionBox
          animate={{
            x: ['-100%', '-100%', '100%', '100%', '-100%'],
            rotateY: [0, 180, 180, 0, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Box fontSize="8xl" lineHeight="1" position="relative">
            <Box fontFamily="'Noto Color Emoji', sans-serif">🐳</Box>
            <Box
              position="absolute"
              bottom="0"
              right="0"
              width="0.5em"
              height="0.5em"
              background={`url(${ViteIcon}) center/cover no-repeat`}
            />
          </Box>
        </MotionBox>
        <HStack>
          <Button onClick={() => window.electronAPI.testIPC().then(setMessage)}>Test IPC</Button>
          <Button onClick={() => setMessage('')}>Clear IPC</Button>
        </HStack>
        <Text>IPC Message: {message}</Text>
        <Button
          onClick={() => {
            onStartSending();
            window.electronAPI.sendMail().then(onSent, onSent);
          }}
          isLoading={isSending}
        >
          Send Test Mail
        </Button>
      </VStack>
      <Box as="footer">v1.0.0</Box>
    </Flex>
  );
};

export default Home;
