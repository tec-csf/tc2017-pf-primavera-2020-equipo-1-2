/* 
  Paralelizacion de Quick Sort con la librería OpenMP
*/
#include <bits/stdc++.h> 
#include <iostream>
#include <omp.h>

using namespace std; 

/* 
    Function swap: this function changes the position in an array, helping with the sorting
    @param a: the first element to be switched 
    @param b: the second element to be switched
*/
void swap(int* a, int* b) 
{ 
	int t = *a; 
	*a = *b; 
	*b = t; 
} 

/* 
  Function Partition: this function is part of the quick sort, it compares the lower value with all the other elements
  from back to front until it finds a smaller value to swap. 
  @param arr:the array of elements to be sorted
  @param low:the first element of the array 
  @param high:the last element of the array 
  @return: position
*/
int partition (int arr[], int low, int high) 
{ 
	int pivot = arr[high];
	int i = (low - 1); 

	for (int j = low; j <= high - 1; j++) 
	{ 
		
		if (arr[j] < pivot) 
		{ 
			i++; 
			swap(&arr[i], &arr[j]); 
		} 
	} 
	swap(&arr[i + 1], &arr[high]); 
	return (i + 1); 
} 

/* 
  Function QuickSort: The goal is to reorganize the array so it is partitioned into two halves, 
  with everything in each side either being less than or greater than our pivot.
  @param arr:the array of elements to be sorted
  @param low: the first element of the array 
  @param high: the last element of the array 
  @return: nothing
*/
void quickSort(int arr[], int low, int high) 
{ 
	if (low < high) 
	{ 
		/* pi is partitioning index, arr[p] is now 
		at right place */
		int pi = partition(arr, low, high); 

		//Esta sección funciona similar a merge sort, se encarga de manejar dos instancias del algoritmo
        //el primero maneja el arreglo sin haber sido ordenado
        //el segundo maneja el arreglo ordenado
        #pragma omp parallel sections num_threads(2)
        {

            #pragma omp section
            { 
                quickSort(arr, low, pi - 1); 
            }
            #pragma omp section
            {
                quickSort(arr, pi + 1, high); 
            }
        }
	} 
} 

/* 
  Function printArray: function that helps us print the array
  @param arr: the array of elements to be sorted
  @param size: size of the array to print
  @return: nothing
*/
void printArray(int arr[], int size) 
{ 
	int i; 
	for (i = 0; i < size; i++) 
		cout << arr[i] << " "; 
	cout << endl; 
} 

int main() 
{ 
    int no = 100;
    int arr[no];
    int nrand =no*10;

    srand((unsigned)time(0));

	//Generación aleatoria de datos
	for(int i = 0; i < no; i++){
	    arr[i] = (rand()%nrand)+1;
	}

    int n = sizeof(arr) / sizeof(arr[0]); 

    cout << "\nArreglo sin ordenar: \n";
    printArray(arr, n);

	quickSort(arr, 0, n - 1); 
	cout << "\nSorted array: \n"; 
	printArray(arr, n); 
	return 0; 
} 
