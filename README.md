# Base webpack

## Build setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8000
$ npm run dev

# build for production with minification and serve dist files at localhost:8080
$ npm run build
```

## Laravel setup

You can proxy webpack server, or calling `app.js` from webpack server, example:

```sh
# running
$ npm run dev

# will log something like
Webpack server listening at:
http://localhost:8080
http://192.168.0.4:8080
```

Then you will need add the script with the correct src

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <script src="http://192.168.0.4:8080/app.js"></script>
  </body>
</html>
```

I used `IP` for see the web page from external devices.
