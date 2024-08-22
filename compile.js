const request = require('request');

const options = {
    method: 'POST',
    url: 'https://code-compiler10.p.rapidapi.com/',
    headers: {
        'content-type': 'application/json',
        'x-compile': 'rapidapi',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '79bf21192fmsh570c3bfdfed20aep16e351jsnc0fa0eb78944',
        'X-RapidAPI-Host': 'code-compiler10.p.rapidapi.com'
    },
    body: {
        langEnum: [
            'php',
            'python',
            'c',
            'c_cpp',
            'csharp',
            'kotlin',
            'golang',
            'r',
            'java',
            'typescript',
            'nodejs',
            'ruby',
            'perl',
            'swift',
            'fortran',
            'bash'
        ],
        lang: 'python',
        code: 'print("Hello world")',
        input: ''
    },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
