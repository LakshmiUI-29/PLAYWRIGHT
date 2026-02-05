function intersection(arr1,arr2){
    let result =[];

    for(let i =0; i<arr1.length;i++){
        let value = arr1[i];

    for (let j=0;j<arr2.length;j++)
    {
        if(value === arr2[j] && !result.includes(value))
        {
            result.push(value);
        }
    }
    }

    return result;

}
console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6]));
