import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import AppContext from '../AppContext';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    onClickHandler(event){
        const { target: { id } } = event;
        this.context.setVal({ key: 'currentTab', value: id });
    }
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Barcode Scanner</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Button variant="dark" id='fileScan' onClick={this.onClickHandler}>File Scan</Button>
                        <Button variant="dark" id='liveScan' onClick={this.onClickHandler}>Live Scan</Button>
                        <Button variant="dark" id='history' onClick={this.onClickHandler}>Histroy</Button>
                    </Nav>

                </Navbar>
            </div>
        )
    }
}
NavbarComponent.contextType = AppContext;
export default NavbarComponent;

