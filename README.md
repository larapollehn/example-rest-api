# Example API
A short example of a REST API built on express.js with a http server.

# Download & Setup

## Clone
```bash 
$ git clone https://github.com/larapollehn/example-rest-api.git
```

## Install Dependencies
```bash 
$ npm install
```

## Setup Last.fm API

This REST API uses the [Last.fm Music Discovery API](https://www.last.fm/api). 

1. Get an API account
2. Apply for [API Authentication](https://www.last.fm/api/authentication)
3. Set API Key in your .env
4. Set the [API root URL](https://www.last.fm/api/intro) in your .env 

## Run tests
```bash 
$ npm run test
```

## Start HTTP Server

```bash 
$ npm run start
```

Alternatively start manually via terminal.
```bash
$ cd example-api
$ node src/server.js
```

Check Terminal for success log. It should look similar to this:
```bash
$ npm run start

> example-api@1.0.0 start
> node src/server.js

Server is running on port  3000

```

# Use API

`GET /artists/`

```text
http://localhost:3000/artists?artist=Foo+Fighters&file=my_heros.csv
```

Expected response:

```json
{
    "success": true,
    "data": {
        "type": "search",
        "artists": [
            {
                "name": "Foo Fighters",
                "listeners": "4483283",
                "mbid": "67f66c07-6e61-4026-ade5-7e782fad3a5d",
                "url": "https://www.last.fm/music/Foo+Fighters",
                "streamable": "0",
                "image": [
                        {
                        "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                        "size": "small"
                        }
                ],
            },
        ]
    },
    "saved_to_csv": {
        "success": true,
        "filename": "my_heros.csv"
    }
}
```

Expected response if Last.fm API returns no result for artists name:

```text
http://localhost:3000/artists?artist=dsfkdsjf&file=my_heros.csv
```

```json
{
    "success": true,
    "data": {
        "type": "random",
        "artists": [
            {"name": "FooFighters"},
            {"name": "The Prodigy"},
            {"name": "Doja Cat"},
            {"name": "Stevie Nix"},
            {"name": "U2"}
        ],
    }
}

```