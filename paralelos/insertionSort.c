#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

#define SIZE 1000


int main (int argc, char *argv[]) {
	//int SIZE =1000; //tamaño total
	int A[SIZE];
	for(int i=0;i<SIZE;i++)
	{
	    A[i]=rand()%SIZE;
	}
	//int A[5] = {6,9,1,3,7};
	int N = SIZE;
	int i=0, j=0;
	int first;
	double start,end;
	start= omp_get_wtime(); //
    int  key;  

    
    for (i = 1; i < SIZE; i++) 
    {  

        #pragma omp critical
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
	for(i=0;i<N;i++)
	{
		printf(" %d",A[i]);
	}

printf("\n-------------------------\n Time Parallel= %f",(end-start));
}
