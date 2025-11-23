/**
 * Standalone verification of South African property fee calculations
 * This file can be run with: node verify-sa-calculations.js
 */

// Copy of the functions for standalone testing
function calculateTransferDuty(propertyValue) {
  if (propertyValue <= 0) return 0;
  if (propertyValue <= 1_100_000) return 0;

  let duty = 0;

  if (propertyValue > 1_100_000) {
    const bracket1Amount = Math.min(propertyValue - 1_100_000, 1_512_500 - 1_100_000);
    duty += bracket1Amount * 0.03;
  }

  if (propertyValue > 1_512_500) {
    const bracket2Amount = Math.min(propertyValue - 1_512_500, 2_117_500 - 1_512_500);
    duty += bracket2Amount * 0.06;
  }

  if (propertyValue > 2_117_500) {
    const bracket3Amount = Math.min(propertyValue - 2_117_500, 2_722_500 - 2_117_500);
    duty += bracket3Amount * 0.08;
  }

  if (propertyValue > 2_722_500) {
    const bracket4Amount = Math.min(propertyValue - 2_722_500, 12_100_000 - 2_722_500);
    duty += bracket4Amount * 0.11;
  }

  if (propertyValue > 12_100_000) {
    const bracket5Amount = propertyValue - 12_100_000;
    duty += bracket5Amount * 0.13;
  }

  return Math.round(duty);
}

function calculateBondRegistrationFees(bondAmount) {
  if (bondAmount <= 0) return 0;

  let fee = 0;

  if (bondAmount <= 600_000) {
    fee = bondAmount * 0.015;
  } else if (bondAmount <= 1_500_000) {
    fee = 9_000 + (bondAmount - 600_000) * 0.008;
  } else {
    fee = 16_200 + (bondAmount - 1_500_000) * 0.004;
  }

  return Math.round(fee);
}

function calculateDeedsOfficeFees(propertyValue) {
  if (propertyValue <= 0) return 0;

  let fee = 0;

  if (propertyValue <= 600_000) {
    fee = propertyValue * 0.01;
  } else if (propertyValue <= 1_500_000) {
    fee = 6_000 + (propertyValue - 600_000) * 0.005;
  } else {
    fee = 10_500 + (propertyValue - 1_500_000) * 0.0025;
  }

  return Math.round(fee);
}

function calculateSouthAfricanPurchaseFees(propertyValue, bondAmount) {
  if (propertyValue <= 0) {
    return {
      transferDuty: 0,
      bondRegistrationFee: 0,
      deedsOfficeFee: 0,
      totalFees: 0,
    };
  }

  const transferDuty = calculateTransferDuty(propertyValue);
  const bondRegistrationFee = calculateBondRegistrationFees(bondAmount);
  const deedsOfficeFee = calculateDeedsOfficeFees(propertyValue);
  const totalFees = transferDuty + bondRegistrationFee + deedsOfficeFee;

  return {
    transferDuty,
    bondRegistrationFee,
    deedsOfficeFee,
    totalFees,
  };
}

// Helper to format currency
function formatZAR(amount) {
  return `R ${amount.toLocaleString('en-ZA')}`;
}

// Run verification tests
console.log('═══════════════════════════════════════════════════════════════');
console.log('  SOUTH AFRICAN PROPERTY FEE CALCULATIONS - VERIFICATION');
console.log('═══════════════════════════════════════════════════════════════\n');

let totalTests = 0;
let passedTests = 0;

function test(name, actual, expected, description = '') {
  totalTests++;
  const passed = actual === expected;
  if (passed) passedTests++;

  console.log(`${name}:`);
  if (description) console.log(`  ${description}`);
  console.log(`  Result: ${formatZAR(actual)}`);
  console.log(`  Expected: ${formatZAR(expected)}`);
  console.log(`  ${passed ? '✓ PASS' : '✗ FAIL'}\n`);

  return passed;
}

// Test 1: Below transfer duty threshold
test(
  'Test 1: Property below transfer duty threshold',
  calculateTransferDuty(1_000_000),
  0,
  'R 1,000,000 property'
);

// Test 2: First tax bracket
test(
  'Test 2: First tax bracket',
  calculateTransferDuty(1_200_000),
  3_000,
  'R 1,200,000 property (3% of R 100,000 excess)'
);

// Test 3: Third tax bracket
test(
  'Test 3: Third tax bracket',
  calculateTransferDuty(2_500_000),
  79_275,
  'R 2,500,000 property (progressive brackets)'
);

// Test 4: Bond registration - low amount
test(
  'Test 4: Bond registration (low)',
  calculateBondRegistrationFees(500_000),
  7_500,
  'R 500,000 bond (1.5%)'
);

// Test 5: Bond registration - mid amount
test(
  'Test 5: Bond registration (mid)',
  calculateBondRegistrationFees(1_000_000),
  12_200,
  'R 1,000,000 bond'
);

// Test 6: Deeds office - low amount
test(
  'Test 6: Deeds office (low)',
  calculateDeedsOfficeFees(500_000),
  5_000,
  'R 500,000 property (1%)'
);

// Test 7: Deeds office - mid amount
test(
  'Test 7: Deeds office (mid)',
  calculateDeedsOfficeFees(2_000_000),
  13_000,
  'R 2,000,000 property'
);

// Test 8: Complete purchase scenario
console.log('Test 8: Complete purchase scenario');
console.log('  R 2,000,000 property with R 1,600,000 bond (20% down)\n');
const test8 = calculateSouthAfricanPurchaseFees(2_000_000, 1_600_000);
console.log(`  Transfer Duty:      ${formatZAR(test8.transferDuty)}`);
console.log(`  Bond Registration:  ${formatZAR(test8.bondRegistrationFee)}`);
console.log(`  Deeds Office:       ${formatZAR(test8.deedsOfficeFee)}`);
console.log(`  ─────────────────────────────────`);
console.log(`  Total Fees:         ${formatZAR(test8.totalFees)}`);
console.log(`\n  Breakdown verification:`);
console.log(`    Transfer: ${formatZAR(test8.transferDuty)} ${test8.transferDuty === 41_625 ? '✓' : '✗'}`);
console.log(`    Bond: ${formatZAR(test8.bondRegistrationFee)} ${test8.bondRegistrationFee === 17_000 ? '✓' : '✗'}`);
console.log(`    Deeds: ${formatZAR(test8.deedsOfficeFee)} ${test8.deedsOfficeFee === 13_000 ? '✓' : '✗'}`);
console.log(`    Total: ${formatZAR(test8.totalFees)} ${test8.totalFees === 71_625 ? '✓' : '✗'}\n`);

if (test8.totalFees === 71_625) {
  passedTests++;
  totalTests++;
}
totalTests++;

// Test 9: Cash purchase
console.log('Test 9: Cash purchase (no bond)');
console.log('  R 1,000,000 cash purchase\n');
const test9 = calculateSouthAfricanPurchaseFees(1_000_000, 0);
console.log(`  Transfer Duty:      ${formatZAR(test9.transferDuty)}`);
console.log(`  Bond Registration:  ${formatZAR(test9.bondRegistrationFee)}`);
console.log(`  Deeds Office:       ${formatZAR(test9.deedsOfficeFee)}`);
console.log(`  Total Fees:         ${formatZAR(test9.totalFees)}`);
console.log(`  ${test9.bondRegistrationFee === 0 ? '✓ PASS' : '✗ FAIL'}\n`);

if (test9.bondRegistrationFee === 0) passedTests++;
totalTests++;

// Test 10: Edge case
test(
  'Test 10: Edge case - zero value',
  calculateSouthAfricanPurchaseFees(0, 0).totalFees,
  0,
  'R 0 property'
);

// Test 11: High-value property
const expected11 = Math.round(
  (1_512_500 - 1_100_000) * 0.03 +
  (2_117_500 - 1_512_500) * 0.06 +
  (2_722_500 - 2_117_500) * 0.08 +
  (12_100_000 - 2_722_500) * 0.11 +
  (15_000_000 - 12_100_000) * 0.13
);
test(
  'Test 11: High-value property',
  calculateTransferDuty(15_000_000),
  expected11,
  'R 15,000,000 property (all tax brackets)'
);

console.log('═══════════════════════════════════════════════════════════════');
console.log(`  TEST SUMMARY: ${passedTests}/${totalTests} tests passed`);
console.log('═══════════════════════════════════════════════════════════════\n');

// Real-world examples
console.log('═══════════════════════════════════════════════════════════════');
console.log('  REAL-WORLD EXAMPLES');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('Example 1: First-time buyer - Affordable apartment');
console.log('  Property value: R 1,200,000');
console.log('  Down payment: 10% (R 120,000)');
console.log('  Bond amount: R 1,080,000\n');
const ex1 = calculateSouthAfricanPurchaseFees(1_200_000, 1_080_000);
console.log(`  Transfer Duty:      ${formatZAR(ex1.transferDuty)}`);
console.log(`  Bond Registration:  ${formatZAR(ex1.bondRegistrationFee)}`);
console.log(`  Deeds Office:       ${formatZAR(ex1.deedsOfficeFee)}`);
console.log(`  ─────────────────────────────────`);
console.log(`  Total Fees:         ${formatZAR(ex1.totalFees)}`);
console.log(`  Down Payment:       ${formatZAR(120_000)}`);
console.log(`  ═════════════════════════════════`);
console.log(`  TOTAL CASH NEEDED:  ${formatZAR(ex1.totalFees + 120_000)}\n`);

console.log('Example 2: Family home - Mid-market');
console.log('  Property value: R 3,500,000');
console.log('  Down payment: 20% (R 700,000)');
console.log('  Bond amount: R 2,800,000\n');
const ex2 = calculateSouthAfricanPurchaseFees(3_500_000, 2_800_000);
console.log(`  Transfer Duty:      ${formatZAR(ex2.transferDuty)}`);
console.log(`  Bond Registration:  ${formatZAR(ex2.bondRegistrationFee)}`);
console.log(`  Deeds Office:       ${formatZAR(ex2.deedsOfficeFee)}`);
console.log(`  ─────────────────────────────────`);
console.log(`  Total Fees:         ${formatZAR(ex2.totalFees)}`);
console.log(`  Down Payment:       ${formatZAR(700_000)}`);
console.log(`  ═════════════════════════════════`);
console.log(`  TOTAL CASH NEEDED:  ${formatZAR(ex2.totalFees + 700_000)}\n`);

console.log('Example 3: Cash purchase - Investment property');
console.log('  Property value: R 2,500,000');
console.log('  No bond required\n');
const ex3 = calculateSouthAfricanPurchaseFees(2_500_000, 0);
console.log(`  Transfer Duty:      ${formatZAR(ex3.transferDuty)}`);
console.log(`  Bond Registration:  ${formatZAR(ex3.bondRegistrationFee)}`);
console.log(`  Deeds Office:       ${formatZAR(ex3.deedsOfficeFee)}`);
console.log(`  ─────────────────────────────────`);
console.log(`  Total Fees:         ${formatZAR(ex3.totalFees)}\n`);

console.log('═══════════════════════════════════════════════════════════════');
console.log('  VERIFICATION COMPLETE');
console.log('═══════════════════════════════════════════════════════════════');
