import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { HOME } from '../../Constants/pages';

import {
    GET_PRODUCTS_BY_ID,
    PUT_EDIT_PRODUCT,
} from '../../Services/apiService';

import { GET_ALL_CATEGORY } from '../../Services/CategoryApiService';

export default function UpdateProduct({ match, location }) {
    const history = useHistory();
    const [category, setCategory] = useState(null);
    const [productID, setProductID] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [brand, setBrand] = useState(null);
    const [gender, setGender] = useState(null);
    const [size, setSize] = useState(null);
    const [imageName, setImageName] = useState(null);

    useEffect(() => {
        console.log(location);
        console.log(match.params.id);
        GET_PRODUCTS_BY_ID(match.params.id)
            .then((response) => {
                console.log(
                    'messages from respone UpdateProduct:',
                    response.data
                );
                setProductID(response.data.id);
                setName(response.data.name);
                setPrice(response.data.price);
                setBrand(response.data.categoryId);
                setGender(response.data.gender);
                setSize(response.data.size);
                setImageName(response.data.imagePath);
            })
            .catch((error) => {
                console.error('messsage from update component:', error);
            });

        GET_ALL_CATEGORY()
            .then((response) => {
                console.log(
                    'messages from respone UpdateProduct:',
                    response.data
                );
                setCategory(response.data);
            })
            .catch((error) => {
                console.error('messsage from update component:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Price', price);
        formData.append('CategoryId', brand);
        formData.append('Gender', gender);
        formData.append('Size', size);
        formData.append('ImageFile', imageName);

        PUT_EDIT_PRODUCT(productID, formData)
            .then((response) => {
                console.log('Message from put Product:', response);
                history.push(HOME);
            })
            .catch((error) => {
                console.log(error);
                console.log(formData);
            });
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product's name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product's price'"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Brand</Form.Label>
                        <Form.Select
                            value={brand}
                            onChange={(event) => setBrand(event.target.value)}
                        >
                            <option>Choose...</option>
                            {category &&
                                category.map((c, index) => (
                                    <option value={c.id}>{c.name}</option>
                                ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            value={gender}
                            onChange={(event) => setGender(event.target.value)}
                        >
                            <option>Choose...</option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Size</Form.Label>
                        <Form.Select
                            value={size}
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option>Choose...</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        defaultvalue={imageName}
                        onChange={(event) =>
                            setImageName(event.target.files[0])
                        }
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to="/" type="button" className="btn btn-secondary">
                    Cancel
                </Link>
            </Form>
        </div>
    );
}
