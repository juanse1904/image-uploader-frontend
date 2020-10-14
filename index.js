let dropArea = document.getElementById('drop-container');
let initialDashboard = document.getElementById('initialDashboard');
let loading = document.getElementById('loading');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => dropArea.addEventListener(eventName, preventDefaults, false));
['dragenter', 'dragover'].forEach((eventName) => dropArea.addEventListener(eventName, highlight, false));
['dragleave', 'drop'].forEach((eventName) => {dropArea.addEventListener(eventName, unhighlight, false)});

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}
function CallMe()
{
  const fileSelector = document.getElementById("file-selector")
  fileSelector.addEventListener('change', (event) => {
    const file = event.target.files;
    handleFiles(file)
  });
}
function handleFiles(files) {
  ([...files]).forEach(uploadFile)
  removeDashboard();
  showLoading()
}
function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}
function removeDashboard(e) {
  initialDashboard.classList.add('hide')
}
function lastScreen(data) {
  initialDashboard.classList.add('hide')
  loading.classList.remove('visible')
  document.getElementById('finalDashboard').classList.remove('hide')
  document.getElementById('image-uploaded').src=data.url
  document.getElementById('url-box').value=data.url
}
function showLoading(e) {
  setTimeout(()=> document.getElementById("progress-bar").value = 60,200)
  loading.classList.add('visible')
}

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}
function copyLink(){
  let boxLink=document.getElementById('url-box')
  boxLink.select()
  document.execCommand("copy");
  alert("hello, this is your link and is now on the clipboard: " + boxLink.value);
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
  .then(response => response.json())
  .then((data) => { lastScreen(data)})
  .catch((error) => { console.error(error.message) });
}
