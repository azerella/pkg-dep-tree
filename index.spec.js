const { GetMonoDepTree } = require(  './index.js' );

const Expect = require( 'chai' ).expect;
const Path = require( 'path' );
const Fsp = require( 'fs' ).promises;

describe( 'GetMonoDeptree()', () => {
    it( 'Should return a empty object given no parms', async () => {
        Expect( await GetMonoDepTree( '', ) ).to.equal( {} );
    })
})