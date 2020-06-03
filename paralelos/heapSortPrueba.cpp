/* 
  Paralelizacion de Heap Sort con la librería OpenMP
*/
#include <bits/stdc++.h>
#include <iostream>
#include <omp.h>

using namespace std;

//Se remueve el primer elemento del arreglo
void siftDown( int *a, int k, int N); 
//N = array size

/* 
    Function swap: this function changes the position in an array, helping with the sorting
    @param m: the first element to be switched 
    @param n: the second element to be switched
*/
void swap(int *m, int *n)
{
	int tmp;
	tmp = *m;
	*m = *n;
	*n = tmp;
}

/* 
  Function HeapSort: sorts the array by creating a heap data and sorting it with it's help
  @param arr: the array of elements to be sorted
  @param N: array size
  @return: nothing 
*/
void heapsort( int a[], int N){       
	/* heapify */    
	for (int k = N/2; k >= 0; k--) { 
		siftDown( a, k, N);    
	}     

	while (N-1 > 0) {  
		/* swap the root(maximum value) of the heap 
		with the last element of the heap */
        #pragma omp parallel sections num_threads(8)
        {
            #pragma omp section
            {
            swap(a[N-1], a[0]); 
            }
            /* put the heap back in max-heap order */
            #pragma omp section
            {
            siftDown(a, 0, N-1);  
            /* N-- : decrease the size of the heap by one 
            so that the previous max value will
                stay in its proper placement */
            N--;
            }
        }
	}
}  

/* 
  Function siftDown: auxiliar function for heapSort to sort the array by taking the first element
  of the heap and placing it where it goes, this repeats until it's sorte
  @param a: the array of elements to be sorted
  @param k: index where to start making the heap
	@param N: array size
  @return: if nothing is to be done
*/
void siftDown( int *a, int k, int N){     
	while ( k*2 + 1 < N ) { 
		/* For zero-based arrays, the children are 2*i+1 and 2*i+2 */
 		int child = 2*k + 1;    

		/* get bigger child if there are two children */
		if ((child + 1 < N) && (a[child] < a[child+1])) child++;        
       
		if (a[k] < a[child]) {   /* out of max-heap order */        
			swap( a[child], a[k] );  
			/* repeat to continue sifting down the child now */         
			k = child;  
		}        
		else            
			return;   
	}
}   

int main()
{    
	int i;    
    int no = 15;
    int a[no];
    int nrand =no*10;

    srand((unsigned)time(0));

	for(int i = 0; i < no; i++){
	    a[i] = (rand()%nrand)+1;
	}

	const size_t sz = sizeof(a)/sizeof(a[0]); 

    printf("\nAntes de ordenar:\n");

	for (i = 0; i < sz; i++) 
		cout << a[i] << " ";
	cout << "\n";

	heapsort(a, sz);     

    cout << "\nDespués de ordenar:\n";

	for (i = 0; i < sz; i++) 
		cout << a[i] << " ";
	cout << endl;

	return 0;
}