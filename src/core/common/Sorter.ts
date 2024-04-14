class Sorter<T> {
    private readonly compareFunction: (left: T, right: T) => number;
    private readonly onSwap: (first: number, second: number) => Promise<void>;

    constructor(
        compareFunction: (left: T, right: T) => number, 
        onSwap: (first: number, second: number) => Promise<void> = async () => {}
    ) {
        this.compareFunction = compareFunction;
        this.onSwap = onSwap;
    }

    public async bubbleSort(elements: T[]): Promise<void> {
        let i = elements.length - 1;
        let sorted = false;

        while (!sorted) {
            sorted = true;
            for (let j = 0; j < i; j++) {
                if (this.compareFunction(elements[j], elements[j + 1]) <= 0) continue;
                
                [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]];
                sorted = false;
                await this.onSwap(j, j + 1);
            }
            i -= 1;
        }
    }

    public async selectionSort(elements: T[]): Promise<void> {
        let length = elements.length;
        for (let i = 0; i < length; i++) {
            let minIndex = i;
            for (let j = i + 1; j < length; j++) {
                if (this.compareFunction(elements[j], elements[minIndex]) >= 0) continue;
                minIndex = j;
            }
            [elements[i], elements[minIndex]] = [elements[minIndex], elements[i]];
            await this.onSwap(minIndex, i);
        }
    }

    public async insertionSort(elements: T[]): Promise<void> {
        for (let i = 1; i < elements.length; i++) {
            let j = i;
            while (j > 0 && this.compareFunction(elements[j], elements[j - 1]) < 0) {
                [elements[j], elements[j - 1]] = [elements[j - 1], elements[j]];
                await this.onSwap(j, j - 1);
                
                j -= 1;
            }
        }
    }

    private async partition(elements: T[], first: number, last: number): Promise<number> {
        let pivotIndex = last;
        let left = first;
        let right = last - 1;

        while (true) {
            while (this.compareFunction(elements[left], elements[pivotIndex]) < 0) {
                left += 1;
            }
            while (this.compareFunction(elements[right], elements[pivotIndex]) > 0 && right > left) {
                right -= 1;
            }
            if (left >= right) {
                break;
            }
            [elements[left], elements[right]] = [elements[right], elements[left]];
            await this.onSwap(left, right);
            left += 1;
        }
        [elements[left], elements[last]] = [elements[last], elements[left]];
        await this.onSwap(left, last);
        
        return left;
    }

    private async quickSortRecursion(elements: T[], first: number, last: number): Promise<void> {
        if (first >= last) {
            return;
        }

        let pivotIndex = await this.partition(elements, first, last);
        await this.quickSortRecursion(elements, first, pivotIndex - 1);
        await this.quickSortRecursion(elements, pivotIndex + 1, last);
    }

    public async quickSort(elements: T[]): Promise<void> {
        await this.quickSortRecursion(elements, 0, elements.length - 1);
    }

    private async merge(elements: T[], temp: T[], first: number, mid: number, last: number) {
        let i = first;
        let j = mid + 1;

        while (i <= mid && j <= last) {
            if (this.compareFunction(elements[i], elements[j]) <= 0) {
                temp.push(elements[i]);
                i += 1;
            } else {
                temp.push(elements[j]);
                j += 1;
            }
        }
        while (i <= mid) {
            temp.push(elements[i]);
            i += 1;
        }
        while (j <= last) {
            temp.push(elements[j]);
            j += 1;
        }
        for (let k = first; k <= last; k++) {
            elements[last + first - k] = temp.pop()!;
            await this.onSwap(last + first - k, k);
        }
    }

    private async mergeSortRecursion(elements: T[], temp: T[], first: number, last: number): Promise<void> {
        if (first >= last) {
            return;
        }

        let mid = Math.floor((first + last) / 2);
        await this.mergeSortRecursion(elements, temp, first, mid);
        await this.mergeSortRecursion(elements, temp, mid + 1, last);
        await this.merge(elements, temp, first, mid, last);
    }

    public async mergeSort(elements: T[]): Promise<void> {
        let size = elements.length;
        if (size == 0) {
            return;
        }
        let temp: T[] = [];
        await this.mergeSortRecursion(elements, temp, 0, size - 1); 
    }
}

export default Sorter;
