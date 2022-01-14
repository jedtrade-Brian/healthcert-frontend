export const InvoiceOverviewConfig = {
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
      Header: 'Invoice Declined',
      accessor: 'declineCount',
      sortable: false,
    },
  ],
};

export const DeclinedConfig = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: 'Supplier Name',
      accessor: 'companyName',
      sortable: false,
    },
    // {
    //   Header: 'Supplier Email',
    //   accessor: 'email',
    //   sortable: false,
    // },
    {
      Header: 'Invoice Declined',
      accessor: 'declineCount',
      sortable: false,
    },
  ],
};

export default {
  DeclinedConfig,
  InvoiceOverviewConfig,
};
