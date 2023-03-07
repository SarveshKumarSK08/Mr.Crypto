import { Box, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import imagesrc from '../../../public/btc2.png'

const Home = () => {
  return (
    <>
    <Box bgColor={'blackAlpha.900'} w={'full'} h={"85vh"}>
      <motion.div
      style={{
        height: "80vh",

      }}
      animate={{
        translateY:"20px"
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:"reverse"
      }}
      >

      <Image 
      w={'full'}
      h={'full'}
      objectFit={'contain'}
      src={imagesrc}
      filter={'grayscale(1)'}
      />
      </motion.div>

      <Text
      fontSize={'6xl'}
      textAlign={'center'}
      fontWeight={'thin'}
      color={'whiteAlpha.700'}
      mt={'-20'}
      >
        Mr. Crypto
      </Text>

    </Box>
    </>
  )
}

export default Home