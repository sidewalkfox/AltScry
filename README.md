# AltScry

A crowdsourcing website for the game Magic: The Gathering that allows users to write and verify alt text for card art.

## Inspiration
One of the many things Magic: The Gathering is known for is its beautiful card art… [with a few exceptions](https://scryfall.com/card/sta/38/faithless-looting). This art doesn’t just add to the game; it tells a story of its own. [Smothering Tithe](https://scryfall.com/card/cmm/57/smothering-tithe) shows a chilling depiction of greed. [Progenitus](https://scryfall.com/card/fdn/244/progenitus) is a creature of unfathomable size to go with its absurd mana cost, power, and toughness. [Bagel and Schmear](https://scryfall.com/card/spm/161/bagel-and-schmear)… well that’s just a bagel and cream cheese, but you get the idea.

However, for those who are blind or low vision, this aspect of the game isn’t available. Before the digital age, this was just something blind people had to deal with. But now, we have alt text. Alt text, short for alternative text, is a written description of an image so those who cannot see the image can still understand the content. This isn’t exclusive to those who are blind or low vision. A device that cannot load an image, for whatever reason, will rather display alt text so the user has context of what the image would have contained if it had loaded properly. Unfortunately, alt text for Magic: The Gathering cards has not been written, [despite Magic being available to play digitally for years now](https://www.mtgo.com/).

Not fearing a challenge, and without realizing how far in over my head I was getting, I set my mind to creating a solution. Really, there are only two ways alt text for Magic cards can be written: artificial intelligence or by hand.

I considered the AI route flawed right from the start. Not only is there great nuance in Magic: The Gathering card art that AI would not be able to pick up on, AI is expensive, controversial, and frankly, against the spirit of what this project means to me. Magic: The Gathering cards are designed by humans, the art is drawn by hand, and the game is played by people. [As much as I recognize what AI has done and will do for the world of assistive technology](https://www.freedomscientific.com/training/jaws/picture-smart-ai/), I want AltScry to be a purely human project.

That brings me to the second option: writing alt text by hand. The largest issue with this approach? There are (as of writing this) 54,096 different Magic: The Gathering card illustrations. Assuming it took someone a mere ten seconds to write alt text for a card (which it doesn't), it would take that same person 6 days, 6 hours, and 16 minutes of non-stop work to get through every card.

## Features

### Contribute Mode
AltScry has two main modes that one can use to submit alt text. When first loading the website, you will be placed into “contribute” mode. In this mode, you will be given a random Magic: The Gathering card that has not had alt text written for it yet. Your job as a contributor is to look at the card art and write alt text in the box to the right.

Once you are happy with what you have written, you can click submit, and AltScry will send your alt text to the database and serve you a new card. If you do not want to write alt text for a card for any reason, you may click the skip button, and you will be given a new card.

### Verify Mode
You may also switch to “verify” mode, in which case you will be given a card that has alt text already written for it. Your job as a verifier is to make sure the alt text that has been written is of high quality. This includes, but is not limited to, making sure the alt text written accurately depicts the art, making sure spelling and grammar is adequate, and making sure the alt text is helpful. If the previously submitted alt text is of high quality, you can press the “confirm” button, and the card will be marked as verified. If you think the alt text needs to be improved, you can click the “reject” button, the text box will become writable, you will make any corrections you see fit, and you’ll resubmit the alt text to be verified again.

### Additional Features
If you would like more information about the particular art you are looking at, you can click the name of the card, which will take you to [Scryfall](https://scryfall.com/)’s website that includes every other card that uses the same art as the one you are currently looking at.

Additionally, at any time, you may rotate the card 90 degrees in the event that a card was printed horizontally, which is the case for certain “[art series](https://scryfall.com/search?q=is%3Aartseries)” cards and certain card types such as [gates](https://scryfall.com/search?q=type%3Agate) and [rooms](https://scryfall.com/search?q=type%3Aroom).

### Download
By clicking the “Download CSV” button, a CSV file containing every illustration that has had alt text written and verified will be downloaded. The CSV file will include the card name, a unique illustration_id from Scryfall's Database, the link to the card art, and the alt text. This information can be used to automatically implement alt text into nearly any program. I plan to have this button available for as long as possible, but as more alt text gets written, bandwidth becomes a concern. I may remove the button down the line and replace it with a more bandwidth conscious solution.

## Future Improvements
The big three improvements I want to make to AltScry is a walkthrough on a user’s first visit to the site, user interface support for more devices, and an admin page for doing final verifications.

The walkthrough is pretty straightforward. [Writing alt text isn’t complicated by any means](https://accessibility.huit.harvard.edu/describe-content-images), but it isn’t always intuitive. Giving first time users a guide on how alt text should be written lessens the likelihood of a card needing be verified multiple times and speeds up the process as a whole.

As of making this video, AltScry is more or less unusable on mobile. It was primarily designed for use on a desktop or laptop computer, because personally, I find typing with a keyboard much easier and more efficient, but I recognize that not everyone shares that same opinion, and many users will want to participate in AltScry using the device they are most comfortable with.

Finally, a comprehensive review process will ensure that submitted alt text is as effective and accurate as possible. Once a substantial collection of alt text has been completed, I will find experts from both the Magic: The Gathering and assistive technology communities to conduct a final verification.

### My Goal
What exactly do I hope to accomplish with this project? Frankly, I hope this project inspires Wizards of the Coast to start writing alt text themselves. As much as I believe in community support and crowdsourcing, it shouldn’t be the community’s job to make Magic: The Gathering accessible for more people.

AltScry is a great tool to retroactively create alt text for old paper cards, and this information can be provided to Wizards of the Coast to update [their card search tool](https://gatherer.wizards.com/), or sent to community run projects such as Scryfall to give more people access to it. But in the future, I hope to see accessibility for card games, not just Magic: The Gathering, be a priority for game designers. We have the technology, now, we just have to do it.