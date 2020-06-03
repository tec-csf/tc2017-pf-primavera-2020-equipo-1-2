#include <stdio.h>
#include <omp.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#define N 100000 //array size
#define M 1000000 //number area

int data[N];
int buckets[M];
int *my_buckets[8];

void init_array(int a[N], int size)
{
    int i;
    for( i = 0 ; i < size ; i++)
    {
        a[i] = rand()%M;
    }
}

void omp_thread(int a[N], int b[M])
{
    int i;
#pragma omp parallel for num_threads(8) private(i)
    for(i = 0; i < N ; i++)
    {
#pragma omp atomic
            b[a[i]]++;

    }
}

void omp_thread_barrier(int *my_buckets[8], int data[N])
{
    int i,j, tid;
    for( i = 0 ; i < 8 ; i++)
    {
        my_buckets[i] = malloc(sizeof(int) * M);
        memset(my_buckets[i], 0, sizeof(int) * M);
    }

    double t = omp_get_wtime();
#pragma omp parallel private(i, j, tid)
{
    tid = omp_get_thread_num();
    #pragma omp for
    for(i = 0; i < N ; i++)
        my_buckets[tid][data[i]]++;
    
#pragma omp barrier

    #pragma omp for
    for(i = 0; i < M; i++)
        for(j = 1; j < 8; j++)
        {
            my_buckets[0][i] += my_buckets[j][i];
        }
        
}
    t = omp_get_wtime() - t;
    printf("%lfsec elapsed\n",t);
}

int main(int argc, char** argv)
{
    srand(time(NULL));

    if(argc < 2)
        return 0;

    int select_item = atoi(argv[1]);

    if(select_item = 1)
    {
        init_array(data, N);
        init_array(buckets, M);
    
        double t = omp_get_wtime();
        
        omp_thread(data,buckets);
        
        t = omp_get_wtime() - t;
        
        printf("%lfsec elapsed\n",t);
    }
    else if(select_item = 2)
    {
        omp_thread_barrier(my_buckets, data);
    }

    for(int i=0; i < N; i++)
    {
        printf(" %d", data[i]);
    }

    return 0;
}