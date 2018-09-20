# CSS Grid Periodic Table

This is a repo of the code used to create a periodic table of elements laid out in CSS Grid that is currently hosted on Codepen at https://codepen.io/rlahoda/pen/QVxYoE?editors=1100. It uses an AJAX call to a Github repo containing a JSON listing of all of the elements in the table and the various attributes and properties.

## Folder Structure
The project is set up with a `dev` folder that all of the editing is done in. The `gulp` build workflow then generates the files and copies them into the `prod` file where it runs a test web server from. As you make changes to the templates in the `dev` folder the page is automatically updated and the changes are displayed.

Under the `dev` folder there are `scripts`, `scss`, and `templates` folders that contain the Javascript, SASS, and Twig files used to generate the page.

_I need to fix the `gulp` workflow so that it recognizes Javascript updates because currently it does not update correctly and the best way to work on the Javascript is to edit the files in the `prod` directory._

There is also a `reference_files` folder that contains some files that I generated as references to then copy/paste the resulting code into Codepen.

## How It Works
The table is generated using Javascript. There is an AJAX call to a Github repo (https://github.com/Bowserinator/Periodic-Table-JSON) containing a JSON file of the entire periodic table. Once the data is received, the `elementBuilder` function is triggered which starts the process of creating the table.

The JSON data is formatted so that I am able to loop through it and extract the various parts of the information for placing in the markup. To do this, I use a `for...of` loop.

In the loop there are two main actions happening. The first is the creation of the CSS styles that dictate the location in the grid that each element will display in. This uses the `xpos` and `ypos` values found in the JSON data and ES6 template literals to create the text and add in the data. This process starts by creating a `<style>` tag that will be inserted into the `<head>` of the document.

The `xpos` value is used for the `grid-column-start` value and that same value is used to create the `grid-column-end` value by adding 1. Since the traditional periodic table is divided up into 18 columns, if the `xpos` value is 18, there is no grid line 19. CSS Grid uses -1 as the grid line number that represents the very last grid line on the right so there is some logic in the calculation that sets the `grid-column-end` value at -1 if the `xpos` value is 18. Similarly, `grid-row-start` uses the `ypos` value from the JSON data and `grid-row-end` is the `ypos` value + 1. Since the rows for the grid are automatically generated, there is no last line that would require the `grid-row-end` value to be set at -1.

Once the CSS values have been generated they are appended to the `<style>` element so the values for all of the elements keep getting added on as the loop iterates. When the loop completes the function inserts the style element and the compiled CSS values for the elements into the `<head>` of the document.

The second action in the loop is the creation of the actual HTML that is used to display the elements. This is again using template literals to extract the information such as the element name, symbol, atomic weight, and others, and insert them into the markup.

There are some values that I want to make sure are consistent and lowercase, so these use the `toLowerCase()` method. I use the element category as the basis for the element colors in the table but some of the categories have spaces in them. To get rid of spaces and any odd characters that might show up in the data, I have a `replace()` method that includes a regex filter to eliminate any characters or spaces that aren't numbers or letters and replace them with underscores.

As the loop iterates, the generated element html is then appended to the `div` with an id of `chemTable`.

For the pop up box that shows the element details there's a small script that adds and removes an extra css class of `element_detail`. When the class is added the grid-column-start and -end and the grid-row-start and -end are changed to stretch across most of the table. Unfortunately, this property is not able to be animated so, at least for now, the transition is just a cut over to the new location.

Adding the class also triggers other elements to show or shift to display correctly in the new location. In the CSS there is either a child combiner, such as `.element_detail > .atomicWeight` or a descendent combiner, such as `.element_detail .hidden` that trigger this behavior.

## To Install
If you want to play around with this project, download the repo, ensure that you have NPM installed and run `$ npm install` on the command line at the root of the project files. This should install all of the necessary dependencies for the project. Once that has completed, run `$ gulp` on the command line to run the build process, start a webserver, and open your browser with a window showing the project.

As the Twig and CSS files are updated and saved, the the page will reload to show the changes. 
