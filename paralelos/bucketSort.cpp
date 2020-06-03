#include <iostream>
#include <algorithm>
#include <vector> //used for the sake of simplicity
using namespace std;

/* 
  Function bucketSort: this function organizes the data Aay using Bucket Sort
  @param: float A[], int n  sends an int data and size 
  @return: void
*/
void bucketSort(float A[], int n)
{
    vector<float> b[n];
    
    for (int i=0; i<n; i++)
    {
       int x = n*A[i];
       b[x].push_back(A[i]);
    }
 
    for (int i=0; i<n; i++)
       sort(b[i].begin(), b[i].end());
 
    int index = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < b[i].size(); j++)
          A[index++] = b[i][j];
}
 
int main()
{
    float A[] = {0.235, 0.101, 0.476, 0.7645, 0.15, 0.142};
    int n = sizeof(A)/sizeof(A[0]);
    cout << "Before Sorting\n";
    for (int i=0; i<n; i++)
    cout << A[i] << " ";
    
    bucketSort(A, n);
    
    cout << "\nAfter Sorting \n";
    for (int i=0; i<n; i++)
       cout << A[i] << " ";
    return 0;
}
