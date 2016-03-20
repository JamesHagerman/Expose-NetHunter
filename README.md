# Expose NetHunter

This project will expose the underbelly of NetHunter (and, in part, Kali) to
web developers.

# Warning!

This is absolutely insecure! The fetcher can tar any directory in the nethunter
chroot! Don't run this unless you're aware of what you're doing!!

## Why?

Info sec tools are plagued by bad design. Even NetHunter, the supposed "easy
way", has numerous UI glitches, difficult to understand menu systems, poorly
defined config panels, and the lack of an easy to develop, modular extension
architecture.

Meanwhile, web tech has grown far faster than anyone in the info sec community
seems to fully realize. Considering the severe lack of UI/UX design for the
existing tools, it's no wonder that the industries are so separate.


## How does this work?

This runs on Node.js and hosts a web-based front end for various nethunter
tools. That means you need to have nodejs on your mobile device... but since it
comes with nethunter, we're in luck out of the box.

I'll get back to this. I want tooling NOW.

## Getting it working on my nethunter device:

After you install nethunter, you'll need to fix the nodejs apt package so that
it makes a symlink from node to nodejs. The node package is NOT node.js and this
symlink will conflict with that packages binary name.

```
sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10
```

After that, you should be able to grab the repo, run `npm install`, and start
the server from a shell:

```
mkdir ~/dev
cd ~/dev
git clone https://github.com/JamesHagerman/Expose-NetHunter.git
cd Expose-NetHunter
npm install  <-- this will take time. Do it on wifi or your data hit will be large
node server.js
```

Once it's started, point the browser to you're phone's ip: `http://ip.goes.here.man:3000/`

There is no functionality built yet for hitting the server from your phone but
something will exist in time. When that happens point the browser on your phone
at: `http://0.0.0.0:3000/`

## It doesn't work

Sorry. Debug it, submit a pull request, or add an issue in the gihub tracker.

I give you no promises about this software. I ain't always gonna be around to fix
it for you.
