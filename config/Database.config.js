/********************************************************
***************   PRODUCTION DATABASE   *****************  'mongodb://CaptLonestar:^QZ987js%@ds155934.mlab.com:55934/quizard'    'mongodb://localhost/quizard-local'
********************************************************/
exports.DATABASE_URL = (process.env.DATABASE_URL || 'mongodb://localhost/quizard-local');

/********************************************************
******************   LOCAL DATABASE   *******************
********************************************************/
exports.TEST_DATABASE_URL = (process.env.TEST_DATABASE_URL || 'mongodb://CaptLonestar:abcde12345@ds159662.mlab.com:59662/quizard-test');

/********************************************************
*******************   PORT NUMBER   *********************
********************************************************/
exports.PORT = process.env.PORT || 8080;

/********************************************************
*****************   JSON WEB TOKENS   *******************
********************************************************/
exports.secret = {'secret': 'Luf$a-0*1a#F:!dl124FaE1#!L.da#eo$5la&:Ldkfa#Ala;*12345'};
