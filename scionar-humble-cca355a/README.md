# Humble :pray:

Content focused [Ghost](https://ghost.org/) theme. Includes index and post page styles. Style is inspired from [koajs.com](http://koajs.com/) and [github.com](https://github.com/). This theme is in use at [joonaviertola.com](https://joonaviertola.com).

## Disqus support

Theme has Disqus preinstalled. To enable Disqus with your own configuration, add
next code snippet into blog header. This can be done from admin panel via code injection section:

```
<script>
  USE_DISQUS = true;
  DISQUS_SHORTNAME = 'joonaviertola';
</script>
```

Remember to use your own configuration which you get from your Disqus tools.

## Development

Theme uses Sass (SCSS syntax) and uses BEM naming methodology.

Install compiler.

```
npm install
```

Compile Sass.

```
npm run compile-sass
```

Run Sass compiling on change.
```
npm run watch-sass
```
