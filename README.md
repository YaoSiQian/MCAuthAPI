# MCAuthAPI

A simple minecraft account linker for developers. Allow your users to verify that they own said minecraft accounts. Companion [Minecraft Plugin](https://github.com/imabanana80/MCAuth) required. See installation guide below on how to set everything up.

## Installation & Setup Guide

For this guide, I will be using an Ubuntu 22.04 Linux VPS to host the API.

The first part of the guide will take you through setting up the API, and the second part will take you through setting up the minecraft server/plugin, and the last part will tell how how to implement it into your own programs.

### Part 1.1: Downloading dependencies

You will need nodejs (and npm) and pm2 for the API to work.

To install nodejs (and npm) you can follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04).

To install pm2 run the following:

```
npm install pm2 -g
```

### Part 1.2: Clone this repository

I reccomend creating a directory to place all the files in.

```
mkdir mcauthapi && cd mcauthapi/
```

Clone this repository and navigate into it

```
git clone https://github.com/Imabanana80/MCAuthAPI && cd MCAuthAPI/
```

### Part 1.3: Installing node packages

Install all the required node packages

```
npm install
```

this should automatically install both expressjs and all other needed dependencies

### Part 1.4: Configuring port and token

Rename .envtemplate to .env

```
mv .envtemplate .env
```

Open the .env file with nano

```
nano .env
```

Replace "verysecuretoken" with a token of choice. Save your token somewhere secure as we will need it in part 2. If you know what you are doing, you can configure the port too. By default it uses port 3000.

```
PORT=3000
TOKEN=yourtoken
```

### Part 1.5: Configuring the firewall

You may need to complete this step for the api to work.

```
ufw allow 3000
```

### Part 1.6: Starting the API

Start the API using pm2. For a more detailed guide on how to use pm2, check out the [official pm2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).

```
pm2 start src/index.js
```

this assumes that you are running it in ./MCAuthAPI

Congratulations! the API should be working now.

### Part 2.1 Downloading & Installing the companion MCAuth Plugin

Download the MCAuth plugin .jar from https://github.com/Imabanana80/MCAuth/releases/latest

Drag the `MCAuth-1.x.x.jar` into your server's /plugins directory and start the server.

Do note that running /link at this time would result in error's being thrown.

### Part 2.2 Configuring the plugin

The plugin should have generated a /MCAuth directory in your server's plugins folder, which should contain a config.yml file. Open this file in your preferred text editor.

Make sure you stop the server before proceeding

Replace the placeholder url with your api's linux server ip and port, along with the route as shown below.
Replace the placeholder token with the token you have previously configured.

```
url: http://45.76.162.214:3000/newcode
token: yourtoken
```

You can now start your server, and /link should work.

Congratulations! You have finished setting up both the API and plugin

### Part 3 How to implement the auth features into your program

Now that you have hosted the API and minecraft server, you can allow your users to join the minecraft server and run the command `/link`

After running that command, they will be prompted to copy a code that will expire in 5 mins.

In your program, you would request that they give you this code, and you can send a request to your api's `/auth` endpoint (`http://45.76.162.214:3000/auth` in my case) with the code as the body:

```
{
	"code": "38e9c945"
}
```

If the code they gave you is valid, you will recieve their minecraft uuid.

```
{
	"code": "38e9c945",
	"uuid": "c4b04ee5c09041f2b34e8e302c626d67"
}
```

You can then parse this data and save it in your database or use it however you want.

#### If you ran into any issues while setting this up, or have encountered any bugs, please open an issue.

#### Do note that MCAuthAPI is still in development and is still lacking many features i intend to add.

### Coming soon...

- Auth token for /auth endpoint
- Move the plugin download to modrinth
- `/link` command cooldown
- Configurable code expiration

###### If you have any suggestions for features, feel free to create in issue :/.
