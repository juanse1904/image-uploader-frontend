console.log('holiii');
let dropArea = document.getElementById('drop-container');
console.log(dropArea);
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => dropArea.addEventListener(eventName, preventDefaults, false))
  ;['dragenter', 'dragover'].forEach((eventName) => dropArea.addEventListener(eventName, highlight, false))
  ;['dragleave', 'drop'].forEach((eventName) => {dropArea.addEventListener(eventName, unhighlight, false)})
  
  dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}
function CallMe()
{
  const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });
}
function handleFiles(files) {
  ([...files]).forEach(uploadFile)
}
  function highlight(e) {
    dropArea.classList.add('highlight')
  }
  
  function unhighlight(e) {
    dropArea.classList.remove('highlight')
  }
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  function uploadFile(file) {
    let url = 'https://image-uploader-be.herokuapp.com/images'
    let formData = new FormData()
  
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };
      
    formData.append("image", file, "fff.png");
  
    fetch(url, requestOptions)
    .then(() => { console.log('uploaded')})
    .catch(() => { console.log('there was an issue') })
  }