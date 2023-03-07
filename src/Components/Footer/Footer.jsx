import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import FImage from '../../../public/download.png';

const Footer = () => {
  return <>
  <Box
  bgColor={'blackAlpha.900'}
  color={'whiteAlpha.700'}
  minH={'48'}
  px={'16'}
  py={['16','8']}
  >

        <Stack
        direction={['column','row']}
        h={'full'}
        alignItems={'center'}
        >
            <VStack
            w={'full'}
            alignItems={['center','flex-start']}
            >
<Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center','left']}>We are India's top app for tracking cryptocurrency prices, and we offer our advice for a very affordable fee.</Text>

            </VStack>

            <VStack>
<Avatar  boxSize={'28'} mt={['4','0']}
src={FImage}/>
<Text>Our Founder</Text>
            </VStack>

        </Stack>
  </Box>
  </>;
};

export default Footer;
