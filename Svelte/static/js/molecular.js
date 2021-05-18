const csvtojson = ( csv ) => {
    let lines = csv.replaceAll( '"', '' ).split( "\n" );
    let result = [];

    // NOTE: If your columns contain commas in their values, you'll need to convert them to  '&&'
    let headers = lines[ 0 ].split( "," );

    for ( let i = 1;i < lines.length;i++ ) {
        let obj = {};
        let currentline = lines[ i ].split( "," );
        for ( let j = 0;j < headers.length;j++ ) obj[ headers[ j ] ] = currentline[ j ]?.replaceAll( '&&', ',' );
        result.push( obj );
    }
    return JSON.stringify( result ) || 1;
}