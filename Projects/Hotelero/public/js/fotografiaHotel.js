function getTempFotografiaHotel() {
  return imageID;
}

let imageID = 'qs6fr1idsl06hztp5fle';
let imagenUrl = '';
$(function() {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'pbonillag', api_key: '344177855359291'});

    // Upload button
    let uploadButton = $('#btnSeleccionarImagen');

    // Upload button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'pbonillag', upload_preset: 'proyecto', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log imaghttps://res.cloudinary.com/x-treem/image/upload/e data to console
            id = result[0].public_id;
            imageID = result[0].public_id;
             // console.log(id);
            imagenUrl = 'https://res.cloudinary.com/pbonillag/image/upload/' + id;
          // console.log(imagenUrl);
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}
