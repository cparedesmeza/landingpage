import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import PORT from './config.js'

const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
})



app.post('/sendemail/:datos', async (req, res) => {
    try {
         var collection = req.body;
 
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              type: "OAuth2",
              clientId: "96581623928-qab4u1l30ct30g5l0eai1r2kautl6sb1.apps.googleusercontent.com",
              clientSecret: "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",
            },
          });
          
        var mailOptions = {
            from: 'Carlos Paredes Meza',
            to: 'cparedesmeza@gmail.com',
            subject: 'TEST DFX Carlos Paredes',
            text: 'Hola ' + collection.name + ' ' + ', haz sido seleccionado para una prueba con este servidor, tenemos el siguiente numero de telefono ' + collection.phone + ' '+'segun la información que has ingresado en nuestro portal, tu vives en ' + collection.city + ' ' + 'si deseas reenviemos el correo a ' + collection.email + ' haznolo saber',
            auth: {
                user: "pruebaslocales51@gmail.com",
                refreshToken: "1//04XU1nQhnxc3NCgYIARAAGAQSNwF-L9IrzuyX-NyEz256ma9R4eo5dMjb97LwPOd7JHhI2LCTulj9IsbbJRTwTH47ulPY7XMJYxU",
                accessToken: "ya29.a0AXooCgvpBKaj2NzeqoDhGOdI4L_zOKmh6pmVhrl727dSKVOPnORuqvWKXJiFaxePmGpp_uidFYiHLbo9wTUqMj_IZNkKBo8dGydxoiZnQMf5uK1rXftISO-3JsGb9Ns2eR_GrbJxctxPcUixsBVNaIf3DA_kEiDCU8A9CAaCgYKAbQSARASFQHGX2MiRaLBvnDDffY3wDi2ETZoRQ0173",
              },
        }

        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
                res.status(500).send({
                    status: 'error',
                    message: 'Ha habido un error' + error
                });  
            } else {
                console.log('email eviado')
              res.status(200).send({
                status: 'success',
                message: 'El correo ya fue enviado' +info.response,
            });  
            }
          });
           
    } catch (error) {
        res.status(404).send({
            status: 'error',
            error
        });  
    }
   
});

app.listen(PORT, () => {
  console.log('Servidor Corriendo en puerto:' + `${PORT}`)

  
});