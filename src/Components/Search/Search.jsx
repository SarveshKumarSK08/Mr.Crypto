import {
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../main";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { NavLink } from "react-router-dom";


const Search = () => {
  const [querys, setQuerys] = useState([]);
  const [first, setfirst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [squery, setSquery] = useState("");
  const [showResults, setShowResults] = useState(false);
 

  useEffect(() => {
    const fetchSearchQuery = async () => {
      try {
        if (squery === "") {
          setLoading(true);
          const { data } = await axios.get(`${server}/search/trending`);
          console.log(data);
          setfirst(data);
          setShowResults(true);
          setLoading(false);
        } else {
          const { data } = await axios.get(
            `${server}/search?query=${squery}&per_page=20`
          );

          console.log(data);
          setQuerys(data);
          setLoading(false);
          setShowResults(true);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    setLoading(true);
    setError(false);
    fetchSearchQuery();
  }, [squery]);

  if (error) return <Error message={"Error while fetching exchanges"} />;

  const handleChange = (e) => {
    setSquery(e.target.value);
  };

  const handleSearch = async (e) => {
    showResults(true);
    e.preventDefault();
    setLoading(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container maxW={"container.xl"}>
      <HStack justifyContent={"center"} alignItems={"center"} py={2}>
        <InputGroup>
          <Input
            type="text"
            value={squery}
            onChange={handleChange}
            placeholder="Search anything"
            name="value"
            focusBorderColor="blue.400"
            borderRadius="full"
            paddingRight="3.5rem"
            onKeyDown={handleKeyPress}
          />
          <InputRightElement width="3.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleSearch}
              bg="blue.400"
              _hover={{ bg: "blue.500" }}
              borderRadius="full"
            >
              <Icon as={BsSearch} color="white" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </HStack>

      {loading ? (
        <Loader />
      ) : (
        <>
          {showResults &&
            first.coins &&
            first.coins.length > 0 &&
            !querys.exchanges && (
              <HStack wrap={"wrap"} justifyContent={"center"}>
                <Heading size="lg" my="4">
                  Coins
                </Heading>
                {first.coins.map((i) => (
                  <SearchCard
                    name={i.item.name}
                    img={i.item.large}
                    rank={i.item.market_cap_rank}
                    // url={i.item.url}
                    key={i.item.id}
                    id={i.item.id}
                  />
                ))}
              </HStack>
            )}

          {showResults &&
            ((querys.coins && querys.coins.length > 0) ||
              (querys.exchanges && querys.exchanges.length > 0)) && (
              <>
                {querys.coins && querys.coins.length > 0 && (
                  <HStack wrap={"wrap"} justifyContent={"center"}>
                    <Heading size="lg" my="4">
                      Coins
                    </Heading>
                    {querys.coins.map((i) => (
                      <SearchCard
                        name={i.name}
                        img={i.large}
                        rank={i.market_cap_rank}
                        key={i.id}
                        id={i.id}
                      />
                    ))}
                  </HStack>
                )}
                {querys.exchanges && querys.exchanges.length > 0 && (
                  <HStack wrap={"wrap"} justifyContent={"center"}>
                    <Heading size="lg" my="4">
                      Exchanges
                    </Heading>
                    {querys.exchanges.map((i) => (
                      <ExchangeCard
                        name={i.name}
                        img={i.large}
                        rank={i.market_cap_rank}
                        key={i.id}
                        id={i.id}
                      />
                    ))}
                  </HStack>
                )}
              </>
            )}
        </>
      )}
    </Container>
  );
};

export const SearchCard = ({ id, name, img, rank }) => {
  return (
    <>
      <NavLink to={`/coin/${id}`} target={"blank"}>
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
            {rank}
          </Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </NavLink>
    </>
  );
};
export const ExchangeCard = ({ id, name, img, rank, url }) => {
  return (
    <>
      <NavLink to={`/exchange`} target={"blank"}>
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
            {rank}
          </Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </NavLink>
    </>
  );
};

export default Search;
