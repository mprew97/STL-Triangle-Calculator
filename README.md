# STL File Parse

STL File Parser is a small project for calculating both the number of triangles given in an STL file as well as the total area of the
STL object based.

## Dependencies
- Node.js https://nodejs.org/en/download/
- Typescript https://www.typescriptlang.org/download

## Installation

Use the package manager ```npm``` to install the necessary packages for running the project.

In the project dir, run the following command:

```
npm i
```

## Usage

In the project dir, run the following to execute the file:

```
npx ts-node src/index.ts
```

## Design

In coming up with my design of this solution, I started off with just trying to think of what I needed to do. I know I had to read a file, parse that file line by line, and read the information from those lines. I then knew that I would need different data points from these line objects that I'd create in order to then calculate the sum total triangles
and sum total area of the given object. 

This led me initially to create two main functions that contained the bread and butter of the code: ``` processLineByLine()``` and ```calculate3dArea()```.

``` processLineByLine()``` exists in order to read the data and parse it. It initializes some variables that we would like to keep track of as we iterate over the file. Namely ```count``` for the total count of triangles, ```totalArea``` for the sum total area, and ```vertexArray``` to store a set of three vertices to represent the triangle. 


```calculate3dArea()``` exists in order to calculate the actual surface area of a triangle given three different vertices. This function makes use of the Three JS library. It creates a class ```Triangle``` in order to make use of its ```getArea``` method. This library is probably fairly heavy, but since we're not importing the entire Three library, just some of its methods, it doesn't make the file too terribly large on execution.

I also added some functions for some conditions. I've recently been introduced to the idea of having some functions for conditions because it can make your code more readable because it can start to read like prose. For example, ```if (isTriangle(vertices))... ``` reads better than ```if(vertices.length === 3) ...```. Although you could still gather that what I'm trying to do if you think about it, it's more clear from the get go if you have a named function. There are a few examples of these in my code: ```isTriangle```, ```hasVertex```, and ```isFacet```. 

As for the design of my file structure, I kept it simple and in line with most JS projects. We have our configs on the parent level of the directory and the actual code resides in ```src```. I put the ```assets``` folder in ```src``` simply cause I thought it looked better, but I have seen some instances where people prefer that at the root as well. 

I did not try to make this into a class, mainly because the current code is simple enough to not warrant it, although if it needed to be extended and there were to be more functions added, and STL Parser class or Triangle Calculations class would be nice for scalability and extensibility. 

## Performance Improvements

As of now the code runs in O(n) ^ 2 so it's fairly performant. Not the greatest, but it does the job. Assuming we had to calculate millions, it would probably start to bottleneck and would need some refactoring. The code is at a minimum going to have to read the file line by line. The improvements would have to come in where the data is being parsed line by line. I think there's probably a better way to extract the information I need, specifically in trying to grab the vector points but not sure how that might best be approached. I know it wasn't on the table for this project, but there are some pretty well maintained STL JS libraries that I'm sure would handle the parsing in much more performant ways so I would definitely start by looking there and researching if those libs fit the project needs/requirements. 
