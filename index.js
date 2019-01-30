'use-strict';

const Path = require( 'path' );
const Treeify = require ( 'treeify' );


/**
 * Pretty print JSON object as tree structure using treeify.
 * 
 * @param {object} treeObject 
 */
const PrintTreeTrim = async( treeObject ) => {
    return Treeify.asTree( treeObject ).trim();
}


/**
 * Return a object structure given a mono repo workspace,
 * package name and an optional organisation.
 * 
 * @param {string} workspace - Workspace root location
 * @param {string} name - Name of package to print dependecies for
 * @param {string} org? - Optional, module organisation prefix.
 */
const GetMonoDepTree = async ( workspace, name, org ) => {
    if ( workspace && name ) {
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
        
        return tree;
    }
    else {
        return {};
    }
};


module.exports.GetMonoDepTree = GetMonoDepTree;
module.exports.PrintTreeTrim = PrintTreeTrim;