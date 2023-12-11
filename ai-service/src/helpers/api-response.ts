import { ApplicationState } from './interfaces/application-state';
import { MessageInitialization, MessageResponse } from '../models/common/message-response';
import { AISuggestionService } from './suggestions';
import { ApplicationStates } from '../models/interfaces/applications-state';

/**
 * API response
 * @param event
 * @param handleFunc
 * @constructor
 */
export function ApiResponse<T>(event: any, handleFunc: (msg) => Promise<MessageResponse<T>>): void {
    const state = new ApplicationState();
    new AISuggestionService().registerListener(event, async (msg) => {
        return await handleFunc(msg);
    })
}

/**
 * API response
 * @param channel
 * @param event
 * @param handleFunc
 * @constructor
 */
export function ApiResponseSubscribe<T>(event: any, handleFunc: (msg) => Promise<void>): void {
    new AISuggestionService().subscribe(event, async (msg) => {
        await handleFunc(msg);
    })
}
