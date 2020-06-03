/*
 *  La paralelización esta tomando lugar en dos zonas en específico
 *  en como manda los datos al countSort y como se están insertando los valores
 *  a un arreglo nuevo.
 *  
 */
#include <bits/stdc++.h> 
#include <iostream>
#include <omp.h>

using namespace std; 

int getMax(int arr[], int n) 
{ 
	int mx = arr[0]; 
	for (int i = 1; i < n; i++) 
		if (arr[i] > mx) 
			mx = arr[i]; 
	return mx; 
} 

void countSort(int arr[], int n, int exp) 
{ 
	int output[n]; 
	int i, count[10] = {0}; 

        for (i = 0; i < n; i++) 
            count[ (arr[i]/exp)%10 ]++; 

        for (i = 1; i < 10; i++) 
            count[i] += count[i - 1]; 

        #pragma omp parallel
        #pragma parallel for
        for (i = n - 1; i >= 0; i--) 
        { 
            output[count[ (arr[i]/exp)%10 ] - 1] = arr[i]; 
            count[ (arr[i]/exp)%10 ]--; 
        } 

        for (i = 0; i < n; i++) 
            arr[i] = output[i]; 
    
} 

void radixsort(int arr[], int n) 
{ 
	int m = getMax(arr, n); 

    //Se está modificando el arreglo utilizanod Count sort, esto esta recibiendo el valor 
    //máximo de digitos
    #pragma omp parallel
    #pragma parallel for
	for (int exp = 1; m/exp > 0; exp *= 10) 
		countSort(arr, n, exp); 
} 

void print(int arr[], int n) 
{ 
	for (int i = 0; i < n; i++) 
		cout << arr[i] << " "; 
} 

int main() 
{ 
	int no = 100;
    int arr[no];
    int nrand =no*10;

    srand((unsigned)time(0));

	for(int i = 0; i < no; i++){
	    arr[i] = (rand()%nrand)+1;
	}

	int n = sizeof(arr)/sizeof(arr[0]); 
	cout << "\nArreglo original: \n";
    print(arr, n); 

	radixsort(arr, n); 
    cout<< "\n\nArreglo ordenado: \n";
    print(arr, n);
    cout << "\n";

	return 0; 
} 
