const fs = require('fs');

const {Pool} = require('pg');

//pool is established with server
const pool = new Pool(
{
	user:'a',
	database:'autoadvisor',
	host:'localhost',
	port:5432,
	password:'b'
});
pool.connect();
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//THIS MUST RUN BEFORE ANY SQL FUNCTIONS





//function to send SQL commands to server and return object(s)
//NOTE: RETURNING DIRECTLY GIVES AN ERROR SO IT IS PRINTED TO
//      A FILE CALLED "return.json"
//  sql(string) - the command being sent
async function sqlReturn(sql){
	module.exports = {pool};
	try{
		const res = await pool.query(sql);
        fs.writeFile('return.json',JSON.stringify(res), error => {if(error){console.error(error);}});
	}
	catch(error){
		console.error(error);
	}
}

//function to send SQL commands to server with no return value
//  sql(string) - the command being sent
async function sqlSend(sql){
	module.exports = {pool};
	try{
		const res = await pool.query(sql);
	}
	catch(error){
		console.error(error);
	}
}


//function to return the contents of a file as a string(file must be utf8 encoded)
//  filename(string) - file and path if file is not in same directory
function fileToString(filename){
    return fs.readFileSync(filename, 'utf8', 'r');
}


//function to take object returned by DocParser and convert it into SQL code for
//the sqlSend() command
//  transcript(object) - object returned by docparser
function transcriptToSQL(transcript){
	let p = transcript[0]['final'];
	let fileOut = 'DROP TABLE IF EXISTS import_table;\n CREATE TABLE import_table(course VARCHAR(100), coursename VARCHAR(100), attempted VARCHAR(100), received VARCHAR(100), grade VARCHAR(100));\nINSERT INTO import_table(course, coursename, attempted, received, grade)  \nVALUES '
	for(var i = 0; i < p.length; i++)
    {
	fileOut = fileOut + '\n(\'' + (p[i]['course']) + '\', \'';
    fileOut = fileOut + (p[i]['coursename']) + '\', \'';
    fileOut = fileOut + (p[i]['attempted']) + '\', \'';
    fileOut = fileOut + (p[i]['received']) + '\', \'';
    fileOut = fileOut + (p[i]['grade']) + '\'), ';
    };
	return fileOut.substring(0, fileOut.length - 2) + ';';
}

//---------------------------------------------------------------------------------
//Main Code
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//---------------------------------------------------------------------------------

//transcript is read from file(this step can be skipped if you already have the object)
let transcript = fileToString('Transcript.json');
//transcript is converted into a string of SQL Code
transcript = transcriptToSQL(JSON.parse(transcript));

//console.log(transcript);

//code for transcript is loaded into the db
sqlSend(transcript);
//code to process this information is loaded into the db
sqlSend(fileToString('post_import.sql'));

//code to retrieve transcript is loaded into db
//output is printed to file(returning it gives an error for some reason)
sqlReturn(fileToString('retrievetranscript.sql'));
//Json is read from file
rv = fileToString('return.json')
//The string from the file is converted into an object
tObject = JSON.parse(rv);
tObject = tObject.rows;
//final result is printed(this is where you would load it into the table)
console.log(tObject);




//---------------------------------------------------------------------------------
//WIP
//vvvvvvvvvvvvvvvv
//---------------------------------------------------------------------------------
//fs.writeFile('return.json',JSON.stringify(tObject), error => {if(error){console.error(error);}});
/* let sObject = sqlReturn(fileToString('retrieveschedule.sql'));
console.log(sObject); */