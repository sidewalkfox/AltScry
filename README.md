# AltScry

A crowdsourcing website for the game Magic: The Gathering that allows users to write and verify alt text for card art.

## Inspiration
When I was demoing my [BlindMTG](https://github.com/sidewalkfox/BlindMTG) app to people, I received a lot of suggestions to include alt text for card art in the app. However, alt text for Magic: The Gathering cards has not been written, so at the time there was no way to make this happen. Not fearing a challenge, and without realizing how far in over my head I was getting, I recognized this as a great opportunity for another project. I theorized two ways that alt text for MTG could be written: artificial intelligence or by hand.

I considered the AI route flawed right from the start. Not only is there great nuance in MTG card art that AI would not be able to pick up on, AI is expensive, controversial, and frankly, against the spirit of what this project means to me. Magic: The Gathering cards are designed by humans, the art is drawn by hand, and the game is played by people. As much as I recognize what AI has done and will do for the world of assistive technology, I want AltScry to be a purely human project.

That brings me to the second option: writing alt text by hand. The largest issue with this approach? There are (as of writing this) 54,096 different MTG card illustrations. Assuming it took someone a mere ten seconds to write alt text for a card (which it doesn't), it would take that same person 6 days, 6 hours, and 16 minutes of non-stop work to get through every card. Crowdsourcing this information was clearly the only way to approach this task, the framework to make it happen just didn't exist yet.

## Features

### Contribute Mode
In contribute mode, a user is shown a random card that has no alt text written for it. They can choose to skip the card, or they can write alt text for it. Once alt text has been written, they submit it and are given another card.

### Verify Mode
In verify mode, a user is shown a card that already has alt text written for it. They must read the alt text and decide whether it is good enough to verify. If not, they can reject the card and write improved or replacement alt text for the card (the card will need to be verified again if new alt text is written for it). Alternatively, they can choose to verify the alt text and move on to a new card.

### Download
By clicking the download button, a CSV file containing every illustration that has had alt text written and verified will be downloaded. The CSV file will include the card name, a unique illustration_id from [Scryfall's Database](https://scryfall.com/), the link to the card art, and the alt text. This information can be used to automatically implement alt text into nearly any program.

## Future Improvements
- Walkthrough on first visit
- Portrait mode support
- Leaderboard system
- Admin page for final verifications
