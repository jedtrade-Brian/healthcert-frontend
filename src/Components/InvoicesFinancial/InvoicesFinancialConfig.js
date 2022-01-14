export const OverviewList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: 'Supplier Name',
      accessor: 'companyName',
      sortable: false,
    },
    {
      Header: 'Supplier Email',
      accessor: 'email',
      sortable: false,
    },
    {
      Header: 'Pending Invoices',
      accessor: 'pendingCount',
      sortable: false,
    },
    {
      Header: 'Invoice Financed',
      accessor: 'approvedCount',
      sortable: false,
    },
    {
      Header: 'Decline Invoice',
      accessor: 'declineCount',
      sortable: false,
    },  
  ],
};

export const SupplierList = {
  showPagination: true,
  showSerialNo: false,
  columns: [
    {
      Header: "Buyer's Name",
      accessor: 'buyerName',
      sortable: false,
    },
    {
      Header: 'Credit Term',
      accessor: 'creditTerm',
      sortable: false,
    },
    {
      Header: 'Invoice No.',
      accessor: 'invNo',
      sortable: false,
    },
    {
      Header: 'Currency',
      accessor: 'currency',
      sortable: false,
    },
    {
      Header: 'Invoice Amt.',
      accessor: 'invAmount',
      sortable: false,
    },
    {
      Header: '',
      accessor: 'status',
      sortable: false,
      show: false
    },
    {
      Header: 'Invoice Date',
      accessor: 'invoiceDate',
      sortable: false,
    },
    {
      Header: 'Invoice Due Date',
      accessor: 'invoiceDueDate',
      sortable: false,
    },
    
  ],
};

export const DeclinedList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: 'Supplier Name',
      accessor: 'companyName',
      sortable: false,
    },
    {
      Header: 'Decline Invoice',
      accessor: 'declineCount',
      sortable: false,
    },
  ],
};

// companyName: "Qss Technosoft"
// declineCount: 1