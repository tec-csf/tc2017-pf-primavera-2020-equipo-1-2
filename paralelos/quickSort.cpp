#include <bits/stdc++.h> 
#include <iostream>
#include <omp.h>

using namespace std; 

void swap(int* a, int* b) 
{ 
	int t = *a; 
	*a = *b; 
	*b = t; 
} 

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

void printArray(int arr[], int size) 
{ 
	int i; 
	for (i = 0; i < size; i++) 
		cout << arr[i] << " "; 
	cout << endl; 
} 

int main() 
{ 
    int n = 100;
    int arr[n];
    int nrand =n*10;

    srand((unsigned)time(0));

	//Generación aleatoria de datos
	for(int i = 0; i < n; i++){
	    arr[i] = (rand()%nrand)+1;
	}

    cout << "\nArreglo sin ordenar: \n";
    printArray(arr, n);

	quickSort(arr, 0, n - 1); 
	cout << "\nSorted array: \n"; 
	printArray(arr, n); 
	return 0; 
} 