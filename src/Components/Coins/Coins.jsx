import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../main";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import CoinsCard from "./CoinsCard";


const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr")

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
        try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}&per_page=20`);

        console.log(data);
        setCoins(data);
        setLoading(false);
      }

      catch (error) {
        setLoading(false);
        setError(true)
      }
    }
      fetchCoins();
    }, [currency, page]);

    if(error) return <Error message={"Error while fetching coins"}/>


    const prevPage = page > 1 ? page - 1 : null;
const nextPage = page < 132 ? page + 1 : null;
const pbtns = [];
if (prevPage !== null) pbtns.push(prevPage);
pbtns.push(page);
if (nextPage !== null) pbtns.push(nextPage);

const changePage = (newPage) => {
  const validPage = Math.max(0, Math.min(newPage, 132));
  setPage(validPage);
  setLoading(true);
};

const renderPreviousButton = () => {
  if (prevPage !== null) {
    return (
      <Button
        bgColor={'blackAlpha.900'} 
        color={'white'} 
        onClick={() => changePage(prevPage)}
      >
        {"<"}
      </Button>
    );
  } else {
    return null;
  }
};

const renderNextButton = () => {
  if (nextPage !== null) {
    return (
      <Button
        bgColor={'blackAlpha.900'} 
        color={'white'} 
        onClick={() => changePage(nextPage)}
      >
        {">"}
      </Button>
    );
  } else {
    return null;
  }
};    

    

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
          <HStack spacing={'4'}>
            <Radio value={'inr'}>INR</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>
          </HStack>
        </RadioGroup>


          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {coins.map((i) => (
              <CoinsCard
                id={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
                key={i.id}
              />
            ))}
          </HStack>


<HStack w={'full'} p={'8'} overflowX={"auto"} justifyContent={'center'}>
  {renderPreviousButton()}
  {pbtns.map((item, index) => (
    <Button
      key={index} 
      bgColor={'blackAlpha.900'} 
      color={'white'} 
      onClick={() => changePage(item)}
    >
      {item}
    </Button>
  ))}
  {renderNextButton()}
</HStack>
        </>
      )}
    </Container>
  );
};



export default Coins;
