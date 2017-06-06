const xhrRequest = (file) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    if (this.status === 200) {
      const blob = new Blob([this.response], {type: 'application/dicom'});
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = function () {

      }
    }
  }
};

export default xhrRequest;
