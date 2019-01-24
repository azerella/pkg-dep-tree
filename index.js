'use-strict';
const Fsp = require( 'fs' ).promises;
const Path = require( 'path' );

const Treeify = require ( 'treeify' );

const GetRootDependency = ( object ) => {

}

const GetDependencies = ( object ) => {
    console.log( object.dependencies );
    return object.dependencies;
}

/**
 * Asyncronously return a package.json object given a package.json file
 * 
 * @param {string} filePath     - File path location 
 * 
 * @returns {object} package.json file data as object
 */
const ReadPkgFile = async ( filePath ) => {
    if( !filePath.includes( 'package.json' ) ) {
        throw( `Invalid file path! Expected package.json` );
    }
    let pkgFile = await Fsp.readFile( filePath, 'utf-8' );
    return JSON.parse( pkgFile );
}

// GetDependencies( await ReadPkgFile( 'package.json' ) );

module.exports.ReadPkgFile = ReadPkgFile;

// ReadPkgFile( 'package.json' );
// ReadPkgFile( Path.join( __dirname, `package.json` ) );