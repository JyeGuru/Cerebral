2022-01-22: 0.9.0
* Migrated character auth to native browser with protocol handler callback
    * This removes the security issue of loading the login pages inside the application
    * Also allows easier adding if already authenticated in native browser
    * Allows browser-integrated password managers to autofill
    * Application auth keys have been updated to support the new callback URL
    * Existing characters will still be present, but the API keys will need to be refreshed
* Fixed refresh issues caused by out of date API endpoints
* Added button to delete a character (under API tab)
* Merged various SP Farming UI updates from https://github.com/TomRichter/Cerebral fork
* Fix a false positive Omega detection due to recent Skill Queue changes

2019-01-21: 0.8.1
-------------------------
* Fixed serious bug where certain characters authorized via the new SSOv2 would show tokens as dying when they were in fact fine.
* Node.js version bumped to v10.

2019-01-14: 0.8.0
-------------------------
* Switch to SSO v2 for native applications for authorizing characters, characters entered previously continue to function as normal and can be gracefully upgraded to v2 by re-authorizing.
    * This removes the need for manually entering developer credentials.
    * Settings panel removed for now since developer credentials was its only use.
    * SSO v1 characters now show up with a blue check mark on the overview, v2 characters show a green check mark.
* Fixed bug where unallocated SP would stick on an old value after all SP was allocated.
* Fixed bug with alpha/omega status (thanks @hreeder).
* Upgraded most dependencies to their latest versions.
* Fixed an issue that was causing multiple unnecessary refreshes of access tokens due to parallel data update operations.
* Added some logging with electron-log.

2019-01-09: 0.7.0
-------------------------
* Fixed bug causing utilized contract slots for characters to always show as 0.
* Renamed pending contracts to incomplete contracts.
* Added an indicator of the last refresh to the character contracts pages.
* Added more info button to contracts tables which brings up a dialog box giving full details of the contract.
* Skill browser
* Skill planner
* Mails
* Updated to esi.evetech.net URL
* Honestly there's probably other shit I've forgotten it's been a while since I release an update, hopefully it all works.

2018-04-21: 0.6.0
-------------------------
* Cerebral is now licensed under the AGPL v3.0.
* Users are now required to create an EVE Developer account and input credentials into Cerebral.
    * A markdown guide has been added in /docs/API-SETUP.md giving instructions on creating an application on the EVE Developers site.
    * All characters must be re-authorized after inputting their new credentials.
    * Markers have been added on the character overview page showing a green tick/red warning symbol depending on whether the character needs to be re-authorized.
    * The currently baked in credentials in 0.5.0 and previous versions will be revoked 21/04/2018 21:00 UTC, at this time all versions of Cerebral prior to 0.6.0 will cease to function.
* Split the API info into a new tab on the character page showing granted scopes, data refresh timers and a health check on the character's tokens.
* The contracts page for characters now shows an indicator of used and available character contract slots.
* SSO client/refresh token handling has been improved to better handle failing refresh tokens.

2018-04-18: 0.5.0 Alpha
-------------------------
* Added a new tab "Contracts" showing contracts across all your characters.
    * Shows contract type, status, title, issuer, assignee/acceptor, date issued and date completed.
    * For courier contracts, shows origin; destination and volume.
    * Contracts are broken into two table, one for pending/in-progress/otherwise "active" contracts and another for completed contracts (which includes deleted, reversed, etc.)
* Added unallocated SP to character pages.
* Added an indicator to the jump clones tab showing jump clones used and maximum jump clones available.
* Added delete buttons to SP Farming page to delete SP Farms from the list.
* Added tabs to character pages, there are now tabs to view the following for each character:
    * Summary (main page as seen previously)
    * Skills (trained skills by groups in ABC order)
    * Contracts (looks same as the new global Contracts page except just shows contracts for that character)
* Standardised all buttons to a single grey colour which is a bit less obnoxious than the previous light blue.
* Cleaned up the code/UX for SP Farming.
* Upgrades to the internal type caching system to ensure seamless upgrades of data.

2018-04-09: 0.4.0 Alpha
-------------------------
* Added a new panel to the character pages showing information on when each type of data was last refreshed, and when it will next be refreshed.
* Added a new panel to the character pages showing jump fatigue information.
* Added a new panel to the character pages showing loyalty points.
* Removed refresh button from character overview, all refreshing is handled automatically.
* Started requesting scopes for fatigue, loyalty points and character contracts.
* Various backend changes to the code to allow for selective scope granting in the future, and to prevent errors on characters added before a scope was requested by the application.
* Fixed bug where version number in title bar would display as undefined.
* Fixed bug where the user-agent string sent to CCP APIs when requesting data did not contain a valid version number.
* Fixed bug where skills that were already finished would appear in the skill queue on character pages.

2018-04-06: 0.3.3 Alpha
-------------------------
* Bug fixed whereby some alpha characters would be incorrectly classified as omega.
* Version number now included in application title.
* Corporation icons are now displayed beside the omega status icon on the character overview/sp farming pages
* Implant icons are now shown for active implants.

2018-04-04: 0.3.2 Alpha
-------------------------
* Fixed major bug which prevented adding new characters
* Moved corp/alliance under character name on overview page
* Refactored a lot of code to be more efficient and easier to maintain
* Removed unnecessary react hot loader package

2018-04-03: 0.3.1 Alpha
-------------------------
* Fixed a number of bugs caused by character IDs being inconsistently stored as strings/numbers (now forced to strings)

2018-04-03: 0.3.0 Alpha
-------------------------
* Individual character pages added showing:
    * Basic character information: date of birth, security status, SP, wallet balance
    * Home location, current location, active ship
    * Attributes and remap information
    * Active implants
    * Skill queue
    * Jump clones
    * Scopes granted
* Individual character pages can be opened by clicking on a character in the left navigation, or by clicking on a row on the Character Overview/SP Farrming tables.
* A new scope "esi-universe.read_structures.v1" is now requested when adding a character.
    * This scope is used to resolve names and locations for structures for jump clones, home station, etc.
    * If you have characters entered into Cerebral, you should simply authorize them all again using the button and the scope will be added automatically.
    * If you do not re-authorize old characters, you may see locations listed as Unknown.
* Lots of backend work around station/structure/system information.

2018-03-26: 0.2.3 Alpha
-------------------------
* Bug Fixed: Character SP inaccurate after a skill finished training, but remained in the queue as a finished skill due to no player login.

2018-03-21: 0.2.2 Alpha
-------------------------
* Bug Fixed: Cerebral freezing after being left minimized for some time

2018-03-15: 0.2.1 Alpha
-------------------------
* Major refactoring/optimizations, RAM footprint has been drastically reduced
* Cerebral now minimizes to the tray when you close/minimize it.
    * You can re-open it by clicking on the icon in your tray.
    * You can quit Cerebral by right clicking the icon and selecting Quit.
* Cerebral now updates character data automatically.

2018-03-14: 0.2.0 Alpha
-------------------------
* Added SP Farming tab, see Current Functionality/Usage for details/instructions.
* SP counters and training timers now tick in real time.

2018-03-13: 0.1.0 Alpha
-------------------------
* First Alpha