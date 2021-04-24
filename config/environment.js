const development  ={
    name : 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
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
        google_client_id:
          "696495007797-a5hqfqda2oq254egjp2ornavl9kdn2u0.apps.googleusercontent.com",
        google_client_secret: "B7zvSg9xL3QY6LsjIqUINWnG",
        google_call_back: "http://localhost:8000/user/auth/google/callback",
        jwt_secret: 'connecttie'
      
}


const production= {
    name :'production'
}

module.exports = development;