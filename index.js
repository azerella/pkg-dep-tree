'use-strict';

const Fsp = require( 'fs' ).promises;
const Path = require( 'path' );

const Treeify = require ( 'treeify' );


/**
 * Return an object with the name and version from a given package.json file
 * 
 * @param {object} object 
 */
const GetRootDependency = ( object ) => {
    let { name, version } = object;
    return { [ name ] : version }
}


/**
 * Asyncronously return a package.json object given a package.json file
 * 
 * @param {string} filePath     - File path location 
 */
const ReadPkgFile = async ( filePath ) => {
    if( !filePath.includes( 'package.json' ) ) {
        throw( `Invalid file path! Expected package.json` );
    }
    let pkgFile = await Fsp.readFile( filePath, 'utf-8' );
    return JSON.parse( pkgFile );
}

/**
 * Return an object containing the dependency tree.
 * 
 * @param {string} filePath - Location of the package.json
 */
const GetDepTree = async ( filePath ) => {
    let package = await ReadPkgFile( filePath );
    let packageDeps = package.dependencies;
    
    let root = await GetRootDependency( package );
    let rootName = Object.keys( root )[ 0 ]

    let result = {
        [ rootName ]: {}
    };

    Object.assign( result[ rootName ], packageDeps );
    
    return result;
}


(async () => {
    let result = await GetDepTree( Path.join( __dirname, `package.json` ) );

    console.log( Treeify.asTree( result ) );
})();