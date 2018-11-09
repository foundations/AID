import mapper from './dynamo';
import { Package, Pretrained } from './entity';
import { Guid } from 'guid-typescript';
import { isSymbol } from 'util';

/**
 * Following will be package manipulations
 */

/**
 * 
 * @param isSymbol 
 * @param linkedTo 
 */
function putPackage (isSymbol: boolean, linkedTo: string) {
    const toPutPackage = Object.assign(new Package, {
        id: Guid.create(),
        isSymbol: isSymbol,
        linkedTo: linkedTo
    })
    mapper.put(toPutPackage).then(objectSaved => {
        console.log(objectSaved)
    })
}
/**
 * 
 * Following will be pretrained manipulations
 */

/**
 * 
 * @param linkedTo 
 * @param name
 */
function putPretrained (name: string, linkedTo: string) {
    const toPutPretrained = Object.assign(new Pretrained, {
        id: Guid.create(),
        name: name,
        linkedTo: linkedTo
    })
    mapper.put(toPutPretrained).then(objectSaved => {
        console.log(objectSaved)
    })
}

/**
 * 
 */
async function getPretrained () {
    let results: Pretrained[] = []
    for await (const item of mapper.scan(Pretrained)) {
        results.push(item)
    }
    return results
}

export {
    putPretrained,
    putPackage,
    getPretrained
}