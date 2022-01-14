export const purchaseTabList = {
    showPagination: true,
    showSerialNo: true,
    columns: [
        {
          Header: "Company Name",
          accessor: 'companyName',
          sortable: false,
        },
        // {
        //   Header: "Document Type",
        //   accessor: 'docType',
        //   sortable: false,
        // },
        {
          Header: "Supplier's Email",
          accessor: 'supplierEmail',
          sortable: false,
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
          accessor: 'finalAmt',
          sortable: false,
        },
        {
          Header: "Status",
          accessor: 'status',
          sortable: false,
        },
        {
          Header: "Invoice Date",
          accessor: 'createdAt',
          sortable: false,
        },
        // {
        //   Header: "Updated At",
        //   accessor: 'updatedAt',
        //   sortable: false,
        // },
      ],
  };

  export const purchaseNOATabList = {
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
        accessor: "financierCompany",
        sortable: false
      },
      {
        Header: "Creation Date & Time",
        accessor: "createdAt",
        sortable: false
      },
      // {
      //   Header: "No. of Invoices",
      //   accessor: "numberOfInvoices",
      //   sortable: false
      // },
      // {
      //   Header: "Total Invoices",
      //   accessor: "totalCount",
      //   sortable: false
      // },
      {
        Header: "Approved Invoices",
        accessor: "approved",
        sortable: false
      },
      // {
      //   Header: "Declined Invoices",
      //   accessor: "declined",
      //   sortable: false
      // }
      // {
      //   Header: "Invoice No.",
      //   accessor: "invoiceNo",
      //   sortable: false
      // }
    ]
  };