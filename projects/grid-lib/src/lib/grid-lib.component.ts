import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICell } from './cell.interface';
import { GridLibService } from './grid-lib.service';

@Component({
    selector: 'clicking-Grid',
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
    @Input() canvasSize: number = 900;
    @Input() borderSize: number = 20;
    @Input() rgbaColor: string = 'rgba(0,0, 0,.7)';
    @Input() uppercase: boolean = true;
    @Input() numbersInXAxis: boolean = true;
    @Input() numbersInYAxis: boolean = false;
    @Output() getDataCellList = new EventEmitter<ICell[]>();

    private cellsList: ICell[] = [];
    private cellSizeX: number = 0;
    private cellSizeY: number = 0;
    private isNew: boolean = true;

    ngOnInit(): void {
        this.prepareCanvas();
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
        if (this.cellsInXAxis == 0 || this.cellsInYAxis == 0)
            return; //Send error if the cellsInXAxis or cellsInYAxis is 0 
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
        ctx.font = this.borderSize > 10 ? `${this.borderSize - 5}px Arial` : ctx.font = `5px Arial`;

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
                        ctx.fillStyle = this.rgbaColor;
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
            if (this.numbersInXAxis)
                ctx.fillText(" " + (x + 1), xx + this.borderSize, 0);
            else
                ctx.fillText(this.colName(x), xx + this.borderSize, 0);

        }

        for (let y = 0; y < img.height / this.cellSizeY; y++) {
            ctx.textBaseline = "top";
            const yy = y * this.cellSizeY;
            ctx.fillStyle = "black";
            ctx.fillRect(0, yy + this.borderSize, this.borderSize, this.cellSizeY);
            ctx.fillStyle = "white";
            if (this.numbersInYAxis)
                ctx.fillText(" " + (y + 1), 0, yy + this.borderSize);
            else
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
                        this.getDataCellList.emit(this.cellsList);
                        return;
                    }
                    ctx.fillStyle = this.rgbaColor;
                    ctx.fillRect(xx + this.borderSize, yy + this.borderSize, this.cellSizeX, this.cellSizeY);
                    if (cell != null)
                        cell.isActive = false;
                    this.gridService.getDataCellList(this.cellsList);
                    this.getDataCellList.emit(this.cellsList);
                    return;
                }
            }
        }
    }

    private colName(n: number) {
        var ordA = this.uppercase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        var ordZ = this.uppercase ? 'Z'.charCodeAt(0) : 'z'.charCodeAt(0);
        var len = ordZ - ordA + 1;
        var s = "";
        while (n >= 0) {
            s = String.fromCharCode(n % len + ordA) + s;
            n = Math.floor(n / len) - 1;
        }
        return s;
    }
}