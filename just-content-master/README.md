# Just Content, blogging theme for Ghost with focus on the content

I just want an awesome and simple designed blog, so I created just-content! Inspired by an old design from Segment.com's blog this turned into my private blog that I am now moving to Ghost and open sourcing the theme.

[DEMO](https://www.stephenson.dk) (not powered by Ghost yet, still in the process of moving my blog).

[Download](https://github.com/stephenson/just-content/blob/master/dist/just-content.zip), please provide feedback as [issues here on Github](https://github.com/stephenson/just-content/issues).

Come and help make it awesome!

![Just Content Ghost Theme](https://github.com/stephenson/just-content/blob/master/assets/screenshot-desktop.jpg?raw=true)

## I am in no way perfect

I am not a frontend developer, nor a designer. I am just a script kiddy that likes great design, so please help improve this theme both when it comes to code, features, and design. I am here to learn!

## Local development setup

You need to set up Ghost on your local machine, read the official documentation [here](https://docs.ghost.org/install/local/).

I use [Sass](http://sass-lang.com) to generate CSS files.


Just-content styles are compiled using Gulp/SASS. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
$ yarn install
$ yarn sass
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
$ yarn zip
```
