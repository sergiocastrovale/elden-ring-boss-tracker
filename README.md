# Elden Ring Boss Tracker

This is a tracker for the bosses you have defeated in Elden Ring (including the Shadow of the Erdtree
DLC). In total, this game features 272 + 62 bosses, and keeping track of all events is pretty much
impossible. Hopefully this tool will help you navigate the game a bit better without spoiling away any
progression.

This tool leverages the two best sources of information on the internet: MapGenie's [boss tracker](https://mapgenie.io/elden-ring/checklist) and [map](https://mapgenie.io/elden-ring/maps/the-lands-between) and [the Wiki](https://eldenring.wiki.fextralife.com/Elden+Ring+Wiki) . It also includes some other handy features, like searching and, since it relies on your browser's local storage, an import and export mechanism so you can send it to other devices if needed.

You can use it at <https://elden-ring-boss-tracker.vercel.app/>.

![The tracker](1.png 'The tracker')

The tracker

![Mobile friendly!](2.png 'Mobile friendly!')

Mobile friendly!

## Why did you build this?

I was looking for an excuse to do a "dev speedrun" of sorts by building a very small app as quickly as possible. As I was playing Elden Ring at the time, this seemed like a quick - but useful - project to work on.

The initial version took me about six hours to develop. Unfortunately, as it is customary, I got excited with the project and kept on adding features 🤷

## Caveats

This tool uses your browser's Local Storage - which means, the list is only stored in your browser. As such, there's no login or multi-device sync whatsoever and everything is saved in the machine/browser you're interacting with.

I added an import / export feature so that the data could be saved and used in multiple places, but this is a manual process. Keep in mind that if you clear cookies and local storage in said browser, you will lose all your tracked progress.
