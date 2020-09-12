import React from 'react';
import {  Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap'
import AppContext from '../AppContext';
import '../App.css'
import img from '../noImage.png'
import Quagga from '@ericblade/quagga2';
const IMAGE_WIDTH = "100%";
const IMAGE_HEIGHT = "100%";
class FileScan extends React.Component {
    constructor(props){
        super(props)
        this.state={
        }
        this.triggerInputFile = this.triggerInputFile.bind(this)
    }

    highlightBarcode(result) {
        console.log('barcode', result)
        const { box = [] } = result;
        const imgEl = document.getElementById("uploaded-image");
        const cnvs = document.getElementById("my-canvas");

        cnvs.style.position = "absolute";
        cnvs.style.left = imgEl.offsetLeft + "px";
        cnvs.style.top = imgEl.offsetTop + "px";

        const ctx = cnvs.getContext("2d");
        ctx.beginPath();

        let line = box[0];
        ctx.moveTo(line[0], line[1]);

        line = box[1];
        ctx.lineTo(line[0], line[1]);
        ctx.stroke();
        ctx.moveTo(line[0], line[1]);

        line = box[2];
        ctx.lineTo(line[0], line[1]);
        ctx.stroke();
        ctx.moveTo(line[0], line[1]);

        line = box[3];
        ctx.lineTo(line[0], line[1]);
        ctx.stroke();
        ctx.moveTo(line[0], line[1]);

        line = box[0];
        ctx.lineTo(line[0], line[1]);
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    }

    imageToDataUri(imgResize, width, height) {

        // create an off-screen canvas
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
    
        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;
    
        // draw source image into the off-screen canvas:
        ctx.drawImage(imgResize, 0, 0, width, height);
    
        // encode image to data-uri with base64 version of compressed image
        return canvas.toDataURL('image/jpeg', 1.0)
    }

    async handleChange(event){
        const files = event.target.files;
        const file = files[0];
        let fileData = await this.toBase64(file);
        // var imgUploaded = new Image();
        // imgUploaded.src = fileData;
        // const newDataUri = await this.resizedataURL(imgUploaded, IMAGE_WIDTH, IMAGE_HEIGHT);
        // console.log('ad', imgUploaded, newDataUri)
       
        this.setState({
            uploadedImage: fileData,
            isLoading: true
        }, () => {
            // const imgEl = document.getElementById("uploaded-image");
            // const desiredWidth = imgEl.width
            // const desiredHeight = imgEl.height
            // const resizeImage = this.imageToDataUri(imgEl, desiredWidth, desiredHeight)
            // this.scanFileForBarcode(resizeImage)
        })
        this.scanFileForBarcode(fileData)
       
    }
    triggerInputFile() { 
        this.fileInput.click() 
    }
    addToHistory(barcodeObj){
        const { history = [] } = this.context;
        history.push(barcodeObj)
        this.context.setVal({ key: 'history', value: history })
    }
    scanFileForBarcode(fileData){
        const self = this;
        Quagga.decodeSingle({
            decoder: {
                readers: ["code_128_reader", "ean_5_reader","upc_reader","ean_reader","ean_8_reader", "ean_2_reader", "code_39_reader", "code_93_reader"] // List of active readers
            },
            locate: true, // try to locate the barcode in the image
            size: 536,
            src: fileData // or 'data:image/jpg;base64,' + data
        }, function(result){
            if(result.codeResult) {
                self.addToHistory({
                    img:fileData,
                    barcode:result.codeResult.code,
                    barcodeType: result.codeResult.format,
                    time: new Date()
                })
                self.highlightBarcode(result)
                self.setState({
                    barcodeDetected: result.codeResult.code,
                    barcodeType: result.codeResult.format,
                    isLoading:false
                })
                
            } else {
                self.addToHistory({
                    img:fileData,
                    barcode:"Not Detected",
                    time: new Date()
                })
                self.setState({
                    isLoading:false 
                })
            }
        });
    }
    toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
    render(){
        const { barcodeDetected = 'No Barcode Detected!!', uploadedImage, isLoading = false, barcodeType } = this.state;
        return (
            <div>
                <Container style={{marginTop:"50px"}}>
                    <Row lg={6}>
                        <Col style={{
                            border: '2px solid #000000'
                        }} lg={6}>
                            {uploadedImage?<div><img 
                            id='uploaded-image'
                            alt='barcode-image'
                            src={uploadedImage} height={IMAGE_HEIGHT} width={IMAGE_WIDTH}
                            >
                            </img>
                                <canvas id='my-canvas' height={"1000px"}
                                    width={"1000px"}></canvas>
                            </div>
                            :
                            <div>
                            <div>
                            <img 
                            src={img}
                            alt='upload something'
                            height="400"
                            >
                                
                            </img>
                            </div>
                            Upload a image to scan barcode
                            </div>
                            }
                            
                        </Col>
                        <Col lg={"6"}>
                            <Row style={{ marginTop: "15px", marginLeft: "0", marginRight: "auto" }}>
                                <Card className="text-center" border="secondary" style={{ width: '100%', }}>
                                    <input
                                        ref={fileInput => this.fileInput = fileInput}
                                        type="file"
                                        onChange={this.handleChange.bind(this)}
                                        style={{ display: "none" }}
                                        accept="image/jpeg"
                                    />
                                    <Card.Body style={{ width: '100%', height: "130px" }}>
                                        <Button onClick={this.triggerInputFile}> Upload File </Button>
                                        <p>Upload any JPEG image with barcode</p>
                                    </Card.Body>


                                </Card>

                            </Row>
                            <Row style={{ marginTop: "15px", marginLeft: "0", marginRight: "auto" }}>
                                <Card className="text-center" border="secondary" style={{ width: '100%', }}>
                                    <Card.Header >
                                        
                                        Barcode Detected:
                                    </Card.Header>
                                    <Card.Body style={{ width: '100%', height: "130px" }}>
                                    {isLoading?<Spinner animation="border" />:
                                    <div><p>Barcode: {barcodeDetected}</p>
                                    {barcodeType?<p>Barcode Type: {barcodeType}</p>:<p/>}</div>}
                                    </Card.Body>
                                </Card>

                            </Row>

                        </Col>
                    </Row>
                </Container>

            </div>

        )
    }
    


}
FileScan.contextType = AppContext;
export default FileScan;