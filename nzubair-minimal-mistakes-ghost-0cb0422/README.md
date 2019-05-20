# Minimal Mistakes for Ghost

Minimal Mistakes (for Ghost) is a port of [Michael Rose's](https://github.com/mmistakes) Jekyll theme, [Minimal Mistake](https://github.com/mmistakes/minimal-mistakes) for [Ghost](https://ghost.org/) platform. 


**NOTE**

  > Please note that this iteration of Minimal Mistakes is based on [v4.1.1](https://github.com/mmistakes/minimal-mistakes/tree/4.1.1)
of Minimal Mistakes for Jekyll.
  >
  >This was a purely selfish decision, as I was looking to replicate my Jekyll theme as is. If time permits, I will bring it up to a 
more recent version of Minimal Mistakes.



## TODO

 - [x] Syntax Highlighting
 - [ ] Koenig Styles Testing -`.kg-*`
 - [ ] Blog cover picture
 - [ ] Post/page cover picture.

## Configuration.

### Author

This theme requires one or more authors, not named `ghost`. Author details in the sidebar are rendered based on current post/page author.  Although, my testing was limited to a single author, it should support multiple authors.

Author information is pulled from the system. Please make sure that author Name, Bio, location, and picture are fully populated.

### Blog Details

Blog title, Description, icon, etc. are also pulled from the system using `@blog` helper. Please ensure that information is populated.

### Social Media Links

Ghost is a bit limited in that it doesn't let you add arbitrary configuration. Therefore, most of the social media information are stored in partials located within `partials/social` directory. For example, `partials/social/twitter.hbs` contains my Twitter handle.

It is included in the sidebar and footer using `{{> "social/twitter"}}` syntax.

Most of the social media links are found in the `sidebar.hbs` or footer section of the `default.hbs`. That's where you can add any additional ones.

### Blog Title

Although most places reference the blog title using `@blog.title` helper, I had the need for a bit stylized title for use at the top of the page. 

`_sass/_masthead.scss` contains the style definition for `masthead_left` and `masthead_right` classes which are combined to produce the two colored look.

`partials/blogtitle.hbs` contains the HTML snippet for using the above mentioned styles. This partial is included with the `partials/navigation.hbs`.

### Analytics

`analytics.hbs` has been removed. Analytics code, Google or otherwise, should be injected via `Code Injection` are of the admin interface.


