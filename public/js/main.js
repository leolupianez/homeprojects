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


function closeOpenMenu() {
  const menuClosed = document.querySelector('#mobile-menu').classList.contains('hidden')
  if(menuClosed) {
    document.querySelector('#mobile-menu').classList.remove('hidden')
    document.querySelector('#logo').classList.add('hidden')
  } else {
    document.querySelector('#mobile-menu').classList.add('hidden')
    document.querySelector('#logo').classList.remove('hidden')
  }
}

const closeMenuButton = document.querySelector('#close-menu-btn').addEventListener("click", closeOpenMenu);
const openMenuButton = document.querySelector('#show-menu-btn').addEventListener("click", closeOpenMenu);