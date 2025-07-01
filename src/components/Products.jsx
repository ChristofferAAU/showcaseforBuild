import React, { useEffect, useState } from "react"
import './Products.css'

function ProductCard(product){
    const [metric, setMetric] = useState(0);

    function setToKg(){
        setMetric(0);
    };
    function setToTon(){
        setMetric(1);
    };
    function setToM3(){
        setMetric(2);
    }

    if(typeof product === 'string'){
        return(<div id="main">
            <p>Is loading...</p>
        </div>)
    };

    let units = [[],[],[]];

    console.log(product.gwpValues.length);
    console.log(Object.entries(product.gwpValues[0]));

    for(let i = 0; i < product.gwpValues.length; i++){
        switch (product.gwpValues[i].gwpUnit){
            case "kg":
            if(units[0].length == 0){
                Object.entries(product.gwpValues[i]).forEach((element, index) => 
                {if(element[1] != null && index != 0)
                    {units[0].push(<li>{element[0]}: {element[1]}</li>)}});
            };
            
            break;
            case "ton":
            if(units[1].length == 0){
                Object.entries(product.gwpValues[i]).forEach((element, index) => 
                {if(element[1] != null && index != 0)
                    {units[1].push(<li>{element[0]}: {element[1]}</li>)}});
            };

            break;
            case "m3":
            
            if(units[2].length == 0){Object.entries(product.gwpValues[i]).forEach((element, index) => 
                {if(element[1] != null && index != 0)
                    {units[2].push(<li>{element[0]}: {element[1]}</li>)}});
                }
            break;
        }
    }

return(    
    <>
        <div id="main">
            <div id="column" className="left">
            <img src={product.epdFrontPageURL} alt="Frontpage" width="200" height="300"/>
            </div>
            <div id="column" className="center">
                <h2>{product.productName}</h2>
                <h3>Beskrivelse:</h3>
                <p>{product.description}</p>
            </div>
            <div id="column">
                <p>Standard<br/>{product.compliance[0]} + {product.compliance[1]}</p>
                <p>Producent<br/>{product.producerName}</p>
                <p>Materiale</p>
                <p>Land<br/>{product.country.long}</p>
                <p>Miljø påvirkelse</p>
                <div id="row">
                    <ul id="list">{units[metric]}</ul>
                    <div id="rowcolumn">
                        <button id="button" onClick={setToKg}>Kg</button>
                        <button id="button" onClick={setToTon}>Ton</button>
                        <button id="button" onClick={setToM3}>M3</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

async function getJsonData(url) {
    let jdata = [];
    for(let i = 0; i < url.length; i++)
        await fetch(url[i]).then((response) => response.json()).then((json) => jdata.push(json));

    return jdata;
}

function ProductPage(){
    const [productData, setData] = useState(['./public/Auto.json', './public/auto2.json']);
    
    useEffect(() => {
        async function getdata(){
            const productfetch = await getJsonData(productData);
            setData(productfetch);
            console.log(productfetch);

        }
        getdata().then();
    }, [productData]);

    const products = [];

    productData.forEach((element) => {if(element != null){products.push(ProductCard(element))}});

    return(    <>
    <header>
      <h1>Products</h1>
    </header>
    <div>
        <ul>
            {products}
        </ul>
    </div>
    </>)
}

export default ProductPage