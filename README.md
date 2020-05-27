# Portfolio.kalen
> A small express app to showcase the portfolio of work I have completed at Treehouse.


Portfolio.kalen is an express app that showcases projects I have completed at Treehouse. These projects range from a simple quote generator to this very app. My hope is that after reviewing these projects you will be able to see some of the technical and problem solving skill I have developed.

This app uses [Morgan](https://github.com/expressjs/morgan) for logging, [Color.js](https://github.com/Marak/colors.js) for beautifying some console logs, and [Cookie-parser](https://github.com/expressjs/cookie-parser) for helping to set the font per user selection.

While the base templates from Treehouse have been used, the following adjustments have been made:
- Background colors for most elements have been changed, each project on the index has a slight transform applied on mouseover and a box shadow. Images on Project pages have a very slight box shadow on mouse over.
- The default font family have been changed, however if the user has difficulty reading the font they are encouraged to select the 'Higher Contrast Font' option in the lower left corner
- A Favicon has been added to the project
- The currently in development [Bubbles](https://github.com/kalenhoneyfield/bubbles) class has also been added to the project for some fun
- While on a project page a next or back button may appear to help cycle the user through the projects, and the previous Back buttons have been renamed Home for better clarity of purpose

<!-- ![](need a screen shot) -->

## Installation


```sh
git clone https://github.com/kalenhoneyfield/FSJS-Techdegree-ProjectSix.git
npm install
```

## Usage example

```sh
npm start
```
Once you see that the server has started in the console, visit [localhost:3000](http://127.0.0.1:3000)

If you have cloned this and are looking to further develop with it you may prefer.
This was added in case the user doesn't have admin privs on their desktop
```sh
npm run nodemon
```

## Meta

Kalen Honeyfield – [@KHoneyfield](https://twitter.com/khoneyfield) – kalenhoneyfield@gmail.com

[KalenHoneyfield@github](https://github.com/kalenhoneyfield/)




