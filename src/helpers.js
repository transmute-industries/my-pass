// https://gist.githubusercontent.com/wuchengwei/b7e1820d39445f431aeaa9c786753d8e

//**dataURL to blob**
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

//**blob to dataURL**
function blobToDataURL(blob, callback) {
  var a = new FileReader();
  a.onload = function(e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}

// //test:
// var blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');

// blobToDataURL(blob, function(dataurl){
//     console.log(dataurl);
// });

module.exports = {
  blobToDataURL,
  dataURLtoBlob
};
