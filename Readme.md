### Welcome to Dev Dost 

# Dev Tinder APIs

 **AuthRouter** 
- POST /signup
- POST /login
- POST /logout

 **ProfileRouter**
- GET /profile
- PATCH /profile/edit
- PATCH /profile/password

 **ConnectionRouter**
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

 **UserRouter**
- GET /user/connections
- GET /user/requests/received
- GET /user/feed 