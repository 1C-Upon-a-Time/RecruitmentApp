## 																										Easy Recruit - Team 1C
Our deployed web application: http://exxon-easy-recruit.herokuapp.com/

Our github: https://github.com/1C-Upon-a-Time/RecruitmentApp

## Resources used:
* Stack overflow
* w3schools.com
* Yeoman generated Mean Stack
* youtube.com
* codeacademy.com
* Mozilla Development MDN
* Bootstrap
* Angularjs

## Project Features
*  Student information entry & storage.
*  Recruiter user/admin accounts and login.
*  Searchable, sortable student list.
*  Editable student profile page with comments and ratings.
*  Ability for student to schedule interview from pre-set time.
*  Interview scheduling sends email to student.
*  Ability to email a single student or selected group.


## Set up

```bash
$ npm install
```

```bash
$ bower install
```

## Running Your Application
After the install process is over, you'll be able to run your application insert your own mongo lab uri and a gmail account for the application to use.

```
$ MONGOLAB_URI=your_mongo_DB_link_here SMTP_TRANSPORT=smtps://yourgmailaccount%40gmail.com:password@smtp.gmail.com npm start
```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.


## Testing Your Application

Testing backend:
```bash
$ mocha testfilename.js
```


## Origin
The 1CUponATime team was created to implement a semester long project. We worked using Agile Scrum method.

###  Deploying Application to Heroku
A free deployment of our application can be created via Heroku.
Set up the deployment as a node.js project. Include a database and an email address.

##Trouble Shooting
Any bugs or issues can be investigated on http://meanjs.org

## Credits
This project was based of the MEAN stack
[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)


## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
