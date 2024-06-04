

let userInfo = {
    name: '',
    email: '',
    phone: '',
    city: ''
}

document.addEventListener('DOMContentLoaded', (event) => {
    const formulario = document.getElementById('form');

    formulario.addEventListener('submit', (event)=>{
        event.preventDefault();
        const formContainer = document.getElementsByClassName('container-form')[0];
        formContainer.style.display = 'none';
        const video_container = document.getElementsByClassName('video')[0]
        video_container.style.display = 'block';
        let iframe = document.getElementById('iframe');
        iframe.src = "https://player.vimeo.com/video/497552030?autoplay=1&loop=1&autopause=1&background=1&muted=0"
    

        userInfo.name = document.getElementById('name').value;
        userInfo.email = document.getElementById('email').value;
        userInfo.phone = document.getElementById('phone').value;
        userInfo.city = document.getElementById('city').value;
        sendMail(userInfo);
    });
})

async function sendMail (info){
    
        try{
    
          let response = await fetch('http://localhost:3200/sendemail/datos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: info.name,
                email: info.email,
                phone: info.phone,
                city: info.city
            })
          });
      
          if (!response.ok) {
            throw new Error('La respuesta de la petición no fue valida:' + response.statusText);
          }
      
          let data = await response.json();
          console.log('Response Data:', data);
        } catch (error) {
          console.error('Hubo un problema con la respuesta del fetch:', error);
        }
      
}
