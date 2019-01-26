'use-strict';

const Path = require( 'path' );

const Treeify = require ( 'treeify' );


/**
 * Pretty print JSON object as tree structure using treeify.
 * 
 * @param {object} treeObject 
 */
const PrintTree = async( treeObject ) => {
    return Treeify.asTree( treeObject ).trim();
}

// const IterateDependencies = async( dependencies, org ) => {
//     let result = {};

//     for( const module of Object.keys( dependencies ) ) {
//         if( org ) {
//             let name = module.substring( org.length + 1 );
//             result[ name ] = await IterateDependencies( dependencies, org );
//         } else {
//             result[ module ] = await IterateDependencies( dependencies );
//         }
//     }
//     return result;
// }

/**
 * Prints a tree structure given a mono repo workspace,
 * package name and an optional organisation.
 * 
 * @param {string} workspace - Workspace root location
 * @param {string} name - Name of package to print dependecies for
 * @param {string} org? - Optional, module organisation prefix.
 */
const GetMonoDepTree = async ( workspace, name, org ) => {
    let tree = {};
    let pkgPath = Path.join( workspace, `/${ name }/package.json`);
	let pkg = require( pkgPath, 'utf-8');

	if( Object.keys( pkg.peerDependencies ).length > 0 ) {
		for( const module of Object.keys( pkg.peerDependencies ) ) {
            if( org ) {
                let name = module.substring( org.length + 1 );
                tree[ name ] = await GetMonoDepTree( workspace, name, org );
            } else {
                tree[ module ] = await GetMonoDepTree( workspace, module, org );
            }
		}
    }
    else if( Object.keys( pkg.dependencies ).length > 0 ) {
        // @todo
    }
    else if( Object.keys( pkg.devDependencies ).length > 0 ) {
        // @todo
    }
    else {
        return {};
    }
    
	return tree;
};


module.exports.GetMonoDepTree = GetMonoDepTree;
module.exports.PrintTree = PrintTree;