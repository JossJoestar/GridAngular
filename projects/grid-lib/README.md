# Clicking Grid

> First Version Of **A Simple, Interesting And Native But Powerful Grid Library** For Angular.

This grid is designed to place an image in it, and to be able to highlight different points of the image at the same time by just pressing the button click on one of the cells.![enter image description here](https://raw.githubusercontent.com/JossJoestar/GridAngular/develop/src/assets/example/Example3.PNG)

## Set Up

> **The only thing you need is to place the url and the component will do the rest for you.**

```
<clicking-Grid [imageURL]="url">
</clicking-Grid>
```
![enter image description here](https://raw.githubusercontent.com/JossJoestar/GridAngular/develop/src/assets/tutorial/Step%201.PNG)

By making data binding to a variable that has the value of the url, the component places automatic values for each of the configurations.

**You can change the number of rows and columns easily with the variables cellsInXAxis and cellsInYAxis.**

```
<clicking-Grid
	[imageURL]="url"
	[cellsInXAxis]="10"
	[cellsInYAxis]="15">
</clicking-Grid>
```
![enter image description here](https://raw.githubusercontent.com/JossJoestar/GridAngular/develop/src/assets/tutorial/Step%202.PNG)

By default the values are 5, **but you can change them and they are independent,** so don't be afraid to play with them.
  
In the same way **you can change the canvas size**.
But **keep in mind that this includes the size of the borders**, but don't worry, **you can also customize them.**

```
<clicking-Grid
	[canvasSize]="500"
	[borderSize]="25">
</clicking-Grid>
```
![enter image description here](https://raw.githubusercontent.com/JossJoestar/GridAngular/develop/src/assets/tutorial/Step%203.PNG)

In addition you can also **change the rgba color with which the squares will be painted on the canvas.**
```
<clicking-Grid
	[imageURL]="url"
	[rgbaColor]="rgba">
</clicking-Grid>
```
![enter image description here](https://raw.githubusercontent.com/JossJoestar/GridAngular/develop/src/assets/tutorial/Step%204.PNG)

With the **capitalLetter property you can decide between uppercase or lowercase** to display on the grid.
```
<clicking-Grid
	[imageURL]="url"
	[uppercase]="false">
</clicking-Grid>
```
![enter image description here](https://raw.githubusercontent.com/JossJoestar/GridAngular/develop/src/assets/tutorial/Step%205.PNG)

Finally **with the properties numbersInXAxis and numbersInYAxis you can choose whether to display numbers or letters in each of the axes.**
```
<clicking-Grid
	[imageURL]="url"
	[numbersInXAxis]="false"
	[numbersInYAxis]="true">
</clicking-Grid>
```
![enter image description here](https://raw.githubusercontent.com/JossJoestar/GridAngular/develop/src/assets/tutorial/Step%206%20y%207.PNG)
## ADDITIONAL
**None of the properties exclude other properties** (or they should be), so you can make as many combinations as you want.

    <clicking-Grid
    	[imageURL]="url"
    	[cellsInXAxis]="10"
    	[cellsInYAxis]="10"
    	[canvasSize]="800"
    	[borderSize]="15"
    	[rgbaColor]="rgba"
    	[uppercase]="true"
    	[numbersInXAxis]="true"
    	[numbersInYAxis]="false">
    </clicking-Grid>
|Variable| What does |
|--|--|
| imageURL |In it the url of the image to be displayed is placed  |
|cellsInXAxis|Indicates the number of cells to open on the X axis|
|cellsInYAxis|Indicates the number of cells to open on the Y axis|
|canvasSize|Set the size of the canvas|
|borderSize|Set the size of the border of the canvas, remember that the numbers and letters peeled off on it are 5px smaller|
|rgbaColor|Set the color the cells are painted from when selecting, set an rgba value, example: rgba (0,0,0, .5)|
|uppercase|Show uppercase or lowercase letters on the edges|
|numbersInXAxis|Set numbers on the edges of the X axis|
|numbersInYAxis|Set numbers on the edges of the Y axis|

## Who Made This?
Just another IT engineer
Send Me A Email:  oreoslawiet@gmail.com
Follow me here!!! 
**Trans Rights Are Human Rights**
