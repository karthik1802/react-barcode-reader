import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import AppContext from '../AppContext';
import '../App.css'

class History extends React.Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    renderHistory(){
        const { history = [] } = this.context;
        return history.map((obj)=>{
            return(
                <Card style={{width:"40%", margin:"25px"}}>
                    <Card.Header>
                        Image Uploaded at {obj.time.toTimeString()}
                    </Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>
                                <img
                                src={obj.img}
                                height="40"
                                width="50"
                                >
                                </img>
                                </Col>
                                <hr/>
                                <Col>
                                    Barcode:{obj.barcode}<br/>
                                    {obj.barcodeType ? 'Barcode Type: ' + obj.barcodeType : ''}
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            )
        })
    }
    
    render(){
        return (
            <div>
               {this.renderHistory()} 
            </div>

        )
    }
}

History.contextType = AppContext;
export default History;