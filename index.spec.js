const { GetMonoDepTree, PrintTreeTrim } = require(  './index.js' );

const Expect = require( 'chai' ).expect;
const Path = require( 'path' );
const Fsp = require( 'fs' ).promises;


describe( 'PrintTreeTrim()', () => {
    it( 'Should return a trimmed empty string given an empty object', async () => {
        Expect( await PrintTreeTrim( {} ) ).to.equal( '' );
    })

    it( 'Should return a trimmed tree structure given a object structure', async () => {
        Expect( await PrintTreeTrim( { 'core': '' } ) ).to.equal( '└─ core' );
    })

    it( 'Should return a trimmed nested tree structure given a nested object structure', async () => {
        Expect( await PrintTreeTrim( { 'core': { 'list': '' } } ) ).to.equal( '└─ core\n   └─ list' );
    })
});


describe( 'GetMonoDepTree()', () => {
	const rootTestPath = Path.resolve( __dirname, 'root' );
	const childDirName1 = "repoOne";
	const childDirName2 = "repoTwo";
	const rootPkgJson = {
		"name": "root",
		"peerDependencies": {}
	}
	const child2PkgJson = {
		"name": `${ childDirName1 }`,
		"peerDependencies": {
			[ childDirName1 ] : '1.0.0'
		}
	}
	const child1PkgJson = {
		"name": `${ childDirName2 }`,
		"peerDependencies": {}
	}

	beforeEach( async() => {
		// Setup directory structure
		await Fsp.mkdir( rootTestPath, { recursive: true } );
		await Fsp.mkdir( `${ rootTestPath }/${ childDirName1 }`, { recursive: true } );
		await Fsp.mkdir( `${ rootTestPath }/${ childDirName2 }`, { recursive: true } );

		// Write package files
		await Fsp.writeFile( `${ rootTestPath }/package.json`, JSON.stringify( rootPkgJson ) );
		await Fsp.writeFile( `${ `${ rootTestPath }/${ childDirName1 }` }/package.json`, JSON.stringify( child1PkgJson ) );
		await Fsp.writeFile( `${ `${ rootTestPath }/${ childDirName2 }` }/package.json`, JSON.stringify( child2PkgJson ) );
	});

	afterEach( async() => {
		// Destroy package files
		await Fsp.unlink( `${ rootTestPath }/package.json` );
		await Fsp.unlink( `${ `${ rootTestPath }/${ childDirName1 }` }/package.json` );
		await Fsp.unlink( `${ `${ rootTestPath }/${ childDirName2 }` }/package.json` );
		
		// Destroy directory structure
		await Fsp.rmdir( `${ rootTestPath }/${ childDirName1 }`, { recursive: true } );
		await Fsp.rmdir( `${ rootTestPath }/${ childDirName2 }`, { recursive: true } );
		await Fsp.rmdir( rootTestPath, { recursive: true } );

	});

    it( 'Should return an empty object given empty params', async () => {
        Expect( await GetMonoDepTree( '', '', '') ).to.eql( {} );
    })

    it( 'Should return object with repoOne as a peer dependencey', async () => {
        Expect( await GetMonoDepTree( rootTestPath, childDirName2 , '' ) ).to.eql( { repoOne: {} } );
	})
	
	it( 'Should return object with no peer dependencies ( empty object )', async () => {
        Expect( await GetMonoDepTree( rootTestPath, childDirName1 , '' ) ).to.eql( {} );
    })
});