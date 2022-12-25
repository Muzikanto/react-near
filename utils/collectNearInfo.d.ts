/// <reference types="react" />
import { NearClient } from '../core/client';
export declare function collectNearDataWithoutRender(nearClient: NearClient): Promise<void>;
export declare function collectNearData(nearClient: NearClient, element: JSX.Element): Promise<void>;
