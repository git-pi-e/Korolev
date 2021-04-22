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

export const template = lec => {
  const driver = img => 'https://drive.google.com/uc?export=view&id=' + img?.split( '/d/' )[ 1 ]?.split( '/' )[ 0 ];
  return `
    <!-- <img class="w-100" src="${ driver( lec.image ) }" alt="" /> -->
  <div class="p-10">
    <div class="flex tx-j" style="justify-content:space-between;">
      <span class="f-wt7">${ lec.prof }: ${ lec.title.length > 20 ? lec.title.slice( 0, 20 ) + '...' : lec.title }</span>
      <span>${ lec.date }, ${ lec.time }</span>
    </div><div>&nbsp;</div>
    <div>${ lec.text }</div>
    <div class="flex" style="justify-content:space-between;">
      <span>&nbsp;</span>
      <span><a class="btn-std" href="${ lec.url }" style="--theme:#faa">Watch</a></span>
    </div>
  </div>`;
}