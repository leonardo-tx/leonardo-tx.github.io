const changeBackground = "linear-gradient(to top, #ffaaaa, #ff9999)";
const sortedBackground = "linear-gradient(to top, #99cc99, #99cc99)";
const removedBackground = "linear-gradient(to top, #ff2211, #ff4433)";


class Sorter {
    private __collection: HTMLCollection | null;
    private __updateInfo: ({ swap, replace, compare, relocation }: { swap: number, replace: number, compare: number, relocation: number }) => void; 
    private __length: number;
    private __swapCount: number = 0;
    private __compareCount: number = 0;
    private __replaceCount: number = 0;
    private __relocationCount: number = 0;

    public get length() {
        return this.__length;
    }

    public get swapCount() {
        return this.__swapCount;
    }

    public get compareCount() {
        return this.__compareCount;
    }

    public get replaceCount() {
        return this.__replaceCount;
    }

    public get relocationCount() {
        return this.__relocationCount;
    }

    public clear(): void {
        this.__collection = null;
        this.__relocationCount = 0;
        this.__replaceCount = 0;
        this.__compareCount = 0;
        this.__swapCount = 0;
    }

    public async shuffle(): Promise<void> {
        const collection = this.__collection;
        this.clear()

        this.__collection = collection;

        for (let i = 0; i < this.length; i++) {
            const j = Math.floor(Math.random() * this.length);
            await this.swap(i, j);
        }
    }

    public async reverse(): Promise<void> {
        const collection = this.__collection;
        this.clear()

        this.__collection = collection;
        const mid = Math.floor(this.length / 2);
        for (let i = 0; i < mid; i++) {
            const j = this.length - 1 - i;
            await this.swap(i, j);
        }
    }

    public async showCorrectIfSorted(): Promise<void> {
        for (let i = 0; i < this.length - 1; i++) {
            if (this.compare(this.get(i), this.get(i + 1), false) > 0) return;
        }
        const sortedLength = this.length / 10;
        for (let i = -sortedLength; i < this.length; i++) {
            const childToRemoveBackground = this.__collection!.item(i - 1) as HTMLDivElement;
            if (childToRemoveBackground !== null) {
                childToRemoveBackground.style.background = "";
            }
            for (let j = i; j < i + sortedLength; j++) {
                const childToAddBackground = this.__collection!.item(j) as HTMLDivElement;
                if (childToAddBackground !== null) {
                    childToAddBackground.style.background = sortedBackground;
                }
            }
            await new Promise(resolve => setTimeout(resolve, 2000 / this.length));
        }
        (this.__collection![this.length - 1] as HTMLDivElement).style.background = "";
    }

    private updateInfo(): void {
        this.__updateInfo({ 
            swap: this.__swapCount, 
            replace: this.__replaceCount, 
            compare: this.__compareCount, 
            relocation: this.__relocationCount
        });
    }

    private async swap(first: number, second: number): Promise<void> {
        const child1 = this.__collection!.item(first) as HTMLDivElement;
        const child2 = this.__collection!.item(second) as HTMLDivElement;

        if (child1 === null || child2 === null) throw Error();
        
        child1.style.background = changeBackground;
        await new Promise(resolve => setTimeout(resolve, 2000 / this.length));
        
        [child1.style.height, child2.style.height] = [child2.style.height, child1.style.height];
        child1.style.background = "";
        child2.style.background = changeBackground;
        
        this.__swapCount += 1;
        this.updateInfo();
        await new Promise(resolve => setTimeout(resolve, 2000 / this.length));
        
        child2.style.background = "";
    }

    private async replace(index: number, value: number): Promise<void> {
        const child = this.__collection!.item(index) as HTMLDivElement;
        if (child === null) throw Error();
        
        child.style.height = `${value}%`;
        child.style.background = changeBackground;
        
        this.__replaceCount += 1;
        this.updateInfo();
        await new Promise(resolve => setTimeout(resolve, 4000 / this.length));
        
        child.style.background = "";
    }

    private async remove(index: number): Promise<void> {
        if (index >= this.length) throw Error()

        let child = this.__collection!.item(index) as HTMLDivElement;
        if (child === null) throw Error();

        child.style.background = removedBackground;
        await new Promise(resolve => requestAnimationFrame(resolve));

        child.style.background = "";
        child.style.height = "";
        child.style.display = "none";

        for (let i = index + 1; i < this.length; i++) {
            const nextChild = this.__collection!.item(i) as HTMLDivElement;
            if (nextChild === null) throw Error();
            
            child.style.background = nextChild.style.background;
            child.style.height = nextChild.style.height;
            child.style.display = "";
            nextChild.style.background = "";
            nextChild.style.height = "";
            nextChild.style.display = "none";
            child = nextChild;
        }
        this.__relocationCount += this.length - index - 1;
        this.__length -= 1;
        this.updateInfo();

    }

    private compare(first: number, second: number, count = true): number {
        if (count) {
            this.__compareCount += 1;
            this.updateInfo();
        }
        return first - second;
    }

    private get(index: number): number {
        if (index >= this.length) throw Error()

        const child = this.__collection!.item(index) as HTMLDivElement
        return parseFloat(child.style.height.slice(0, child.style.height.length - 1));
    }

    constructor(
        collection: HTMLCollection,
        length: number,
        updateInfo: ({ swap, replace, compare, relocation }: { swap: number, replace: number, compare: number, relocation: number }) => void
    ) {
        this.__collection = collection;
        this.__length = length;
        this.__updateInfo = updateInfo;
    }

    public async bubbleSort(): Promise<void> {
        let i = this.length - 1;
        let sorted = false;

        while (!sorted) {
            sorted = true;
            for (let j = 0; j < i; j++) {
                if (this.compare(this.get(j), this.get(j + 1)) <= 0) continue;
                
                await this.swap(j, j + 1);
                sorted = false;
            }
            i -= 1;
        }
    }

    public async selectionSort(): Promise<void> {
        for (let i = 0; i < this.length; i++) {
            let minIndex = i;
            for (let j = i + 1; j < this.length; j++) {
                if (this.compare(this.get(j), this.get(minIndex)) >= 0) continue;
                minIndex = j;
            }
            await this.swap(minIndex, i);
        }
    }

    public async insertionSort(): Promise<void> {
        for (let i = 1; i < this.length; i++) {
            let j = i;
            while (j > 0 && this.compare(this.get(j), this.get(j - 1)) < 0) {
                await this.swap(j, j - 1); 
                j -= 1;
            }
        }
    }

    private async partition(first: number, last: number): Promise<number> {
        let pivotIndex = last;
        let left = first;
        let right = last - 1;

        while (true) {
            while (this.compare(this.get(left), this.get(pivotIndex)) < 0) {
                left += 1;
            }
            while (this.compare(this.get(right), this.get(pivotIndex)) > 0 && right > left) {
                right -= 1;
            }
            if (left >= right) {
                break;
            }
            await this.swap(left, right);
            left += 1;
        }
        await this.swap(left, last); 
        return left;
    }

    private async quickSortRecursion(first: number, last: number): Promise<void> {
        if (first >= last) {
            return;
        }

        let pivotIndex = await this.partition(first, last);
        await this.quickSortRecursion(first, pivotIndex - 1);
        await this.quickSortRecursion(pivotIndex + 1, last);
    }

    public async quickSort(): Promise<void> {
        await this.quickSortRecursion(0, this.length - 1);
    }

    private async merge(temp: number[], first: number, mid: number, last: number) {
        let i = first;
        let j = mid + 1;

        while (i <= mid && j <= last) {
            const iValue = this.get(i);
            const jValue = this.get(j);
            if (this.compare(iValue, jValue) <= 0) {
                temp.push(iValue);
                i += 1;
            } else {
                temp.push(jValue);
                j += 1;
            }
        }
        while (i <= mid) {
            temp.push(this.get(i));
            i += 1;
        }
        while (j <= last) {
            temp.push(this.get(j));
            j += 1;
        }
        for (let k = first; k <= last; k++) {
            let index = last + first - k;
            await this.replace(index, temp.pop()!);
        }
    }

    private async mergeSortRecursion(temp: number[], first: number, last: number): Promise<void> {
        if (first >= last) {
            return;
        }

        let mid = Math.floor((first + last) / 2);
        await this.mergeSortRecursion(temp, first, mid);
        await this.mergeSortRecursion(temp, mid + 1, last);
        await this.merge(temp, first, mid, last);
    }

    public async mergeSort(): Promise<void> {
        if (this.length == 0) {
            return;
        }
        let temp: number[] = [];
        await this.mergeSortRecursion(temp, 0, this.length - 1); 
    }

    private getLeftChild(index: number) {
        return index * 2 + 1;
    }


    private getRightChild(index: number) {
        return index * 2 + 2;
    }


    private getParentIndex(index: number) {
        return Math.floor((index - 1) / 2)
    }


    private getHigherChild(index: number, length: number): number | null {
        const leftChildIndex = this.getLeftChild(index);
        if (leftChildIndex < length && this.compare(this.get(index), this.get(leftChildIndex)) < 0) {
            const rightChildIndex = this.getRightChild(index);
            if (rightChildIndex >= length || this.compare(this.get(rightChildIndex), this.get(leftChildIndex)) < 0) {
                return leftChildIndex;
            }
            return rightChildIndex
        }
        const rightChildIndex = this.getRightChild(index);
        if (rightChildIndex < length && this.compare(this.get(index), this.get(rightChildIndex)) < 0) {
            return rightChildIndex;
        }
        return null;
    }

    public async heapSort(): Promise<void> {
        for (let i = 1; i < this.length; i++) {
            let currentIndex = i;
            let parentIndex = this.getParentIndex(i);
            while (currentIndex > 0 && this.compare(this.get(currentIndex), this.get(parentIndex)) > 0) {
                await this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex
                parentIndex = this.getParentIndex(currentIndex);
            }
        }
        for (let i = 1; i < this.length; i++) {
            const lastIndex = this.length - i;
            await this.swap(0, lastIndex);

            let higherChildIndex = this.getHigherChild(0, lastIndex);
            let currentIndex = 0;
            while (higherChildIndex !== null) {
                await this.swap(currentIndex, higherChildIndex);
                currentIndex = higherChildIndex;
                higherChildIndex = this.getHigherChild(currentIndex, lastIndex);
            }
        }
    }

    public async thanosSort(): Promise<void> {
        while (true) {
            let sorted = true;
            for (let i = 0; i < this.length - 1; i++) {
                if (this.compare(this.get(i), this.get(i + 1)) > 0) {
                    sorted = false;
                    break;
                }
            }

            if (sorted) break;
            const elementsToRemove = Math.floor(this.length / 2);
            for (let i = 0; i < elementsToRemove; i++) {
                const j = Math.floor(Math.random() * this.length);
                await this.remove(j)
            }
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }
}

export default Sorter;
