#include <iostream> 
#include <time.h>
#include "omp.h"
using namespace std; 

clock_t t;
double cpu_time_used;
  
int search(int arr[], int start, int n, int x) 
{ 
    int found = -1;
    int i; 
    #pragma omp parallel for 
    for(i = 0; i < n; i++) 
    {
    	if (arr[i] == x) 
        {	
        	found = i; 
        }
    }

    //for testing:
    // for(i = 0; i < n; i++) 
    // {
    // 	if (arr[i] == x) 
    //     {	
    //     	found = i; 
    //     }
    // }
    return found; 
} 
  
int main(void) 
{ 
    int arr[] = { 1, 9, 2, 8, 3, 7, 4, 6, 5, 0, 34 }; 
    int x = 7; 
    int n = sizeof(arr) / sizeof(arr[0]); 

    t = clock();
    int result = search(arr, 0, n, x); 
    t = clock() - t;

    if (result == -1)
    {
        cout<<"Element is not present in array" << endl;
    }
    else
    {
        cout<< "Element is present at index " << result << endl; 
    }

    cpu_time_used = ((double)t)/CLOCKS_PER_SEC;

    cout << "Time taken: " << cpu_time_used << endl;
    return 0; 
} 