import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {server} from "../index"
import { Button, Container, HStack, Heading, RadioGroup, VStack } from '@chakra-ui/react';
import Loader from './Loader';
// import { wrap } from 'framer-motion';
// import { Image } from '@chakra-ui/react';
// import { Text } from '@chakra-ui/react';
// import { css } from '@emotion/react';
// import { Link } from '@chakra-ui/react';
import { Radio } from '@chakra-ui/react';
import CoinCard from './CoinCard';

const Coins = () => {

    const[coins,setCoins] = useState([]);
    const[loading,setLoading] = useState(true);
    const[page,setpage] = useState(1);
    const[currency,setCurrency] = useState("inr");

    const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$"

    const changePage = (page)=>{
        setpage(page);
        setLoading(true);
    }

    const btns = new Array(132).fill(1);

     useEffect(() => {
      const fetchCoins = async()=>{
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        
        setCoins(data);
        setLoading(false);
      };
      fetchCoins();
    }, [currency,page])
    

  return (
    <Container maxW={"container.xl"}>
        {
            loading ?( <Loader /> ): (<>

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                    <Radio value={"inr"} >INR</Radio>
                    <Radio value={"usd"} >USD</Radio>
                    <Radio value={"eur"} >EUR</Radio>
                </HStack>
            </RadioGroup>
            
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                {
                    coins.map((i)=>(
                        <CoinCard id={i.id} key={i.id} name={i.name} price={i.current_price} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol}/>
                    )

                    )
                }
            </HStack>
            <HStack w={"full"} overflow={"auto"} p={"8"}>
                {
                    btns.map((item,index)=>(
                        <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1)}>{index+1}</Button>

                    ))
                }
            </HStack>
            
            </>
        )}
    </Container>
  );
};



export default Coins;
