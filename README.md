# Timer Game

Local HTML/CSS/JavaScript game  for Midnight Launch, matching the Raffle Picker's burgundy palette, system typography, and cinema-style background. The complete supplied Inbox Stores PNG is displayed with its black/white background intact. Layout and touch targets are optimized for iPad Pro in portrait and landscape. Open `index.html` in a browser. No installation or internet connection is needed on a computer.

One Start / Stop button controls each attempt. After stopping, Start begins a fresh attempt. Mouse and touch are registered on press; keyboard and assistive technology also work.

Target: 18 seconds. The final elapsed time is rounded to the nearest millisecond, and that same value determines the result:

- Exactly 18.000: **You Win!**
- A nonzero absolute difference below 0.500 seconds: **So Close!** (a loss).
- A difference of 0.500 seconds or more: **Better luck next time**.

The timing uses a monotonic clock independently of display animation. Going to another tab or backgrounding the app interrupts the attempt. Three decimal places describe the game's scoring precision, not a guarantee of physical touch accuracy.

For iPhone/iPad use, serve these files through a website and open its URL in Safari. This initial version is local source; it is not yet hosted, packaged as an iOS app, or configured for installed offline use on iOS.
