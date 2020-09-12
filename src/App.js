import React from 'react';
import Navbar from './Components/Navbar';
import FileScan from './Components/FileScan';
import History from './Components/History';
import LiveScan from './Components/LiveScan';
import { AppProvider } from './AppContext';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            currentTab:'fileScan',
            history:[],
            setVal: ({ key, value }) => this.setState({ [key]: value })
        }
    }
    renderTab(){
        const {currentTab} = this.state;
        switch (currentTab) {
            case 'fileScan':
                return (<FileScan/>)
            case 'history':
                return (<History/>)
            case 'liveScan':
                return (<LiveScan/>)
        }
    }
    render(){
        return (
            <div>
                <AppProvider value={this.state}>
                    <Navbar />
                    {this.renderTab()}
                </AppProvider>
            </div>

        )
    }
    


}



// const App = () => {
//     const [scanning, setScanning] = useState(false);
//     const [results, setResults] = useState([]);
//     const scannerRef = useRef(null);

//     return (
//         <div>

//             <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>
//             <ul className="results">
//                 {results.map((result) => (result.codeResult && <Result key={result.codeResult.code} result={result} />))}
//             </ul>
//             <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>
//                 <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/>
//                 <canvas className="drawingBuffer" style={{
//                     position: 'absolute',
//                     top: '0px',
//                     // left: '0px',
//                     // height: '100%',
//                     // width: '100%',
//                     border: '3px solid green',
//                 }} width="640" height="480" />
//                 {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => setResults([...results, result])} /> : null}
//             </div>
//         </div>
//     );
// };

export default App;