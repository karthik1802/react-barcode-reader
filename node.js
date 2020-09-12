var Quagga = require('@ericblade/quagga2').default

Quagga.decodeSingle({
    decoder: {
        readers: ["code_128_reader", "ean_5_reader","upc_reader","ean_reader","ean_8_reader", "ean_2_reader", "code_39_reader", "code_93_reader"] // List of active readers
    },
    locate: true, // try to locate the barcode in the image
    
        size: 800,
    
    src: 'test5.jpeg' // or 'data:image/jpg;base64,' + data
}, function(result){
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
});
