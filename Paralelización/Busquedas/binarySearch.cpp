// C++ program to implement recursive Binary Search 
#include <bits/stdc++.h> 
#include <omp.h>
#include <vector>
using namespace std; 
  
// A recursive binary search function. It returns 
// location of x in given array arr[l..r] is present, 
// otherwise -1 
int binarySearch(vector<int> arr, int l, int r, int x) 
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
    int arr[] = { 2, 3, 4, 10, 40 , 41, 42, 43}; 
    int x = 10; 
    int n = sizeof(arr) / sizeof(arr[0]); 

    // int maxThreads = omp_get_max_threads();
    int maxThreads = 4;

    omp_set_num_threads(maxThreads);

    //checks that there are not more threads than values in the array
    while(maxThreads > n)
    {
        maxThreads -= 1;
    }

    //this checks that each subarray is of equal length
    while(n%maxThreads > 0)
    {
        maxThreads -= 1;
    }

    int subSize = n/maxThreads;
    vector<int> subArrays[maxThreads];

    //assigns numbers to each subarray
    for (int i = 0; i < subSize; ++i)
    {
        for (int j = 0; j < maxThreads; ++j)
        {
            subArrays[j].push_back(arr[j*subSize+i]);
        }
    }

    cout << endl;

    int result, result1, result2, result3, result4;

    //for debugging
    // for (int i = 0; i < maxThreads; i++) { 
  
    //     cout << "Elements at index "
    //          << i << ": "; 
    //     for (auto it = subArrays[i].begin(); 
    //          it != subArrays[i].end(); it++) { 
    //         cout << *it << ' '; 
    //     } 
    //     cout << endl; 
    // } 

    switch(maxThreads)
    {
        case 2:
            #pragma omp parallel sections num_threads(maxThreads)
            {
                #pragma omp section
                {
                    result1 = binarySearch(subArrays[0], 0, subSize - 1, x); 
                }
                #pragma omp section
                {
                    result2 = binarySearch(subArrays[1], 0, subSize - 1, x); 
                }
            }
            if (result1 != -1)
            {
                result = result1;
            }
            else if (result2 != -2)
            {
                result = result2;
            }
            break;
        case 3:
            #pragma omp parallel sections num_threads(maxThreads)
            {
                #pragma omp section
                {
                    result1 = binarySearch(subArrays[0], 0, subSize - 1, x); 
                }
                #pragma omp section
                {
                    result2 = binarySearch(subArrays[1], 0, subSize - 1, x); 
                }
                #pragma omp section
                {
                    result3 = binarySearch(subArrays[2], 0, subSize - 1, x); 
                }
            }
            if (result1 != -1)
            {
                result = result1;
            }
            else if (result2 != -1)
            {
                result = result2;
            }
            else if (result3 != -1)
            {
                result = result3;
            }
            break;
        case 4:
            #pragma omp parallel sections num_threads(maxThreads)
            {
                #pragma omp section
                {
                    result1 = binarySearch(subArrays[0], 0, subSize - 1, x); 
                }
                #pragma omp section
                {
                    result2 = binarySearch(subArrays[1], 0, subSize - 1, x); 
                }
                #pragma omp section
                {
                    result3 = binarySearch(subArrays[2], 0, subSize - 1, x); 
                }
                #pragma omp section
                {
                    result4 = binarySearch(subArrays[3], 0, subSize - 1, x); 
                }
            }
            if (result1 != -1)
            {
                result = result1;
            }
            else if (result2 != -1)
            {
                result = result2;
            }
            else if (result3 != -1)
            {
                result = result3;
            }
            else if (result4 != -1)
            {
                result = result4;
            }
            break;
        default:
            result = binarySearch(subArrays[0], 0, subSize - 1, x); 


    }

    if (result == -1)
    {
        cout<<"Element is not present in array" << endl;
    }
    else
    {
        cout<< "Element found" << endl; 
    }

    return 0; 
} 