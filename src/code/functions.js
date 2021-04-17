export const sheet = atob(
    "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMUp6dkhRM1hOZEphUHFSVm8tSzZBWmlsbHFYRUZGZG80NTBQLS1Xb3E0UUUvZ3Zpei90cT90cXg9b3V0OmNzdiZzaGVldD1Lb3JvbGV2LUxlY3R1cmVzLUFQSQ=="
);

export const base = {
    url: "",
    title: "",
    image: "",
    text: "",
    date: "",
    time: "",
    prof: "",
};

export const csvtojson = ( csv ) => {
    let lines = csv.replaceAll( '"', "" ).split( "\n" );
    let result = [];

    // NOTE: If your columns contain commas in their values, you'll need to convert them to  '&&'
    let headers = lines[ 0 ].split( "," );

    for ( let i = 1;i < lines.length;i++ ) {
        let obj = {};
        let currentline = lines[ i ].split( "," );
        for ( let j = 0;j < headers.length;j++ ) obj[ headers[ j ] ] = currentline[ j ].replaceAll( '&&', ',' );
        result.push( obj );
    }
    return JSON.stringify( result ) || 1;
}