// C++ program to implement recursive Binary Search 
#include <bits/stdc++.h> 
#include <omp.h>
#include <vector>
using namespace std; 
  
// A recursive binary search function. It returns 
// location of x in given array arr[l..r] is present, 
// otherwise -1 
int binarySearch(int arr[], int l, int r, int x) 
{ 
    if (r >= l) { 
        int mid = l + (r - l) / 2; 
  
        // If the element is present at the middle 
        // itself 
        if (arr[mid] == x) 
            return mid; 
  
        // If element is smaller than mid, then 
        // it can only be present in left subarray 
        if (arr[mid] > x) 
            return binarySearch(arr, l, mid - 1, x); 
  
        // Else the element can only be present 
        // in right subarray 
        return binarySearch(arr, mid + 1, r, x); 
    } 
  
    // We reach here when element is not 
    // present in array 
    return -1; 
} 
  
int main(void) 
{ 
    int arr[] = { 2, 3, 4, 10, 40 }; 
    int x = 10; 
    int n = sizeof(arr) / sizeof(arr[0]); 
    int result = binarySearch(arr, 0, n - 1, x); 

    int maxThreads = omp_get_max_threads();

    omp_set_num_threads(maxThreads);

    while(maxThreads > n)
    {
        maxThreads -= 1;
    }

    int subSize = n/maxThreads;
    int subArrs[maxThreads][subSize];

    // cout << maxThreads << endl;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < subSize; i++)
        {
            subArrs[i][j] = 
        }
    }

    if (result == -1)
    {
        cout<<"Element is not present in array" << endl;
    }
    else
    {
        cout<< "Element is present at index " << result << endl; 
    }

    return 0; 
} 