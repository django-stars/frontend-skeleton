# Client side Application code
Here you will find the 3 client side code bases

    1. Desktop Electron App
    2. Web Application
    3. Django Admin
    
## Authorization
For clients to authenticate, the token key should be included in the Authorization HTTP header. The key should be prefixed by the string literal "Token", with whitespace separating the two strings. For example:

    Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
    
##Request to login

    curl -X POST -u username:secretPassword http://127.0.0.1:8000/api/v0/login/
    
Response

    {"token":"91274819231299lsadf923741","username":"m.diener@gomogi.com"}
    

###Request for user token
Make sure you do not forget the trailing slash on your request.

    curl -X POST -d "username=YourUserName&password=secretPwd" http://127.0.0.1:8000/api/v0/users/token/


Response

    {"token":"479bf16ecba43727c5d119fa09e14d8475432b4f"}
    
    
