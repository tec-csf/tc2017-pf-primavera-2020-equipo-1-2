function bucketSort(a) {
    if (a.length === 0) {
      return a;
    }
    // Declaring vars
    var n = a.length-1;
    var i, minValue = a[0],
        maxValue = a[0],
        bucketSize = bucketSize || 5;
    
    // Setting min and max values
    a.forEach(function (currentVal) {
        if (currentVal < minValue) {
            minValue = currentVal;
        } else if (currentVal > maxValue) {
            maxValue = currentVal;
        }
    })
  
    // Initializing buckets
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var allBuckets = new Array(bucketCount);
    
    for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
    }
    
    // Pushing values to buckets
    a.forEach(function (currentVal) {
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
    });
  
    // Sorting buckets
    a.length = 0;
    
    allBuckets.forEach(function(bucket) {
        insertionSort(bucket);
        bucket.forEach(function (element) {
            a.push(element)
        });
    });
  
    return a;
  }

  console.log(bucketSort([9,1,3,7,2]));