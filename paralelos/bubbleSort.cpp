#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

#define SIZE 1000

void swap();

/* 
  Function bubbleSort: this function organizes the data array using openmp and Bubble Sort
  @param: int A[], sends an int data array 
  @return: float with the execution time
*/
float bubbleSort(int A[])
{
    int N = SIZE;
	int i=0, j=0; 
	int first;
	double start,end;
	start= omp_get_wtime(); //
    
	for( i = 0; i < N-1; i++ )
	{
		first = i % 2; 
        //any data declared outside it will be shared
		#pragma omp parallel for default(none),shared(A,first,N)
		for( j = first; j < N-1; j += 1 )
		{
			if( A[ j ] > A[ j+1 ] )
			{
				swap( &A[ j ], &A[ j+1 ] );
			}
		}
	}
    end=omp_get_wtime();
	printf("\n-------------------------\n Time Parallel= %f",(end-start));
    return end-start; 
}

/* 
  Function swap: this function swaps the numbers that are being compared  
  @param: int *num1 , int *num2 pointers to change data
  @return: void
*/
void swap(int *num1, int *num2)
{

	int temp = *num1;
	*num1 =  *num2;
	*num2 = temp;
}

int main () {
	//int SIZE =1000; //tamaño total
	int A[SIZE];
	for(int i=0;i<SIZE;i++)
	{
	    A[i]=rand()%SIZE;
	}
	bubbleSort(A);
	return 0;
}
