import { fileUpload } from "../../src/helpers/fileUpload"
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name:'drb7r63ua',
    api_key:'777249328666321',
    api_secret:'1znSxkfzwXb7oxYYXP2T8gTNR0o',
    secure:true
});

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async () => {

        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWzlZWR8MXx8fGVufDB8fHx8&w=1000&q=80.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'imagen.jpg');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
      console.log(url)
        const segments = url.split('/');
        const imageId = segments[segments.length-1].replace('.jpg','');
        console.log(imageId)
        const cloudresp = await cloudinary.api.delete_resources(['journal-app/'+imageId]);
        console.log({cloudresp})
    })
    // test('Debe retornar null', async () => {
    //     const file = new File([], 'imagen.jpg');
    //     const url = await fileUpload(file);
    //     expect(url).toBe(null);
    // })


})