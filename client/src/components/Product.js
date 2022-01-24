import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'


const Product = () => {

    var x = localStorage.getItem("selected");
    console.log(x);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (data.length == 0) {



            fetch("https://s3.amazonaws.com/open-to-cors/assignment.json")
                .then(res => res.json())
                .then(data => setData(data))



        }
    }, [])
    var items = [];
    if (data.products !== undefined) {


        items = Object.values(data.products)


    }
    items.sort((a, b) => {
        return b.popularity - a.popularity;
    })

    console.log(items)
    console.log(x.includes('Product'))

    return <div>

        {data.products == undefined ? (
            <h1>Loading...</h1>
        ) : (

            <>
                <Row className='align-items-center'>
                    <Col>
                        <h1>Most Popular Products</h1>
                    </Col>
                </Row>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            {x.includes('Product') && (<th>Product ID</th>)}
                            {x.includes('subcategory') && (<th>Subcategory</th>)}
                            {x.includes('title') && (<th>Title</th>)}
                            {x.includes('price') && (<th>Price</th>)}
                            {x.includes('popularity') && (<th>Popularity</th>)}
                            {x.includes('Description') && (<th>Description</th>)}
                        </tr>
                    </thead>
                    {

                        <tbody>
                            {items.map((product, index) => (
                                <tr key={index + 1}>
                                    {x.includes('Product') && (<td>{index + 1}</td>)}
                                    {x.includes('subcategory') && (<td>{product.subcategory}</td>)}
                                    {x.includes('title') && (<td>{product.title}</td>)}
                                    {x.includes('price') && (<td>{product.price}</td>)}
                                    {x.includes('popularity') && (<td>{product.popularity}</td>)}
                                    {x.includes('Description') && (<td>Good Product</td>)}
                                </tr>
                            ))}
                        </tbody>}
                </Table>

            </>
        )}
    </div>;
};

export default Product;
