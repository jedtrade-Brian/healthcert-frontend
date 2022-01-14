export const salesQuotationSale = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "Document ID",
      accessor: 'transcriptId',
      sortable: true,
    },
    {
      Header: "Patient ID",
      accessor: 'patientId',
      sortable: true,
    },
    {
      Header: "Name",
      accessor: "name",
      sortable: true,
    },
    {
      Header: "Test Name",
      accessor: "testName",
      sortable: true,
    },
    {
      Header: "Effective Date",
      accessor: "effectiveDate",
      sortable: true,
    },
    {
      Header: "Issued Date",
      accessor: 'issuedOn',
      sortable: true,
    },
  ],
};

export const salesQuotationPurchase = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    // {
    //   Header: "Issuer Name",
    //   accessor: 'issuerName',
    //   sortable: false,
    // },
    // {
    //   Header: 'Quote Number',
    //   accessor: 'quoteNumber',
    //   sortable: false,
    // }
    {
      Header: "Company Name",
      accessor: 'companyName',
      sortable: false,
    },
    {
      Header: "Quote Number",
      accessor: "documentNo",
      sortable: false
    },
    {
      Header: "Currency",
      accessor: 'currency',
      sortable: false,
    },
    {
      Header: "Final Amount",
      accessor: 'finalAmt',
      sortable: false,
    },
    
    {
      Header: "Status",
      accessor: 'status',
      sortable: false,
    },
    {
      Header: "Created At",
      accessor: 'createdAt',
      sortable: false,
    },
    {
      Header: "Updated At",
      accessor: 'updatedAt',
      sortable: false,
    },
  ],
};

