import {
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../main";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Search from "../Search/Search";



const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);

        console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <Error message={"Error while fetching exchanges"} />;

  return (
    <>
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"center"}>
            {exchanges.map((i) => (
              <ExchangeCards
              name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
                key={i.id}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
              </>
    );
};

const ExchangeCards = ({ name, img, rank, url }) => {
  return (
    <>
      <a href={url} target={"blank"}>
        <VStack
          w={"52"}
          shadow={"lg"}
          p={"8"}
          borderRadius={"lg"}
          transition={"all 0.3s"}
          m={"4"}
          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Image
            src={img}
            w={"10"}
            h={"10"}
            objectFit={"contain"}
            alt={"Exchange"}
          />
          <Heading size={"md"} noOfLines={1}>
            {rank}
          </Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </a>

    </>
  );
  
};

export default Exchanges;
