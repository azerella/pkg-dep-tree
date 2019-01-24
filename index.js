'use-strict';

const Fsp = require( 'fs' ).promises;
const Path = require( 'path' );

const Treeify = require ( 'treeify' );


const GetRootDependency = ( object ) => {
    let { name, version } = object;
    return { [ name ] : version }
}


const GetDependencies = ( object ) => {
    return object.dependencies;
}
const GetDevDependencies = ( object ) => {
    return object.devDependencies;
}
const GetPeerDependencies = ( object ) => {
    return object.peerDependencies;
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
