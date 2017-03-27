# Client side Application code
Here you will find the 3 client side code bases

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
$ yarn package-mac/package-win/package-linux

## EMDYN API Host Name
The base EMDYN API url  `https://api.emdyn.net`


## Authorization
For clients to authenticate, the token key should be included in the Authorization HTTP header. The key should be prefixed by the string literal "Token", with whitespace separating the two strings. For example:

    Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b

##Request to login

    curl -X POST -d "username=someUserName&password=secretPassword" http://127.0.0.1:8010/api/v1/users/login/


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


##Request to start Job  Process
Get the current status of any job process via api
api/v1/findface/process/

Request using Curl passing a single folder path

    curl -X POST -d '{"paths":["/home/mdiener/testImages"]}' http://127.0.0.1:8010/api/v1/findface/process/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"

####Response
Inside the reponse you have the currently started {process_id} This represents the process job id you just started.


    {"user":"m.diener@gomogi.com","start_time":"2017-03-27T11:32:04.474404Z","paths":["/some/path/folder"],"process_id":248}



##Get Job Process Status by ID
Get the current status of any job process via api

api/v1/process/`{process_id}`/status

    api/v1/process/12/status

Response

    {"image_count":"25","status":"in-progress"}


##Post Error for a Job Process
If an error occurs during processing we send a POST request with the error here.

api/v1/process/error/  be sure to include the trailing slash /

    api/v1/process/error/

Data to include in POST must include:

    {"image_name":"image2.jpg",   "error_message":"test message",    "process":21, "image_count":23, "user":1, "error_source":"GM"}

Response

    {"status":"Success"}



