function removeDuplicates(nums) {
    let count = 1;
    let counter = 0;

    foreach(var num in nums) {
      console.log('num in foreach loop '+num);
      if(counter < nums.length) {
          let temp1 = nums[counter+1];
          if(num == temp1)
            nums.slice(counter+1,1);
      }
    }

    console.log(count);
    console.log(nums);

    return count;
};

console.log(removeDuplicates([1,1,2]));
