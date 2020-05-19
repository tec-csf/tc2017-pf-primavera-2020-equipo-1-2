function insertionSort(a)
{
    for (let i = 1; i < a.length; i++) {
      let j = i - 1;
      let tmp = a[i];
      while (j >= 0 && a[j] > tmp) {
        a[j + 1] = a[j]
        j--
      }
      a[j+1] = tmp
    }
    return a
}

console.log(insertionSort([9,1,3,7,2]));