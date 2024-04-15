class Sorter<T> {
    private readonly compareFunction: (left: T, right: T) => number;
    private readonly swap: (first: number, second: number) => Promise<void>;
    private readonly replace: (index: number, value: T) => Promise<void>;
    private readonly getValue: (index: number) => Promise<T>

    constructor(
        compareFunction: (left: T, right: T) => number, 
        onSwap: (first: number, second: number) => Promise<void>,
        onReplace: (index: number, value: T) => Promise<void>,
        onGetValue: (index: number) => Promise<T>
    ) {
        this.compareFunction = compareFunction;
        this.swap = onSwap;
        this.replace = onReplace;
        this.getValue = onGetValue;
    }

    public async bubbleSort(elements: T[]): Promise<void> {
        let i = elements.length - 1;
        let sorted = false;

        while (!sorted) {
            sorted = true;
            for (let j = 0; j < i; j++) {
                if (this.compareFunction(await this.getValue(j), await this.getValue(j + 1)) <= 0) continue;
                
                await this.swap(j, j + 1);
                sorted = false;
            }
            i -= 1;
        }
    }

    public async selectionSort(elements: T[]): Promise<void> {
        let length = elements.length;
        for (let i = 0; i < length; i++) {
            let minIndex = i;
            for (let j = i + 1; j < length; j++) {
                if (this.compareFunction(await this.getValue(j), await this.getValue(minIndex)) >= 0) continue;
                minIndex = j;
            }
            await this.swap(minIndex, i);
        }
    }

    public async insertionSort(elements: T[]): Promise<void> {
        for (let i = 1; i < elements.length; i++) {
            let j = i;
            while (j > 0 && this.compareFunction(await this.getValue(j), await this.getValue(j - 1)) < 0) {
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
            while (this.compareFunction(await this.getValue(left), await this.getValue(pivotIndex)) < 0) {
                left += 1;
            }
            while (this.compareFunction(await this.getValue(right), await this.getValue(pivotIndex)) > 0 && right > left) {
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

    public async quickSort(elements: T[]): Promise<void> {
        await this.quickSortRecursion(0, elements.length - 1);
    }

    private async merge(temp: T[], first: number, mid: number, last: number) {
        let i = first;
        let j = mid + 1;

        while (i <= mid && j <= last) {
            const iValue = await this.getValue(i);
            const jValue = await this.getValue(j);
            if (this.compareFunction(iValue, jValue) <= 0) {
                temp.push(iValue);
                i += 1;
            } else {
                temp.push(jValue);
                j += 1;
            }
        }
        while (i <= mid) {
            temp.push(await this.getValue(i));
            i += 1;
        }
        while (j <= last) {
            temp.push(await this.getValue(j));
            j += 1;
        }
        for (let k = first; k <= last; k++) {
            let index = last + first - k;
            await this.replace(index, temp.pop()!);
        }
    }

    private async mergeSortRecursion(temp: T[], first: number, last: number): Promise<void> {
        if (first >= last) {
            return;
        }

        let mid = Math.floor((first + last) / 2);
        await this.mergeSortRecursion(temp, first, mid);
        await this.mergeSortRecursion(temp, mid + 1, last);
        await this.merge(temp, first, mid, last);
    }

    public async mergeSort(elements: T[]): Promise<void> {
        let size = elements.length;
        if (size == 0) {
            return;
        }
        let temp: T[] = [];
        await this.mergeSortRecursion(temp, 0, size - 1); 
    }
}

export default Sorter;
