const Fsp = require( 'fs' ).promises;
const Expect = require( 'chai' ).expect;

const { ReadPkgFile } = require( '../../index.js' );

describe('ReadPkgFile()', function() {
      it('Should return valid json object given a package.json file', async function( ) {
        Expect( await ReadPkgFile( 'package.json' ) );
      });
  });