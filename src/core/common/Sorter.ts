class Sorter<T> {
    private readonly compareFunction: (left: T, right: T) => number;
    private readonly swap: (first: number, second: number) => Promise<void>;
    private readonly replace: (index: number, value: T) => Promise<void>;
    private readonly getValue: (index: number) => T

    constructor(
        compareFunction: (left: T, right: T) => number, 
        onSwap: (first: number, second: number) => Promise<void>,
        onReplace: (index: number, value: T) => Promise<void>,
        onGetValue: (index: number) => T
    ) {
        this.compareFunction = compareFunction;
        this.swap = onSwap;
        this.replace = onReplace;
        this.getValue = onGetValue;
    }

    public async bubbleSort(length: number): Promise<void> {
        let i = length - 1;
        let sorted = false;

        while (!sorted) {
            sorted = true;
            for (let j = 0; j < i; j++) {
                if (this.compareFunction(this.getValue(j), this.getValue(j + 1)) <= 0) continue;
                
                await this.swap(j, j + 1);
                sorted = false;
            }
            i -= 1;
        }
    }

    public async selectionSort(length: number): Promise<void> {
        for (let i = 0; i < length; i++) {
            let minIndex = i;
            for (let j = i + 1; j < length; j++) {
                if (this.compareFunction(this.getValue(j), this.getValue(minIndex)) >= 0) continue;
                minIndex = j;
            }
            await this.swap(minIndex, i);
        }
    }

    public async insertionSort(length: number): Promise<void> {
        for (let i = 1; i < length; i++) {
            let j = i;
            while (j > 0 && this.compareFunction(this.getValue(j), this.getValue(j - 1)) < 0) {
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
            while (this.compareFunction(this.getValue(left), this.getValue(pivotIndex)) < 0) {
                left += 1;
            }
            while (this.compareFunction(this.getValue(right), this.getValue(pivotIndex)) > 0 && right > left) {
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

    public async quickSort(length: number): Promise<void> {
        await this.quickSortRecursion(0, length - 1);
    }

    private async merge(temp: T[], first: number, mid: number, last: number) {
        let i = first;
        let j = mid + 1;

        while (i <= mid && j <= last) {
            const iValue = this.getValue(i);
            const jValue = this.getValue(j);
            if (this.compareFunction(iValue, jValue) <= 0) {
                temp.push(iValue);
                i += 1;
            } else {
                temp.push(jValue);
                j += 1;
            }
        }
        while (i <= mid) {
            temp.push(this.getValue(i));
            i += 1;
        }
        while (j <= last) {
            temp.push(this.getValue(j));
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

    public async mergeSort(length: number): Promise<void> {
        if (length == 0) {
            return;
        }
        let temp: T[] = [];
        await this.mergeSortRecursion(temp, 0, length - 1); 
    }
}

export default Sorter;
