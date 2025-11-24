/**
 * Given an array of integers sorted in ascending order and a target value, return the indices
 * of any pair of numbers in the array that sum to the target. The order of the indexes in the
 * result doesn't matter. If no pair is found, return an empty array.
 *
 * @param arr - The sorted array of integers.
 * @param target - The target number.
 * @returns The indices of the two numbers or empty array if no such pair exists.
 *
 * @description This solution uses the two pointers technique to find the pair of numbers that sum to the target.
 * The time complexity of this solution is O(n) because we are using two pointers to traverse the array.
 * The space complexity is O(1) because we are not using any extra space.
 */
function pairSumSortedBruteForce(arr: number[], target: number) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];

    // If the sum is less than the target, increment the left pointer, aiming
    // to increase the sum toward the target value.
    // If the sum is greater than the target, decrement the right pointer, aiming
    // to decrease the sum toward the target value.
    // If the sum is equal to the target, return the indices of the two numbers.
    if (sum < target) {
      left++;
    } else if (sum > target) {
      right--;
    } else {
      return [left, right];
    }
  }
  return [];
}

export { pairSumSortedBruteForce };
