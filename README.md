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

You can proxy webpack server, or calling js from webpack server, example:

```sh
# running
$ env HOST=192.168.1.35 npm run dev
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <script src="192.168.1.35:8000/app.js"></script>
  </body>
</html>
```

**Important**, you will need pass `HOST` env variable to `npm run dev`, if not, `HMR` will not works.
