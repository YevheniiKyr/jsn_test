import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

const ListWithAdd = ({list, listName, addItem, deleteItem, changeItem, setNewItem, newItem}) => {
    return (
        <div>
            <h5 style={{marginTop: '0.75rem'}}>{listName}</h5>
            {
                list.map((superpower, idx) =>
                    <Row key={idx} style={{marginTop: '0.25rem'}}>
                        <Col md={8} lg={8}>
                            <Form.Control
                                value={superpower}
                                onChange={(e) => {
                                    changeItem(idx, e.target.value)
                                }
                                }>
                            </Form.Control>
                        </Col>
                        <Col md={4} lg={4}>
                            <Button
                                variant={'outline-danger'}
                                onClick={() => deleteItem(idx)}> delete power </Button>
                        </Col>
                    </Row>
                )
            }
            <Row style={{marginTop: '0.25rem'}}>
                <Col md={8} lg={8}>
                    <Form.Control
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)
                        }
                    >
                    </Form.Control>
                </Col>
                <Col md={4} lg={4}>
                    <Button
                        onClick={() => addItem()}
                        variant={'outline-success'}
                    > add power </Button>
                </Col>
            </Row>
            
        </div>
    )
}

export default ListWithAdd;