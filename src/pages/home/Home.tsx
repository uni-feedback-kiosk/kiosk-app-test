import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  VStack,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ViteIcon from './vite.svg';

const MotionBox = motion(Box);

const Home = () => {
  const toast = useToast();
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
          <Button
            onClick={() =>
              window.electronAPI.testIPC().then((result) =>
                toast({
                  description: result.ok ? 'Success' : result.error,
                  status: result.ok ? 'success' : 'error',
                }),
              )
            }
          >
            Test IPC
          </Button>
        </HStack>
        <Button
          onClick={() => {
            onStartSending();
            window.electronAPI.sendMail().then((result) => {
              if (!result.ok) {
                toast({ description: result.error, status: 'error' });
              }
              onSent();
            });
          }}
          isLoading={isSending}
        >
          Send Test Mail
        </Button>
      </VStack>
      <Box as="footer">v1.1.3</Box>
    </Flex>
  );
};

export default Home;
