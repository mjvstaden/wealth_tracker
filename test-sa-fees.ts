/**
 * Verification tests for South African property fee calculations
 */

import {
  calculateTransferDuty,
  calculateBondRegistrationFees,
  calculateDeedsOfficeFees,
  calculateSouthAfricanPurchaseFees
} from './src/lib/calculations';

console.log('=== SOUTH AFRICAN PROPERTY FEE CALCULATIONS - VERIFICATION ===\n');

// Test 1: Below transfer duty threshold
console.log('Test 1: R 1,000,000 property (below transfer duty threshold)');
const test1 = calculateTransferDuty(1_000_000);
console.log(`  Transfer Duty: R ${test1.toLocaleString()}`);
console.log(`  Expected: R 0`);
console.log(`  ${test1 === 0 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 2: First tax bracket
console.log('Test 2: R 1,200,000 property (first tax bracket)');
const test2 = calculateTransferDuty(1_200_000);
console.log(`  Transfer Duty: R ${test2.toLocaleString()}`);
console.log(`  Expected: R 3,000 (3% of R 100,000 excess)`);
console.log(`  ${test2 === 3_000 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 3: Third tax bracket
console.log('Test 3: R 2,500,000 property (third tax bracket)');
const test3 = calculateTransferDuty(2_500_000);
console.log(`  Transfer Duty: R ${test3.toLocaleString()}`);
console.log(`  Expected: R 79,275`);
console.log(`  Breakdown:`);
console.log(`    - First R 412,500: R 12,375 (3%)`);
console.log(`    - Next R 605,000: R 36,300 (6%)`);
console.log(`    - Next R 382,500: R 30,600 (8%)`);
console.log(`  ${test3 === 79_275 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 4: Bond registration - R 500,000
console.log('Test 4: R 500,000 bond registration');
const test4 = calculateBondRegistrationFees(500_000);
console.log(`  Bond Fee: R ${test4.toLocaleString()}`);
console.log(`  Expected: R 7,500 (1.5% of R 500,000)`);
console.log(`  ${test4 === 7_500 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 5: Bond registration - R 1,000,000
console.log('Test 5: R 1,000,000 bond registration');
const test5 = calculateBondRegistrationFees(1_000_000);
console.log(`  Bond Fee: R ${test5.toLocaleString()}`);
console.log(`  Expected: R 12,200 (R 9,000 + 0.8% of R 400,000)`);
console.log(`  ${test5 === 12_200 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 6: Deeds office - R 500,000
console.log('Test 6: R 500,000 deeds office fee');
const test6 = calculateDeedsOfficeFees(500_000);
console.log(`  Deeds Fee: R ${test6.toLocaleString()}`);
console.log(`  Expected: R 5,000 (1% of R 500,000)`);
console.log(`  ${test6 === 5_000 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 7: Deeds office - R 2,000,000
console.log('Test 7: R 2,000,000 deeds office fee');
const test7 = calculateDeedsOfficeFees(2_000_000);
console.log(`  Deeds Fee: R ${test7.toLocaleString()}`);
console.log(`  Expected: R 13,000 (R 6,000 + 0.5% of R 1,400,000)`);
console.log(`  ${test7 === 13_000 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 8: Complete purchase - R 2,000,000 with R 1,600,000 bond
console.log('Test 8: R 2,000,000 property with R 1,600,000 bond (20% down)');
const test8 = calculateSouthAfricanPurchaseFees(2_000_000, 1_600_000);
console.log(`  Transfer Duty: R ${test8.transferDuty.toLocaleString()}`);
console.log(`  Bond Registration: R ${test8.bondRegistrationFee.toLocaleString()}`);
console.log(`  Deeds Office: R ${test8.deedsOfficeFee.toLocaleString()}`);
console.log(`  Total: R ${test8.totalFees.toLocaleString()}`);
console.log(`\n  Expected breakdown:`);
console.log(`    Transfer Duty: R 41,625`);
console.log(`    Bond Registration: R 17,000`);
console.log(`    Deeds Office: R 13,000`);
console.log(`    Total: R 71,625`);
const test8Pass = test8.transferDuty === 41_625 &&
                  test8.bondRegistrationFee === 17_000 &&
                  test8.deedsOfficeFee === 13_000 &&
                  test8.totalFees === 71_625;
console.log(`  ${test8Pass ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 9: Cash purchase - R 1,000,000
console.log('Test 9: R 1,000,000 cash purchase (no bond)');
const test9 = calculateSouthAfricanPurchaseFees(1_000_000, 0);
console.log(`  Transfer Duty: R ${test9.transferDuty.toLocaleString()}`);
console.log(`  Bond Registration: R ${test9.bondRegistrationFee.toLocaleString()}`);
console.log(`  Deeds Office: R ${test9.deedsOfficeFee.toLocaleString()}`);
console.log(`  Total: R ${test9.totalFees.toLocaleString()}`);
console.log(`  ${test9.bondRegistrationFee === 0 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 10: Edge case - R 0 property
console.log('Test 10: Edge case - R 0 property value');
const test10 = calculateSouthAfricanPurchaseFees(0, 0);
console.log(`  Total: R ${test10.totalFees.toLocaleString()}`);
console.log(`  ${test10.totalFees === 0 ? 'PASS ✓' : 'FAIL ✗'}\n`);

// Test 11: High-value property - R 15,000,000
console.log('Test 11: High-value property - R 15,000,000');
const test11 = calculateTransferDuty(15_000_000);
const expected11 = Math.round(
  (1_512_500 - 1_100_000) * 0.03 +
  (2_117_500 - 1_512_500) * 0.06 +
  (2_722_500 - 2_117_500) * 0.08 +
  (12_100_000 - 2_722_500) * 0.11 +
  (15_000_000 - 12_100_000) * 0.13
);
console.log(`  Transfer Duty: R ${test11.toLocaleString()}`);
console.log(`  Expected: R ${expected11.toLocaleString()}`);
console.log(`  ${test11 === expected11 ? 'PASS ✓' : 'FAIL ✗'}\n`);

console.log('=== REAL-WORLD EXAMPLES ===\n');

// Example 1: First-time buyer - affordable property
console.log('Example 1: First-time buyer - R 1,200,000 apartment');
console.log('  10% down payment = R 120,000');
console.log('  Bond amount = R 1,080,000\n');
const ex1 = calculateSouthAfricanPurchaseFees(1_200_000, 1_080_000);
console.log(`  Transfer Duty: R ${ex1.transferDuty.toLocaleString()}`);
console.log(`  Bond Registration: R ${ex1.bondRegistrationFee.toLocaleString()}`);
console.log(`  Deeds Office: R ${ex1.deedsOfficeFee.toLocaleString()}`);
console.log(`  ────────────────────────────`);
console.log(`  Total Upfront Fees: R ${ex1.totalFees.toLocaleString()}`);
console.log(`  Plus Down Payment: R 120,000`);
console.log(`  Total Cash Needed: R ${(ex1.totalFees + 120_000).toLocaleString()}\n`);

// Example 2: Mid-market property
console.log('Example 2: Family home - R 3,500,000');
console.log('  20% down payment = R 700,000');
console.log('  Bond amount = R 2,800,000\n');
const ex2 = calculateSouthAfricanPurchaseFees(3_500_000, 2_800_000);
console.log(`  Transfer Duty: R ${ex2.transferDuty.toLocaleString()}`);
console.log(`  Bond Registration: R ${ex2.bondRegistrationFee.toLocaleString()}`);
console.log(`  Deeds Office: R ${ex2.deedsOfficeFee.toLocaleString()}`);
console.log(`  ────────────────────────────`);
console.log(`  Total Upfront Fees: R ${ex2.totalFees.toLocaleString()}`);
console.log(`  Plus Down Payment: R 700,000`);
console.log(`  Total Cash Needed: R ${(ex2.totalFees + 700_000).toLocaleString()}\n`);

// Example 3: Cash purchase
console.log('Example 3: Cash purchase - R 2,500,000');
console.log('  No bond required\n');
const ex3 = calculateSouthAfricanPurchaseFees(2_500_000, 0);
console.log(`  Transfer Duty: R ${ex3.transferDuty.toLocaleString()}`);
console.log(`  Bond Registration: R ${ex3.bondRegistrationFee.toLocaleString()}`);
console.log(`  Deeds Office: R ${ex3.deedsOfficeFee.toLocaleString()}`);
console.log(`  ────────────────────────────`);
console.log(`  Total Fees: R ${ex3.totalFees.toLocaleString()}\n`);

console.log('=== ALL VERIFICATION TESTS COMPLETED ===');
