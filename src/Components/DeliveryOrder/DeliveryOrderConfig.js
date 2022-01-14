export const saleTabList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "Student ID",
      accessor: 'patientId',
      sortable: true,
    },
    {
      Header: 'NRIC',
      accessor: 'patientNRIC',
      sortable: false,
    },
    {
      Header: 'Email',
      accessor: 'patientEmail',
      sortable: true,
    },
    {
      Header: 'Name',
      accessor: 'patientName',
      sortable: true,
    },
    {
      Header: 'Date of Birth',
      accessor: 'dob',
      sortable: true,
    },
    {
      Header: 'No. of Certs',
      accessor: 'noOfDocs',
      sortable: true,
    },
    
    
  ],
};
