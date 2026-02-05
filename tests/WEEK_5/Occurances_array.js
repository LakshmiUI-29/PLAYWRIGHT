function Occurances(arr)
{
    //let arr = "";
    let freq = {};
    let count =0;
    for (let i = 0; i <arr.length; i++) {
        let value = arr[i];
        freq[value] = (freq[value] || 0) + 1;
    }
    for (let key in freq) {
        if (freq[key] > 1) {
            count += freq[key] - 1;
        }
    }
    console.log("Duplicate count:",count);
    return count;
}
Occurances([1, 2, 2, 3, 3, 3]);
