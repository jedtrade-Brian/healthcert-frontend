export const saleTabList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "Company Name",
      accessor: "showBuyerName",
      sortable: false
    },
    {
      Header: "Buyer's Email",
      accessor: "buyerEmail",
      sortable: false
    },
    {
      Header: "Invoice No.",
      accessor: "invoice",
      sortable: false
    },
    {
      Header: "Currency",
      accessor: 'currency',
      sortable: false,
    },
    {
      Header: "Invoice Amount",
      accessor: "amount",
      sortable: false
    },
    {
      Header: "Invoice Date",
      accessor: "invoiceDate",
      sortable: false
    },
    {
      Header: "Status",
      accessor: "status",
      sortable: false
    },
    // {
    //   Header: "Invoice Due Date",
    //   accessor: "invoiceDueDate",
    //   sortable: false
    // }
  ]
};

export const saleNOATabList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "NOA Name",
      accessor: "docName",
      sortable: false
    },
    {
      Header: "Financial Institute",
      accessor: "financier",
      sortable: false
    },
    {
      Header: "Creation Date & Time",
      accessor: "createdAt",
      sortable: false
    },
    {
      Header: "Total Invoices",
      accessor: "totalCount",
      sortable: false
    },
    {
      Header: "Approved Invoices",
      accessor: "approved",
      sortable: false
    },
    {
      Header: "Declined Invoices",
      accessor: "declined",
      sortable: false
    }
  ]
};
