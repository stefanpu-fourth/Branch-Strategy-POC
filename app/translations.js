export default {
  en: {
    menu: {
      rotas: 'My Rotas',
      payslips: 'My Payslips',
      details: 'HR Details'
    },
    payslips: {
      breakdown: 'Show payslip breakdown',
      historic: 'Historic Breakdown',
      download: 'Download payslip (.pdf)',
      totalPay: 'Total',
      takeHome: 'Take home',
      name: 'Name',
      company: 'Company',
      date: 'Date',
      netPayment: 'Net Payment',
      payments: 'Payments',
      totalPayments: 'Total Payments',
      deductions: 'Deductions',
      totalDeductions: 'Total Deductions',
      periodTotals: 'This Period Totals',
      grossPay: 'Gross Pay',
      taxablePay: 'Taxable Pay',
      earningsNI: 'Earnings for National Insurance',
      earningsNIYTD: 'Earnings for National Insurance YTD',
      employeePensionContrib: 'Employee Pension Contribution',
      employerPensionContrib: 'Employer Pension Contribution',
      employerStakePensionContrib: 'Employer Stakeholder Pension Contribution',
      yearToDateTotals: 'Year To Date (YTD) Totals',
      grossPayYTD: 'Gross Pay YTD',
      taxablePayYTD: 'Taxable Pay YTD',
      taxYTD: 'Tax YTD',
      nationalInsuranceYTD: 'National Insurance YTD',
      employerNIContribYTD: 'Employer NI Contribution YTD',
      employerPensionContribYTD: 'Employer Pension Contribution YTD',
      employeePensionContribYTD: 'Employee Pension Contribution YTD',
      employeeAVCYTD: 'Employee AVC YTD',
      employeeFSAVCYTD: 'Employeee FSAVC YTD',
      payFromPreviousEmploymentYTD: 'Pay from Previous Employment YTD',
      studentLoanYTD: 'Student Loan YTD',
      taxFromPreviousEmploymentYTD: 'Tax for Previous Employment YTD',
      payslipDetails: 'Payslip Details',
      week: 'Week',
      month: 'Month',
      employeeNumber: 'Employee No.',
      niNumber: 'NI Number',
      taxCode: 'Tax Code',
      payMethod: 'Pay Method',
      address: 'Address',
      noPayslips: 'No payslips?',
      noPayslipsAvailable: 'You do not have any electronic payslips available just yet…',
      noPayslipsAdvice: 'If you think this is incorrect then please contact your line manager or payroll department.'
    },
    rotas: {
      holidayInformation: 'Holiday Information',
      allowed: 'Allowed',
      taken: 'Taken',
      booked: 'Booked',
      holidaysReserved: 'Holidays Reserved',
      remaining: 'Remaining',
      accrued: 'Accrued',
      noRotasForWeek: 'There is no rota for this week',
      noRotas: 'There are currently no rotas available',
      infoIcon: '&#9432;',
      subjectToChange: 'Your shift times may be subject to change'
    },
    details: {
      name: 'Name',
      contact: 'Contact',
      address: 'Address',
      phone: 'Phone',
      fax: 'Fax',
      card: {
        subHeader: 'With {{employer}} for {{employmentDuration}}'
      },
      employment: {
        details: 'Main Employment',
        division: 'Division',
        payType: 'Pay Type',
        jobTitle: 'Job Title',
        location: 'Location'
      },
      employee: {
        details: 'Employee Details',
        firstName: 'First Name',
        middleName: 'Middle Name(s)',
        lastName: 'Last Name',
        address1: 'Address 1',
        address2: 'Address 2',
        address3: 'Address 3',
        town: 'Town',
        county: 'County',
        country: 'Country',
        postCode: 'Post code',
        employeeNumber: 'Employee number',
        startDate: 'Start date',
        serviceDuration: 'Service duration',
        niNumber: 'NI Number',
        dateOfBirth: 'Date of birth',
        homeTel: 'Home phone',
        mobileTel: 'Mobile phone',
        workEmail: 'Work email',
        homeEmail: 'Home email',
        nationality: 'Nationality',
        gender: 'Gender',
        title: 'Title',
        titles: ['Mr', 'Mrs', 'Miss', 'Ms', 'Master', 'Madam', 'Dr', 'Mx']
      },
      employer: {
        details: 'Employer Details',
        taxOfficeName: 'Tax Office Name',
        taxOfficeNumber: 'Tax Office Number',
        payeReference: 'PAYE Reference'
      },
      editDetails: {
        headerTitle: 'My Details',
        saveButtonText: 'Done'
      }
    },
    dateFormats: {
      dayMonthYear: "D MMM YYYY",
      dayMonth: "D MMM",
      weekdayDay: "ddd D",
      "default": "D MMM YYYY"
    },
    successNotifications: {
      employeeUpdate: 'Success! Your request has been accepted.'
    },
    errorNotifications: {
      employeeUpdate: 'Sorry, your request has failed. Please try again or contact support.',
      catchAll: 'Sorry, it looks like something went wrong! Please try again.',
      forbidden: 'Sorry, but you don\'t have permission to access this page.'
    },
    errorSplash: {
      catchAll: 'Sorry, but this page doesn\'t exist.',
      wentWrong: 'Sorry, it looks like something went wrong!',
      wentWrongMessage: 'This error has been logged. In the meantime try to <a href="/">refresh the page</a> or come back later.',
      noPermission: 'Sorry, but you don\'t have permission to access this page.',
      tryMain: 'Why not try one of the main pages?'
    },
    errorValidation: {
      presence: 'This field is required.',
      alphabetical: 'Your entry must contain only letters.',
      length: 'Your input is less than {min} or more than {max} characters.',
      onlyDigits: 'Phone number must contain only digits.',
      leadingZero: 'Phone number should start with a leading zero.'
    }
  }
};
