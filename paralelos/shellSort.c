#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

#define SIZE 1000

/* 
  Function shellSort: this function organizes the data array with openmp and shellsort 
  @param: int A[], sends an int data array 
  @return: float with the execution time
*/
float shellSort(int A[])
{
    int N = SIZE;
	int i=0, j=0, incrmnt=0, temp = 0; 
	int first;
	double start,end;
	start= omp_get_wtime(); //
    
	incrmnt = N/2;
    #pragma omp parallel default(none) firstprivate(incrmnt) shared(A) private(i, j, temp)//Con firstprivate mantengo el valor inicializado anteriormente de incrmnt
    {
        while (incrmnt > 0)
        {
            #pragma omp for
            for (i=incrmnt; i < SIZE ; i++)
            {
                j = i;
                temp = A[i];
                while ((j >= incrmnt) && (A[j-incrmnt] > temp))
                {
                    A[j] = A[j - incrmnt];
                    j = j - incrmnt;
                }
                A[j] = temp;
            }
            incrmnt /= 2;
        }
    }
    end=omp_get_wtime();
	printf("\n-------------------------\n Time Parallel= %f",(end-start));
    return end-start;
}

int main ()
{
    int A[SIZE];
	for(int i=0;i<SIZE;i++)
	{
	    A[i]=rand()%SIZE;
	}
    shellSort(A);
    return 0;
}
