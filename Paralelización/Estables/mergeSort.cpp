#include<iostream>
#include <omp.h>
using namespace std;

void merge(int a[], int l, int m, int r)
{
	int temp[m-l+1], temp2[r-m];

	for(int i=0; i<(m-l+1); i++)
		temp[i]=a[l+i];

	for(int i=0; i<(r-m); i++)
		temp2[i]=a[m+1+i];
	int i=0, j=0, k=l;

	while(i<(m-l+1) && j<(r-m))
	{
		if(temp[i]<temp2[j])
			a[k++]=temp[i++];
		else
			a[k++]=temp2[j++];
	}

	while(i<(m-l+1))
		a[k++]=temp[i++];
	while(j<(r-m))
		a[k++]=temp2[j++];

}

void mergeSort(int a[], int l, int r)
{
	if(l<r)
	{
		int m=(l+r)/2;

		//Se paraleliza esta sección debido a que estas dos instancias pueden correr a la par
		//esto es debido a que uno maneja el arreglo original y el otro maneja el arreglo
		//que se está ordenando
		#pragma omp parallel sections num_threads(2)
		{	
			#pragma omp section
			{
				mergeSort(a,l,m); 
			}
			#pragma omp section
			{
				mergeSort(a,m+1,r);
			}
		}
		merge(a,l,m,r);
	}
}
void print(int a[], int n)
{
	for(int i=0; i<n; i++)
		cout<<a[i]<<" ";
	cout<<endl;
}
int main()
{
	int n = 100;
    int a[n];
    int nrand =n*10;

    srand((unsigned)time(0));

	//Generación aleatoria de datos
	for(int i = 0; i < n; i++){
	    a[i] = (rand()%nrand)+1;
	}

	//Impresión del arreglo sin ordenar
	cout<<"\nArreglo sin ordenar; \n";
	print(a,n);

	mergeSort(a,0,n-1);
	cout<<"\nArreglo ordenado: \n";
	print(a,n);
	return 0;
}