function previewImages() {
  const preview = document.querySelector('#preview');

  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return alert(file.name + " is not an image");
    } // else...
    
    const reader = new FileReader();
    
    reader.addEventListener("load", function() {
      let image = new Image();
      image.height = 100;
      image.title  = file.name;
      image.src    = this.result;
      preview.appendChild(image);
    });
    
    reader.readAsDataURL(file);
  }
}

const imageUpload = document.querySelector('#image-upload');
imageUpload?.addEventListener("change", previewImages);


async function removeZip() {
  try{
    const response = await fetch('/pro/projects/removeZip', {
      method: 'delete',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        'zipCode': this.innerText
      })
    })
    const data = await response.json()
    location.reload()
  }catch(err){
    console.log(err)
  }
}

const zipCodes = document.querySelectorAll('.badge.zipcode');
zipCodes.forEach(zip => {
  zip.addEventListener('click', removeZip)
})