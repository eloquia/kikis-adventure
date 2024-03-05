# Kiki's Adventure

## Summary

*Kiki's Adventure* is a mobile game creating in JavaScript with Phaser and Capacitor. Currently it only supports deployment on:

- iPhones
- Home network
- Home server on network that runs a file server that provides the image and audio files for the game

It's designed this way because it was just a pet project to understand how Phaser and Capacitor work along with Xcode and iOS development.

## Running the Stack

### Dev Mode

This repo has everything needed to run the game as a 

### Prereqs

You'll need

- an iPhone in dev mode (optional)
- a computer with Xcode and some kind of Apple Developer license
- Home WiFi
- choice of home server (Docker will be described below)

### Docker File Server

Assuming you have [Docker] installed, create *assets/images* and *assets/sounds* folders. Then you can run the following command using the [halverneus/static-file-server - Docker](https://hub.docker.com/r/halverneus/static-file-server/dockerfile#!) image.

```bash
docker run -d -v ./assets:/web -p 8080:8080 -e CORS=true halverneus/static-file-server:latest
```

If you don't have the image and sound files, you can find their names and extensions in [BootScene.js](src/scenes/BootScene.js)

### Building for iOS

1. `git clone` the project
2. Run `npm install`
3. Find your home server's IP and modify [config.ios.local.ts](config.ios.local.ts) or create your own file (you'll also need to change values in [constants.ts](src/constants.ts) and [BootScene.js](src/scenes/BootScene.js))
4. Setup [Xcode](https://developer.apple.com/xcode/)
5. Run `npm run ios` which converts the project into something runnable for iOS
6. Once *Xcode* is open, add an image for the `AppIcon`
7. Plug in your device (or use an emulator) and run the app

## Roadmap

I've pretty much done everything that I wanted to achieve. The only thing that's remaining is to figure out how to prevent the game from resizing everything when the keyboard opens. Originally this game was supposed to be a scavenger hunt aide, which prompted the user to input text whenever a clue was found in the real world. However I refactored it so that the user could simply just tap on the found word, thus taking out the scavenger hunt aspect. If you want to take on the challenge of preventing resize, be my guest. The keyboard code is commented out in [CluesScene.js](src/scenes/CluesScene.js).

## Credits & Disclaimer

I do not own or claim to own any assets, images, or likeness of any characters created, registered, and trademarked by Studio Ghibli. In addition I do not intend to profit off of using any of the previously mentioned assets in the past, present, or future.
