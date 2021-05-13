const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname, '../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory
});

const development  ={
    name : 'development',
    asset_path: './assets',
    session_cookie_key: 'pfbE374PM3DRBDjp1JE1fF0Pqz9kIskz',
    db: 'allsocial',
    smtp: {
        service: "gmail",
        hosts: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "pulkitnagpal987654321@gmail.com",
          pass: "991@technocrat",
        }
      },
        google_client_id: "696495007797-a5hqfqda2oq254egjp2ornavl9kdn2u0.apps.googleusercontent.com",
        google_client_secret: "B7zvSg9xL3QY6LsjIqUINWnG",
        google_call_back: "http://localhost:8000/user/auth/google/callback",
        jwt_secret: 'codeial',
        morgan:{
          mode:'dev',
          options: {
            stream: accessLogStream
          }
        }
      
}


const production= {
    name : process.env.ALLSOCIAL_ENVIRONMENT,
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: "gmail",
        hosts: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.CODEIAL_GMAIL_USERNAME,
          pass: process.env.CODEIAL_GMAIL_PASSWORD,
        }
      },
        google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
        google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
        google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
        jwt_secret: process.env.CODEIAL_JWT_SECRET,
        morgan:{
          mode:'combined',
          options: {
            stream: accessLogStream
          }
        }
}

module.exports = eval(process.env.ALLSOCIAL_ENVIRONMENT)== undefined ? development : eval(process.env.NODE_ENV);
// module.exports = development;