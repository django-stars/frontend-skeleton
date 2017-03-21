# Client side Application code

    1. Desktop Electron App
    2. Web Application
    3. Django Admin

# run Application

install NodeJs and npm
$ npm install
$ yarn start
$ ./node_modules/.bin/electron .

# build Application

install NodeJs and npm
$ npm install
$ yarn build
$ ./node_modules/.bin/electron-packager . (not woking yet)

## Authorization
For clients to authenticate, the token key should be included in the Authorization HTTP header. The key should be prefixed by the string literal "Token", with whitespace separating the two strings. For example:

    Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b

##Request to login

    curl -X POST -d "username=someUserName&password=secretPassword" http://127.0.0.1:8000/api/v0/users/login/


Response

    {
        "username":"demomain@goomail.com",
        "user_token":"479bf16ecba43727c5d119fa09e14d8475432b4f",
        "licenses":[
            { "expires-on":"2017-05-27",
              "name":"BioTrace",
              "license":"d804b6ae06asdfasdfasdfscbf1b5e092ef98753"
            },
            { "expires-on":"2017-06-17",
              "name":"DemoApp2",
              "license":"4846ae1cd14e768942d86ccf14c1f55d7c107c0b"
            }
         ]
     }



Authorized request with token

    curl -X GET http://127.0.0.1:8000/api/v1/findface/test/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f'


