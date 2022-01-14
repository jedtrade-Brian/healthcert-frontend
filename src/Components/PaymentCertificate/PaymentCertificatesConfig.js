export const saleTabList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "Payment's Name",
      accessor: "paymentName",
      sortable: false
    },
    {
      Header: "Invoice No.",
      accessor: "invoice",
      sortable: false
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
      Header: "Invoice Due Date",
      accessor: "invoiceDueDate",
      sortable: false
    }
  ]
};
