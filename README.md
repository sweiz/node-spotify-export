node-spotify-export
==============

Description
-----------
Let's convert a Spotify playlist into another format! (currently only [XSPF](http://www.xspf.org/xspf-v1.html#rfc.section.4.1.1.2.2) for use with [Clementine](https://www.clementine-player.org/))

Inspired by (and blatant rip-off of) ruby-powered [https://github.com/jlund/spotify-export](https://github.com/jlund/spotify-export)


1. Open Spotify and go to the playlist that you want to export
2. Select the tracks that you want to export (Ctrl-A or Cmd-A to Select All)
3. Right-click on the selected tracks and choose "Copy Spotify URI" from the menu
4. Go to the text editor of your choice and Paste
5. Save the file
6. Run node index.js your-filename

Running the command will output a file called `your-filename.xspf` which can be imported into Clementine. 

Enjoy!


Features
--------
* Lookups are performed using the super-efficient Spotify Web API
* Creates file using templates/xspf.hbs - make your own templates for other formats!

API
---
`node index.js {your-filename} {output-template}`


Packages
------------
* [Handlebars](https://github.com/wycats/handlebars.js)
* [Progress](https://github.com/visionmedia/node-progress)
* [Request](https://github.com/request/request)

Setup
-----
* `$ git clone git@github.com:sweiz/node-spotify-export.git && cd node-spotify-export && npm install`


Acknowledgments
---------------
This product uses a SPOTIFY API but is not endorsed, certified or otherwise approved in any way by Spotify. Spotify is the registered trade mark of the Spotify Group.

License
-------
The MIT License (MIT)

Copyright (c) 2012-2013 Sam Jury

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
