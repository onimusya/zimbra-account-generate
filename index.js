const { generateFromEmail, generateUsername } = require("unique-username-generator");
const path = require('path');
const fs = require('fs');
const { execSync } = require("child_process");


let generateAccounts = async function (count, emailHost, password) {

    let lines = "email,password\n";

    for (let i=0; i<count; i++) {
        let username = generateUsername();
        let email = username + '@' + emailHost;
    
        lines += `${email},${password}\n`;

        console.log(`Generate ${i+1} -> ${email}    password:${password}`);
        let command = `zmprov createAccount ${email} ${password} displayName '${username}' givenName ${username} sn '.'`;
        console.log(`Command: ${command}`);

        try {
            let result =  execSync(command);

        } catch (error) {
            //console.error("Error: ", error.message);
        }
        
    }

    return lines;
}

// Retrieve the command line arguments
let argv = require('minimist')(process.argv.slice(2), { string: [] });

// Parameters
// -n   : Total accounts to generate
// -h   : Email host name eg: mememail.xyz
// -p   : Default password

let missingParams = false;

if (typeof argv.n == "undefined") {
    missingParams = true;
}

if (typeof argv.h == "undefined") {
    missingParams = true;
}

if (typeof argv.p == "undefined") {
    missingParams = true;
}

if (missingParams) {

    console.log(`
Missing parameters!

Parameters
    -n  : Total accounts to generate
    -h  : Email host name
    -p  : Default password
    `);

    return;
}

if (argv.n <= 0) {
    console.log(`Parameter "n" must has value larger than 0.`);
    return;
}

(async function () {

    let lines = await generateAccounts(argv.n, argv.h, argv.p);

    console.log(" ");
    console.log("----------");
    console.log(" ");
    console.log(lines);

})();


