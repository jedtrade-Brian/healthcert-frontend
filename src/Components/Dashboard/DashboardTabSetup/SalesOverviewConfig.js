export const salesOverviewList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "Document Ref. No.",
      accessor: "documentNo",
      sortable: false
    },
    {
      Header: "Company",
      accessor: "companyName",
      sortable: false
    },
    {
      Header: "Document Type",
      accessor: "documentType",
      sortable: false
    },
    {
      Header: "Creation Date & Time",
      accessor: "createdAt",
      sortable: false
    },
    {
      Header: "Last Updated",
      accessor: "updatedAt",
      sortable: false
    },
    {
      Header: "Status",
      accessor: "status",
      sortable: false
    },
    {
      Header: "NOA",
      accessor: "noa",
      sortable: false
    }
  ]
};
