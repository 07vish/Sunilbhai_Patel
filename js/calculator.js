/**
 * Interactive Tax Estimator & Document Checklist Generator
 * Built for Indian Income Tax (FY 2024-25 / AY 2025-26)
 */

function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.max(0, Math.round(val)));
}

function calculateNewRegimeTax(grossIncome) {
  // Budget 2024-25: Standard Deduction = ₹75,000 for salaried
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction);

  // Section 87A rebate: Taxable income up to ₹7,00,000 has 0 tax
  if (taxableIncome <= 700000) {
    return { taxableIncome, tax: 0, cess: 0, total: 0 };
  }

  let tax = 0;
  // Slabs:
  // 0 - 3L: Nil
  // 3L - 7L: 5%
  // 7L - 10L: 10%
  // 10L - 12L: 15%
  // 12L - 15L: 20%
  // > 15L: 30%
  if (taxableIncome > 300000) {
    tax += Math.min(taxableIncome - 300000, 400000) * 0.05;
  }
  if (taxableIncome > 700000) {
    tax += Math.min(taxableIncome - 700000, 300000) * 0.10;
  }
  if (taxableIncome > 1000000) {
    tax += Math.min(taxableIncome - 1000000, 200000) * 0.15;
  }
  if (taxableIncome > 1200000) {
    tax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
  }
  if (taxableIncome > 1500000) {
    tax += (taxableIncome - 1500000) * 0.30;
  }

  const cess = tax * 0.04;
  return { taxableIncome, tax, cess, total: tax + cess };
}

function calculateOldRegimeTax(grossIncome, deductions) {
  const standardDeduction = 50000;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction - deductions);

  // Rebate u/s 87A for old regime up to ₹5,00,000
  if (taxableIncome <= 500000) {
    return { taxableIncome, tax: 0, cess: 0, total: 0 };
  }

  let tax = 0;
  // 0 - 2.5L: Nil
  // 2.5L - 5L: 5%
  // 5L - 10L: 20%
  // > 10L: 30%
  if (taxableIncome > 250000) {
    tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
  }
  if (taxableIncome > 500000) {
    tax += Math.min(taxableIncome - 500000, 500000) * 0.20;
  }
  if (taxableIncome > 1000000) {
    tax += (taxableIncome - 1000000) * 0.30;
  }

  const cess = tax * 0.04;
  return { taxableIncome, tax, cess, total: tax + cess };
}

// Checklist Data
const CHECKLISTS = {
  salaried: {
    title: "Salaried Individuals",
    items: [
      "PAN Card & Aadhaar Card (linked)",
      "Form 16 (Part A & Part B) from Employer",
      "Bank Account Statements for all active accounts (FY 24-25)",
      "Annual Information Statement (AIS) & Form 26AS from Income Tax Portal",
      "Interest Certificates from Savings Accounts & Fixed Deposits",
      "Proof of Tax-Saving Investments (PPF, ELSS, LIC, NPS u/s 80C & 80CCD)",
      "Medical Insurance Premium Receipts (Section 80D)",
      "Home Loan Interest & Principal Certificate (if applicable)"
    ]
  },
  business: {
    title: "Traders & Business Firms (Diamond / Textile)",
    items: [
      "PAN & GST Registration Certificate",
      "Bank Statements of all Current and Savings Accounts (full financial year)",
      "Sales, Purchase, and Expense Ledgers / Tally Backup",
      "GST Return Copies (GSTR-1, GSTR-3B & GSTR-9 annual return)",
      "Opening & Closing Stock Inventory Valuation",
      "Depreciation Schedule on Fixed Assets / Machinery",
      "TDS Deductions (Form 26Q) and Advance Tax Payment Challans",
      "Loans / Unsecured Borrowings list with Interest payment details"
    ]
  },
  capital_gains: {
    title: "Capital Gains (Property / Shares / Mutual Funds)",
    items: [
      "Sale Deed & Purchase Deed of Property sold during the year",
      "Stamp Duty Valuation Certificates (Jantri / Circle rate verification)",
      "Broker Annual Capital Gain & Loss Statements for Mutual Funds & Stocks",
      "Proof of cost of improvements or renovation with date/bills",
      "Details of reinvestment in residential property (Section 54/54F) or 54EC Bonds",
      "Bank account proof reflecting receipt of sale proceeds"
    ]
  },
  notary: {
    title: "Notary & Legal Attestation",
    items: [
      "Original Document to be notarized or attested",
      "Government Photo ID Proof (Aadhaar / Passport / Voter ID / Driving License)",
      "Original Title / Supporting documents required for affidavit verification",
      "Physical presence of the deponent / signatory for signature verification",
      "Photocopies to be attested as true copies"
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Tab Switcher inside Tools
  const toolTabs = document.querySelectorAll('.tool-tab');
  const toolPanels = document.querySelectorAll('.tool-panel');

  toolTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.panel;
      toolTabs.forEach(t => t.classList.remove('active'));
      toolPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Tax Calculator Logic
  const grossInput = document.getElementById('calcGross');
  const deductInput = document.getElementById('calcDeduct');
  const btnRunCalc = document.getElementById('btnRunCalc');

  function updateTaxDisplay() {
    const gross = parseFloat(grossInput.value) || 0;
    const deduct = parseFloat(deductInput.value) || 0;

    const newRes = calculateNewRegimeTax(gross);
    const oldRes = calculateOldRegimeTax(gross, deduct);

    const newElem = document.getElementById('resNewTax');
    const oldElem = document.getElementById('resOldTax');
    const diffElem = document.getElementById('resDifference');

    if (newElem) newElem.textContent = formatINR(newRes.total);
    if (oldElem) oldElem.textContent = formatINR(oldRes.total);

    if (diffElem) {
      if (newRes.total < oldRes.total) {
        const diff = oldRes.total - newRes.total;
        diffElem.innerHTML = `<strong>New Tax Regime</strong> is more beneficial for you. You save <strong>${formatINR(diff)}</strong>!`;
        diffElem.className = 'badge-recommendation';
      } else if (oldRes.total < newRes.total) {
        const diff = newRes.total - oldRes.total;
        diffElem.innerHTML = `<strong>Old Tax Regime</strong> is more beneficial for you. You save <strong>${formatINR(diff)}</strong>!`;
        diffElem.className = 'badge-recommendation';
      } else {
        diffElem.innerHTML = `Both regimes result in the exact same tax liability of <strong>${formatINR(newRes.total)}</strong>.`;
        diffElem.className = 'badge-recommendation';
      }
    }
  }

  if (grossInput && deductInput) {
    grossInput.addEventListener('input', updateTaxDisplay);
    deductInput.addEventListener('input', updateTaxDisplay);
    updateTaxDisplay();
  }

  if (btnRunCalc) {
    btnRunCalc.addEventListener('click', () => {
      updateTaxDisplay();
      if (window.toast) {
        window.toast.success('Tax calculation updated for FY 2024-25');
      }
    });
  }

  // Checklist Category Switcher
  const filterPills = document.querySelectorAll('.filter-pill');
  const checklistContainer = document.getElementById('checklistItemsContainer');

  function renderChecklist(categoryKey) {
    const data = CHECKLISTS[categoryKey] || CHECKLISTS.salaried;
    if (!checklistContainer) return;

    checklistContainer.innerHTML = data.items.map((item, index) => `
      <li class="checklist-item">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${item}</span>
      </li>
    `).join('');
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderChecklist(pill.dataset.category);
    });
  });

  // Initial checklist render
  renderChecklist('salaried');

  // Copy Checklist Action
  const copyChecklistBtn = document.getElementById('copyChecklistBtn');
  if (copyChecklistBtn) {
    copyChecklistBtn.addEventListener('click', () => {
      const activePill = document.querySelector('.filter-pill.active');
      const catKey = activePill ? activePill.dataset.category : 'salaried';
      const data = CHECKLISTS[catKey];
      const textToCopy = `*S.D. Patel & Co. - Document Checklist (${data.title})*\n` +
        `Office: 118/119 Super Diamond Market, Varachha Road, Surat\n\n` +
        data.items.map((it, i) => `${i + 1}. ${it}`).join('\n') +
        `\n\nContact: Sunil D. Patel (Advocate · IT-TRPS): +91 93773 34229`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        if (window.toast) {
          window.toast.success('Checklist copied to clipboard!');
        }
      }).catch(() => {
        if (window.toast) {
          window.toast.info('Checklist ready');
        }
      });
    });
  }
});

