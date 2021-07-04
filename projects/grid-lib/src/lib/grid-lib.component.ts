import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICell } from './cell.interface';
import { GridLibService } from './grid-lib.service';

@Component({
    selector: 'grid-VanHouten',
    template: `
    <canvas id="canvasGrid"></canvas>
    `,
    styles: [
    ]
})
export class GridLibComponent implements OnInit {

    constructor(private gridService: GridLibService) { }

    @Input() imageURL: string = '';
    @Input() cellsInXAxis: number = 5;
    @Input() cellsInYAxis: number = 5;
    @Output() getDataCellList = new EventEmitter<ICell[]>();

    private cellNumbers: number = 5;
    private canvasSize: number = 900
    private borderSize: number = 20;
    private cellsList: ICell[] = [];
    private cellSizeX: number = 0;
    private cellSizeY: number = 0;
    private isNew: boolean = true;


    ngOnInit(): void {
        this.prepareCanvas();
    }

    printCells() {
        this.getDataCellList.emit(this.cellsList);
    }

    private prepareCanvas() {
        const canvas = <HTMLCanvasElement>document.getElementById('canvasGrid');
        canvas.width = canvas.height = (this.canvasSize - this.borderSize);
        const ctx = canvas.getContext('2d');
        if (ctx == null)
            return; //Send error if the ctx is null; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.isNew)
            this.cellsList = [];
        this.renderImageInCanvas(canvas, ctx);
    }

    private renderImageInCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        let img = new Image();
        img.src = this.imageURL;
        img.onload = () => {
            if (img.width > canvas.width || img.height > canvas.height) {
                let hRatio = canvas.width / img.width;
                let wRatio = canvas.height / img.height;
                let ratio = Math.min(hRatio, wRatio);
                img.width = img.width * ratio;
                img.height = img.height * ratio;
            }
            canvas.height = img.height + this.borderSize;
            canvas.width = img.width + this.borderSize;
            this.cellSizeX = img.width / this.cellsInXAxis;
            this.cellSizeY = img.height / this.cellsInYAxis;
            ctx.drawImage(img, this.borderSize, this.borderSize, img.width, img.height);
            this.renderGrid(img, ctx);
            if (this.isNew) {
                canvas.addEventListener('click', evt => {
                    if (evt.offsetX < this.borderSize || evt.offsetY < this.borderSize)
                        return
                    const tileX = ~~((evt.offsetX - this.borderSize) / this.cellSizeX);
                    const tileY = ~~((evt.offsetY - this.borderSize) / this.cellSizeY);
                    this.renderSquare(ctx, tileX, tileY, img);
                });
                this.isNew = false;
            }
        };
    }

    private renderGrid(img: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.borderSize, this.borderSize);
        ctx.font = '15px Arial';

        for (let y = 0; y < img.height / this.cellSizeY; y++) {
            for (let x = 0; x < img.width / this.cellSizeX; x++) {
                const xx = x * this.cellSizeX;
                const yy = y * this.cellSizeY;
                ctx.fillStyle = "black";
                ctx.strokeRect(xx + this.borderSize, yy + this.borderSize, this.cellSizeX, this.cellSizeY);
                if (this.isNew)
                    this.cellsList.push({ x: x, y: y, isActive: true });
                else if (!this.isNew) {
                    if (this.cellsList.find(c => c.x == x && c.y == y)?.isActive == false) {
                        ctx.fillStyle = 'rgba(0,0, 0,.7)';
                        ctx.fillRect(xx + this.borderSize, yy + this.borderSize, this.cellSizeX, this.cellSizeY);
                    }
                }
            }
        }

        for (let x = 0; x < img.width / this.cellSizeX; x++) {
            ctx.textBaseline = "top";
            const xx = x * this.cellSizeX;
            ctx.fillStyle = "black";
            ctx.fillRect(xx + this.borderSize, 0, this.cellSizeX, this.borderSize);
            ctx.fillStyle = "white";
            ctx.fillText(" " + (x + 1), xx + this.borderSize, 0);
        }

        for (let y = 0; y < img.height / this.cellSizeY; y++) {
            ctx.textBaseline = "top";
            const yy = y * this.cellSizeY;
            ctx.fillStyle = "black";
            ctx.fillRect(0, yy + this.borderSize, this.borderSize, this.cellSizeY);
            ctx.fillStyle = "white";
            ctx.fillText(this.colName(y), 0, yy + this.borderSize);
        }
    }

    private renderSquare(ctx: CanvasRenderingContext2D, xCord: number, yCord: number, img: HTMLImageElement) {
        for (let y = 0; y < img.height / this.cellSizeY; y++) {
            for (let x = 0; x < img.width / this.cellSizeX; x++) {
                const xx = x * this.cellSizeX;
                const yy = y * this.cellSizeY;
                if (x == xCord && y == yCord) {
                    let cell = this.cellsList.find(c => c.x == xCord && c.y == yCord);
                    if (cell?.isActive == false) {
                        cell.isActive = true;
                        this.prepareCanvas();
                        this.gridService.getDataCellList(this.cellsList);
                        return;
                    }
                    ctx.fillStyle = 'rgba(0,0, 0,.7)';
                    ctx.fillRect(xx + this.borderSize, yy + this.borderSize, this.cellSizeX, this.cellSizeY);
                    if (cell != null)
                        cell.isActive = false;
                    this.gridService.getDataCellList(this.cellsList);
                    return;
                }
            }
        }
    }

    private colName(n: number) {
        var ordA = 'A'.charCodeAt(0);
        var ordZ = 'Z'.charCodeAt(0);
        var len = ordZ - ordA + 1;
        var s = "";
        while (n >= 0) {
            s = String.fromCharCode(n % len + ordA) + s;
            n = Math.floor(n / len) - 1;
        }
        return s;
    }
}