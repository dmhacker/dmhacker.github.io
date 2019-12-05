---
title: Starting My Own Blog
date: "2019-12-04T20:31:42.247Z"
description: My motivations for and approach to creating a blog
---

It's been a goal of mine to attach a blog to my personal website for a long time,
and I'm happy to say that I finally got around to the task. In order to better 
incorporate the new blogging interface, my website underwent some pretty significant 
internal changes, which I will discuss in my first ever post here!

#### Motivations

My motivations for creating a blog are actually pretty straightforward.

1. I think I have a lot to blog about, but I lacked a medium for it. I love learning
new things, and I would love to share insights that I've made with others who might
be interested in them. In addition, I wanted a (public) space where I could catalog
tidbits of information that I've picked up over the years, so that that knowledge
wouldn't go to waste when I inevitably forget about it.
2. I've always admired other technical content creators and their respective blogs. 
Some that come to mind are those of [Jeff Atwood](https://blog.codinghorror.com/), 
[Tristan Hume](https://thume.ca/), and [David Walsh](https://davidwalsh.name/). 
Even companies these days are starting to maintain their own technical blogs: 
[Bloomberg](https://www.techatbloomberg.com/blog/) (where I worked as an intern), 
[Google](https://www.blog.google/technology/), [Two Sigma](https://www.twosigma.com/insights/), 
[Jane Street](https://blog.janestreet.com/), to name a few.
When designing my blog, I drew inspiration from many of these existing sites.
3. It was the perfect time to do so. As part of my general education requirements
at UCSD, I am required to take a class called [CAT 125](https://sixth.ucsd.edu/cat/courses/cat-125/index.html),
focusing on improving our public rhetoric. The goals of the class and this blog 
lined up perfectly, so this will serve as an extremely useful, long-lasting final
project. Through immediate development of my blog, I am essentially killing two birds 
with one stone.

#### Design Approach

In the past, one of the main things holding me back was the fact that I would
have to develop a lot of infrastructure if I wanted to blog effectively on my
website. When I designed the current iteration of my website two or so years
ago, I did not design it assuming that I would, in the future, want to be able
to connect a blog to it.

Well, actually, let me be more specific. I did design the interface to be as
extensible as possible, and with regards to the UI, my website did not actually
have to change that much to accomodate the blog. However, the internals (my
codebase) would have to change dramatically to support the dynamic functionality
that blogging requires.

Ultimately, however, the main constraint that my website faces is my reliance on 
GitHub Pages to host it. GitHub Pages cannot run web servers, which means that it
cannot use dynamic content; it only serves static HTML files from the repository 
root directory. I realize that the website, even as static HTML and JS files, could 
be configured to load content in dynamically through API calls to some backend 
(or database like Firebase), but I wanted to keep everything entirely self-contained
within GitHub Pages, such that I had no dependencies on external services. The tool
that I eventually choose allowed me to develop within these two criteria.

##### Before the Blog

I intentionally designed my website to be as minimal as possible, both structurally
and visually. This means both minimizing the amount of content on the page, 
minimizing the number of pages, and minimizing the amount of vibrant colors used.
There are several advantages to this design philosophy: (1) you get faster page load
times for free, (2) the muted, uniform color palette is easier on the eyes, and (3)
vibrant colors can be used to highlight important information or otherwise point
out critical sections to the user. Even with the blog now live, I like to think that 
I've still stayed true to these minimalist ideals.

This is what the home page used to look like. That's all the website really was.

![Old Homepage](./old-homepage.jpg)

Because of the website just had to support a single page with some assets, the
codebase was extremely small. In fact, it was almost entirely raw HTML with a
scattering of CSS and JS supporting legacy visualizations. The two important files:

* index.html
* static/css/site.css

The rest of the files were used for supporting old but working visualizations I 
designed using three.js.

![Old Codebase](./old-codebase.jpg)

##### Infrastructure Overhaul

While it's possible to develop a blog using solely HTML (every blog post like 
this one would basically get its own HTML file), this is both cumbersome and
error-prone. The main disadvantages:

1. Every blog post follows a consistent 'external' template, maybe containing
features like a header, footer, and navbar. The only thing differing between
blog posts is the content of the post itself. If I ever wanted to change the
outer template, I would have to go through each blog post and update them
manually. 

2. HTML is tough to write long blogs in. The XML tags and extreme nesting 
structure makes it hard to edit and easy to slip up. A much more natural
choice to develop blogs in is something like Markdown, which can be converted
to HTML but abstracts away all of the tags. In fact, the post you are reading 
right now was [actually written in Markdown](https://github.com/dmhacker/dmhacker.github.io/blob/source/content/blog/blog-12-04-2019-starting-a-blog/index.md).

The next step then was to replace the barebones HTML infrastructure with 
something that could support blogging, namely a <b>static site generator</b>.
I won't really go over the nuances behind static site generators, but if you're
interested in learning more about them, David Welsh wrote 
[a good blog post](https://davidwalsh.name/introduction-static-site-generators)
describing their features, use case scenarios, advantages, and disadvantages.

I choose to use a static site generator called [GatsbyJS](https://www.gatsbyjs.org/). Gatsby allows people
to write websites using their version of [React](https://reactjs.org/) and then compiles the JSX
you write into static HTML files. This flexibility is perfect for a blog,
because it allows you to write posts in your scripting language of choice
(like Markdown) and then, during compilation, convert the Markdown into
an HTML AST dynamically, which can then be loaded into a JSX template. I've
worked a fair amount with React in the past and was familiar with JSX so it 
made Gatsby an easy choice for the static site generator. 

The one-to-one correspondence between JSX and HTML is pretty simple to spot.
In fact, well-formed HTML is essentially JSX in its simplest form. This
made the translation from my old website smooth at first: all I had to
do was transplant the body from my index.html file into an index page
component within Gatsby. The metadata in the head of the HTML I moved
to a [React Helmet](https://github.com/nfl/react-helmet) component. 
Additionally, I was able to use the properties of JSX to shorten some of my 
repetitive home page code, specifically with respect to my projects and 
visualizations sections.

Converting this stuff from HTML to JSX was rather tedious, and one of the
reasons I put off this project for so long, but I am relieved that the
transition went by rather painlessly in the end.

##### Continuous Compilation 

TODO

##### Blogging in Gatsby

TODO

#### Future Plans

TODO
