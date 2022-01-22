'use strict';

import { ipcRenderer, shell } from 'electron';

import SsoClientv2 from './eve/SsoClientv2';
import Character from '../models/Character';
import AuthorizedCharacter from '../models/AuthorizedCharacter';
import FarmHelper from './FarmHelper';

import StructureHelper from './StructureHelper';

import appProperties from '../../resources/properties.js';

export default class CharacterHelper {
    static addCharacter() {
        let client = new SsoClientv2();
        let challenge = SsoClientv2.generateCodeChallenge();
        let redirect = client.redirect(appProperties.scopes.map(a => a.name), challenge);

        ipcRenderer.on('code-response', async (event, code) => {
            ipcRenderer.removeAllListeners('code-response')

            let character = await client.authorize(code, challenge);
            character.save();

            // mark for a force refresh (this might be a re-authorization)
            Character.markCharacterForForceRefresh(character.id);

            // we go into the structures cache and we clear this character id from anywhere it appears in an attempted list
            // this ensures that on next refresh structures will be attempted to be repulled
            StructureHelper.removeCharacterIdFromAttemptedLists(character.id);

            Character.build();
        });
        shell.openExternal(redirect)
    }

    static deleteCharacter(characterId) {
        let authchar = AuthorizedCharacter.get(characterId)
        if (authchar) {
            authchar.delete();
        }
        let char = Character.get(characterId)
        if (char) {
            char.delete();
        }
        FarmHelper.deleteFarm(characterId)
    }
}