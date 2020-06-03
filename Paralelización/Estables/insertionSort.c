#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

#define SIZE 1000

/* 
  Function Insertion: this function organizes the data array using Insertion Sort
  @param: int A[], sends an int data array 
  @return: float with the execution time
*/
float insertionSort(int A[])
{
    int N = SIZE;
	int i=0, j=0;
	int first;
	double start,end;
	start= omp_get_wtime(); //
    int  key;  
    for (i = 1; i < SIZE; i++) 
    {  
        {
            key = A[i];  
             j = i - 1;  
             while (j >= 0 && A[j] > key) 
            {  
                A[j + 1] = A[j];  
                j = j - 1;  
            }  
            A[j + 1] = key; 
        }
         
    }  

    end=omp_get_wtime();
    printf("\n-------------------------\n Time Parallel= %f",(end-start));
    return end-start;

}

int main () {
	//int SIZE =1000; //tamaño total
	int A[SIZE];
	for(int i=0;i<SIZE;i++)
	{
	    A[i]=rand()%SIZE;
	}
	insertionSort(A);
}
