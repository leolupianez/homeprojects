function previewImages() {

    var preview = document.querySelector('#preview');
    
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
  
  document.querySelector('#image-upload').addEventListener("change", previewImages)