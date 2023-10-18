import React from 'react'

export default function CurrencyFormat({price,currency="Tk"}) {
    const priceTobeFormated = Number(price);
    const priceAsStr = price.toString()
    const priceLength = priceAsStr.length;
    let formatedPrice = priceAsStr
    if(priceTobeFormated<1000){
        formatedPrice = price;
    }else if(priceTobeFormated>=1000 && priceTobeFormated<100000){
        formatedPrice = priceAsStr.slice(0,2).concat(",").concat(priceAsStr.slice(2))
    }else if(priceTobeFormated>=100000 && priceTobeFormated<10000000) {
        // 81,36,368  length=7
        // hndrd={lngth=3(i[4-6])=>val=368}
        // thsnd={lngth=2(i[2-4])=>36}
        // lac={lngth=2(i[0-1])=>81}
        let hndrdStr = priceAsStr.substring(3);
        let thsndStr = priceAsStr.substring(1,3);
        let lacStr = ""
        if(priceLength===7){
            lacStr = priceAsStr.substring(0,2)
        }else {
            lacStr = priceAsStr.substring(0,1)
        }
        formatedPrice = lacStr.concat(",",thsndStr,",",hndrdStr);
    }
  return (
    `${formatedPrice} ${currency}`
  )
}
