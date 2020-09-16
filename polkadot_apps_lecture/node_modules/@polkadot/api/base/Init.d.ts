import { ApiOptions, ApiTypes, DecorateMethod } from '../types';
import { VersionedRegistry } from './types';
import Decorate from './Decorate';
export default abstract class Init<ApiType extends ApiTypes> extends Decorate<ApiType> {
    #private;
    constructor(options: ApiOptions, type: ApiTypes, decorateMethod: DecorateMethod<ApiType>);
    /**
     * @description Sets up a registry based on the block hash defined
     */
    getBlockRegistry(blockHash: string | Uint8Array): Promise<VersionedRegistry>;
    protected _loadMeta(): Promise<boolean>;
    private _metaFromSource;
    private _subscribeUpdates;
    private _adjustBundleTypes;
    private _metaFromChain;
    private _initFromMeta;
}
